const assert = require("chai").assert;
const ShortId = require("shortid");

const RedEntitiesConfig = require("./config/RedEntitiesTestConfig.json");
const testSchema = require("./config/TestSchema.json");

const RedEntities = require("../../lib/redentities")(RedEntitiesConfig);
const db = RedEntities.Entities(testSchema);

function EntityShortId(prefix) {
    let px = prefix ? prefix : "";
    ShortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZñÑ');
    return `${px}${ShortId.generate()}`;
}

describe( 'Redentities tests', () => {
    before( async () => {
        await db.RemoveAndCreateDatabase( RedEntitiesConfig.database );
    });

    
    it( '# Check if no existing schema exists', async () => {
        let schema = {
            entities: [
                {   name: EntityShortId(),
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

    it( '# Check existing schema', async () => {
        let testSchema = {
            entities: [
                {
                    name: EntityShortId("table"),
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
    /*    
    it( '# Create schema with one entity', async () => {
        let testSchema = {
            entities: [
                {
                    name: EntityShortId(),
                    fields: [
                        { name: "title", type: "string" },
                        { name: "alias", type: "string" }
                    ]
                }
            ]
        }

        await RedEntities.Entities( testSchema ).CreateSchema();
    });

    /*
    it( '# Create schema with multiple entities', async () => {
        let testSchema = {
            entities: [
                {
                    name: EntityShortId(),
                    fields: [
                        { name: "title", type: "string" },
                        { name: "alias", type: "string" }
                    ]
                },
                {
                    name: EntityShortId(),
                    fields: [
                        { name: "user", type: "string" },
                        { name: "password", type: "string" }
                    ]
                },
            ]
        }

        await RedEntities.Entities( testSchema ).CreateSchema();
    });

    it( '# GetFieldDefinitionInSchema test', () => {
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
    */
});