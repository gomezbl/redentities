const ShortId = require("shortid");

const RedEntitiesConfig = require("./config/RedEntitiesTestConfig.json");
const testSchema = require("./config/TestSchema.json");

const RedEntities = require("../../lib/redentities")(RedEntitiesConfig);
const db = RedEntities.Entities(testSchema);

async function insertSampleUserEntity() {
    let entity = { Name: ShortId.generate(), Alias: ShortId.generate() };

    entity.ID = await db.Insert( "users" )
        .Values( entity )
        .Run()

    return entity;
}

describe( 'Sqlite Redentities delete tests', () => {
    before( async () => {
        await db.RemoveAndCreateDatabase( RedEntitiesConfig.database );
        await RedEntities.Entities( testSchema ).CreateSchema();            
    });

    it( '# Sqlite Delete simple entity by ID', async () => {
        let user = await insertSampleUserEntity();
        await db.Delete("users").DeleteById( user.ID );
    });

    it( '# Sqlite Delete simple entity by field', async () => {
        let user = await insertSampleUserEntity();
        await db.Delete("users").Where( "Name = ?", user.Name ).Run();
    });
});