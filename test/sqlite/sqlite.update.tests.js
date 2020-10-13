const assert = require("chai").assert;
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

describe( 'Redentities update tests', () => {
    /*
    before( async () => {
        await db.RemoveAndCreateDatabase( RedEntitiesConfig.database );
        await RedEntities.Entities( testSchema ).CreateSchema();            
    });

    it( '# Update simple entity', async () => {
        let newAlias = ShortId.generate();
        let user = await insertSampleUserEntity();
        await db.users.U().W("ID = ?", user.ID).V( ["Alias"], [newAlias] ).R();
        let entity = await db.users.S().SingleById(user.ID);

        assert.equal( newAlias, entity.Alias );
    });

    it( '# Update date time entity', async() => {
        let now = new Date(new Date().toUTCString())

        let entityId = await db.datetimetype.I().V( { Value: now } ).R();
    
        let entity = await db.datetimetype.S().SingleById( entityId );

        let newDateTime = new Date(new Date().toUTCString())

        await db.datetimetype.U().W("ID=?",entityId).V( ["Value"], [newDateTime]).R();
    });
    */
});