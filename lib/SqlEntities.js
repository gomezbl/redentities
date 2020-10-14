const ShortId = require("shortid");
const _ = require("underscore");

const CreateTableBuilder = require("./builders/CreateTableBuilder");
const DeleteQueryBuilder = require("./builders/DeleteQueryBuilder");
const DropTableBuilder = require("./builders/DropTableBuilder");
const IndexBuilder = require("./builders/IndexBuilder");
const InsertQueryBuilder = require("./builders/InsertQueryBuilder");
const SelectQueryBuilder = require("./builders/SelectQueryBuilder");
const UniqueIndexBuilder = require("./builders/UniqueIndexBuilder");
const UpdateQueryBuilder = require("./builders/UpdateQueryBuilder");

class SqlEntities {
    constructor(databaseConfig, databaseSchema, adaptors ) {
        this.DatabaseConfig = databaseConfig;
        this.DatabaseSchema = databaseSchema;
        this.Adaptors = adaptors;

        if ( databaseSchema ) this.populateEntities();
    }

    async RenameSchemaEntities( sufix ) {
        let sql = [];
        for( let entity of this.DatabaseSchema.entities ) {            
            let newTableName = `${entity.name}${sufix}`;
            sql.push( this.Adaptors.Formatters.FormatRenameTable( entity.name, `${newTableName};`) );

            entity.name = newTableName;
        }

        for (let query of sql) {
            await this.RunQuery(query);
        }

        return this.DatabaseSchema;
    }

    populateEntities() {
        let entitiesInstance = this;
        let formatters = this.Adaptors.Formatters;
        
        for( let entity of this.DatabaseSchema.entities ) {
            this[entity.name] = {
                I : function() { return new InsertQueryBuilder( entity.name, entitiesInstance, formatters ) },
                S : function(fields) { return new SelectQueryBuilder( entity.name, entitiesInstance, fields ? fields : "*", formatters ) },
                U : function() { return new UpdateQueryBuilder( entity.name, entitiesInstance, formatters ) },
                D : function() { return new DeleteQueryBuilder( entity.name, entitiesInstance, formatters ) }
            }
        }
    }

    NewId() { return ShortId.generate() };

    async ExistsSchema() {
        let sql = this.Adaptors.Formatters.FormatSelectDatabaseAndTable(this.DatabaseConfig.database, this.DatabaseSchema.entities[0].name );
        let result = await this.RunQuery( sql );
        
        return result.length == 1;
    }

    /*
     * Create the entity schema in database
     * entitySchema: <json describing the schema for the table>
     * removeIfExists: <if true, then if table exists, it is removed and created again>
     */
    async CreateEntity( entitySchema, removeIfExists ) {        
        let existsEntity = await this.ExistsTable( entitySchema.name );
        let formatters = this.Adaptors.Formatters;

        if ( existsEntity && removeIfExists == false ) { return; }

        if ( existsEntity && removeIfExists ) {
            let dtb = new DropTableBuilder( entitySchema.name, formatters );
            sql.push( dtb.Query() );
        }
        
        let sql = [];        
        let ctb = new CreateTableBuilder(entitySchema.name, formatters );

        entitySchema.fields.forEach((field) => {
            ctb.AddField(field.name, field.type);
        })

        sql.push(ctb.Query());

        if (entitySchema.indexes) {
            let i = 0;            

            entitySchema.indexes.forEach((index) => {
                if( !this.fieldsInEntity( entitySchema, index ) ) {
                    throw Error( `Some index fields are missing in entity fields in ${entitySchema.name}`);
                }

                let ib = new IndexBuilder(entitySchema.name, index, i++, formatters);
                sql.push( ib.Query() );
            });
        }

        // Restrictions
        if (entitySchema.restrictions && entitySchema.restrictions.unique) {
            let i = 0;

            entitySchema.restrictions.unique.forEach((uniqueIndex) => {
                if (!this.fieldsInEntity(entitySchema, uniqueIndex)) {
                    throw Error(`Some unique index fields are missing in entity fields in ${entitySchema.name}`);
                }

                let ib = new UniqueIndexBuilder(entitySchema.name, uniqueIndex, i++, formatters);
                sql.push(ib.Query());
            });
        }

        // Important: creation queries should be performed in array order (first create tables, then indexes...)
        for (let query of sql) {
            await this.RunQuery(query);
        }
    }

