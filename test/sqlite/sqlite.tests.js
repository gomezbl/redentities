const assert = require("chai").assert;
const ShortId = require("shortid");

const RedEntitiesConfig = require("./config/RedEntitiesTestConfig.json");
const testSchema = require("./config/TestSchema.json");

const RedEntities = require("../../lib/redentities")(RedEntitiesConfig);
const db = RedEntities.Entities(testSchema);

function TableEntityShortId() {
    ShortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZñÑ');
    return `table${ShortId.generate()}`;
}

describe( 'Sqlite Redentities tests', () => {
    before( async () => {
        await db.RemoveAndCreateDatabase( RedEntitiesConfig.database );
    });

    
    it( '# Sqlite Sqlite Check if no existing schema exists', async () => {
        let schema = {
            entities: [
                {   name: TableEntityShortId(),
                    fields: [
                        { name: "Name", type: "string" },
                        { name: "Age", type : "integer" }
                    ] 
                }   
            ]
        }

        let exists = await RedEntities.Entities( schema ).ExistsDatabase();

        assert.isFalse( exists );
    });

    it( '# Sqlite Sqlite Check existing schema', async () => {
        let testSchema = {
            entities: [
                {
                    name: TableEntityShortId("table"),
                    fields: [
                        { name: "title", type: "string" }
                    ]
                }
            ]
        }

        let db = RedEntities.Entities( testSchema );
      
        await db.CreateSchema();
        
        let exists = await db.ExistsSchema();

        assert.isTrue( exists );
    });

    it( '# Sqlite Sqlite Create schema with one entity', async () => {
        let testSchema = {
            entities: [
                {
                    name: TableEntityShortId(),
                    fields: [
                        { name: "title", type: "string" },
                        { name: "alias", type: "string" }
                    ]
                }
            ]
        }

        await RedEntities.Entities( testSchema ).CreateSchema();
    });

    
    it( '# Sqlite Create schema with multiple entities', async () => {
        let testSchema = {
            entities: [
                {
                    name: TableEntityShortId(),
                    fields: [
                        { name: "title", type: "string" },
                        { name: "alias", type: "string" }
                    ]
                },
                {
                    name: TableEntityShortId(),
                    fields: [
                        { name: "user", type: "string" },
                        { name: "password", type: "string" }
                    ]
                },
            ]
        }

        await RedEntities.Entities( testSchema ).CreateSchema();
    });

    
    it( '# Sqlite GetFieldDefinitionInSchema test', () => {
        let testSchema = {
            entities: [
                {
                    name: "book",
                    fields: [
                        { name: "title", type: "string" },
                        { name: "alias", type: "string" }
                    ]
                }
            ]
        }

        let db = RedEntities.Entities(testSchema);

        let definition = db.GetFieldDefinitionInSchema( "book", "title" );

        assert.equal( definition.name, "title" );
        assert.equal( definition.type, "string" );
    });

    it( '# Sqlite RenameSchemaEntities test', async () => {
        let testSchema = {
            entities: [
                {
                    name: "book",
                    fields: [
                        { name: "title", type: "string" },
                        { name: "alias", type: "string" }
                    ]
                }
            ]
        }

        let re = await RedEntities.Entities(testSchema);
        await re.CreateSchema();

        await re.RenameSchemaEntities( "t" );

        let exists = await re.ExistsTable( "bookt" );

        assert.isTrue(exists);
    });

    it( '# Sqlite check entities populated', async () => {
        let testSchema = {
            entities: [
                {
                    name: "book",
                    fields: [
                        { name: "title", type: "string" },
                        { name: "alias", type: "string" }
                    ]
                }
            ]
        }

        let re = await RedEntities.Entities(testSchema);
        
        await re.CreateSchema();

        assert.isTrue( typeof re.book.I == 'function' );
        assert.isTrue( typeof re.book.S == 'function' );
        assert.isTrue( typeof re.book.D == 'function' );
        assert.isTrue( typeof re.book.U == 'function' );
    });

    it( '# Sqlite NewId test', () => {
        let newId = db.NewId();

        assert.isString( newId );
    });
});