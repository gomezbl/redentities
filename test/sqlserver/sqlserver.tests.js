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

describe( 'Sqlserver Redentities tests', () => {
    before( async () => {
        await db.RemoveAndCreateDatabase( RedEntitiesConfig.database );
    });

    
    it( '# Sqlserver Sqlserver Check if no existing schema exists', async () => {
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

        let exists = await RedEntities.Entities( schema ).ExistsSchema();

        assert.isFalse( exists );
    });

    it( '# Sqlserver Sqlserver Check existing schema', async () => {
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

    it( '# Sqlserver Sqlserver Create schema with one entity', async () => {
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

    
    it( '# Sqlserver Create schema with multiple entities', async () => {
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

    
    it( '# Sqlserver GetFieldDefinitionInSchema test', () => {
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
});