    /*
     * Creates new entities(tables) in the database according
     * to the schema indicated as parameter. If the schema is a json object,
     * one entity will be created, if it is an array of json objects, some entities
     * will be created. 
     * Returns a promise.
     * Params:
     * removeIfExists: <if true, then all entities (tables) are removed if exists, optional. Default: true>
     */
    async CreateSchema(removesIfExists) {
        let removes = typeof removesIfExists == 'undefined' ? true : removesIfExists;

        let existsDatabase = await this.ExistsDatabase();

        if ( !existsDatabase ) {
            await this.CreateDatabase(this.DatabaseConfig.database);
        }    

        for (let entity of this.DatabaseSchema.entities) {
            await this.CreateEntity( entity, removes );
        }
    }

    async CreateFromSchema(schema) {
        for (let entity of schema.entities) {
            await this.CreateEntity( entity, true );
        }
    }

    fieldsInEntity( entity, fieldsToCheck ) {
        let fields = entity.fields.map( (f) => f.name );
        let common = _.intersection( fields, fieldsToCheck );

        return common.length == fieldsToCheck.length;
    }

    async RemoveSchema(schema) {
        if ( typeof schema != 'undefined' ) this.DatabaseSchema = schema;

        for(let entity of this.DatabaseSchema.entities ) {
            let dropTableBuilder = new DropTableBuilder( entity.name, this.Adaptors.Formatters );

            await this.RunQuery( dropTableBuilder.Query() );
        }
    }

    async RemoveAndCreateDatabase( databaseName ) {
        await this.RemoveDatabase( databaseName );
        await this.CreateDatabase( databaseName );
    }

    async ExistsDatabase() {
        return this.Adaptors.DatabaseExists.ExistsDatabase(this);
    }

    async ExistsTable( tableName ) {        
        let sql = this.Adaptors.Formatters.FormatShowTable(tableName);
        let result = await this.RunQuery(sql);

        return result.length == 1;
    }

    async RemoveDatabase( databaseName ) {
        return this.Adaptors.DatabaseRemover.RemoveDatabase( databaseName, this.Adaptors.Formatters, this.Adaptors.Connector, this.DatabaseConfig );
    }

    async CreateDatabase( databaseName ) {
        return this.Adaptors.DatabaseCreator.CreateDatabase( databaseName, this.Adaptors.Formatters, this.Adaptors.Connector, this.DatabaseConfig );
    }

    Insert( entityName ) {
        return new InsertQueryBuilder( entityName, this, this.Adaptors.Formatters );
    }

    Update( entityName ) {
        return new UpdateQueryBuilder( entityName, this, this.Adaptors.Formatters );
    }

    Select( entityName ) {
        return new SelectQueryBuilder( entityName, this, "*", this.Adaptors.Formatters );
    }

    Delete( entityName ) {
        return new DeleteQueryBuilder( entityName, this, this.Adaptors.Formatters );
    }

    getEntitySchemaFromName( entityName ) {
        let r = '';
        this.DatabaseSchema.entities.forEach( (schema) => {
            if ( schema.name == entityName )  r = schema;
        });

        return r;
    }

    async RunQuery( sql ) {
        let result = await this.Adaptors.Connector.RunQuery( this.DatabaseConfig, sql );

        return result;
    }

    GetEntityByName( entityName ) {
        for( let i = 0; i < this.DatabaseSchema["entities"].length; i++ ) {
            let entity = this.DatabaseSchema["entities"][i];

            if ( entity.name == entityName ) {
                return entity;
            }
        }

        throw new Error( `Unknown entity name "${entityName}"` );
    }

    GetFieldDefinitionInSchema( entityName, fieldName )
    {
        let entity = this.GetEntityByName( entityName );

        for( let i = 0; i < entity.fields.length; i++ ) {
            let field = entity.fields[i];

            if ( field.name === fieldName ) return field;
        }

        throw new Error( `Unkown field name "${fieldName}" in entity "${entityName}"`);
    }
}

module.exports = SqlEntities;