const assert = require("chai").assert;
const ShortId = require("shortid");

const RedEntitiesConfig = require("./config/RedEntitiesTestConfig.json");
const testSchema = require("./config/TestSchema.json");

const RedEntities = require("../../lib/redentities")(RedEntitiesConfig);
const db = RedEntities.Entities(testSchema);

describe( 'Redentities insert tests', () => {
    before( async () => {
        await db.RemoveAndCreateDatabase( RedEntitiesConfig.database );
        await RedEntities.Entities( testSchema ).CreateSchema();            
    });

    
    it( '# Insert simple entity', async () => {
        let values = { Name: ShortId.generate(), Alias: ShortId.generate() };
        await db.users.I().V( values ).R();
    });

    
    it( '# Insert simple entity and check ID', async () => {
        let entityId = await db.users.I().V( { Name: ShortId.generate(), Alias: "foo" } ).R();

        assert.equal( "string", typeof entityId );
    });

    
    it( '# Insert boolean value with boolean value', async () => {
        let entityId = await db.booleantype.I().V( { Value: true }).R();

        assert.equal( "string", typeof entityId );
    });

    
    it( '# Insert boolean value with string value', async () => {
        let entityId = await db.booleantype.I().V( { Value: "true" }).R();

        assert.equal( "string", typeof entityId );
    });

    
    it( '# Insert datetime value', async () => {
        let now = new Date(new Date().toUTCString())

        let entityId = await db.datetimetype.I().V( { Value: now } ).R();
    
        assert.equal( "string", typeof entityId );
    });

    
    it( '# Insert default values', async () => {        
        let entityId = await db.defaultvalues.I().V( { f0 : "somevalue"} ).R();

        assert.equal( "string", typeof entityId );
    });

    
    it( '# Insert json value', async() => {
        let entityId = await db.jsontable.I().V( { j0 : { title: "The Coder Habits"}} ).R();

        assert.equal( "string", typeof entityId );
    });

    
    it( '# Insert simple json value and retrieve', async() => {
        let jsonTest = { a:20 };

        let entityId = await db.jsontable.I().V( { j0 : jsonTest } ).R();

        let jsonRetrieved = await db.jsontable.S().W("ID=?", entityId).R();

        assert.equal( "string", typeof entityId );
        assert.equal( JSON.stringify(jsonTest), JSON.stringify(jsonRetrieved[0].j0) );
    });

    
    it( '# Insert empty json value and retrieve', async() => {
        let jsonTest = {};

        let entityId = await db.jsontable.I().V( { j0 : jsonTest } ).R();

        let jsonRetrieved = await db.jsontable.S().W("ID=?", entityId).R();

        assert.equal( "string", typeof entityId );
        assert.equal( JSON.stringify(jsonTest), JSON.stringify(jsonRetrieved[0].j0) );
    });

    
    it( '# Insert array of json value and retrieve', async() => {
        let jsonTest = [{a:10},{a:20},{a:30}];

        let entityId = await db.jsontable.I().V( { j0 : jsonTest } ).R();

        let jsonRetrieved = await db.jsontable.S().W("ID=?", entityId).R();

        assert.equal( "string", typeof entityId );
        assert.equal( JSON.stringify(jsonTest), JSON.stringify(jsonRetrieved[0].j0) );
    });

    
    it( '# Insert complex json value and retrieve', async() => {
        let jsonTest = {
            book: 'bookname',
            title: 'title',
            ISBN: '2393939202033',
            userId: '88c8c8cosls',
            owners: [{a:10},{a:20},{a:30}]
        }

        let entityId = await db.jsontable.I().V( { j0 : jsonTest } ).R();

        let jsonRetrieved = await db.jsontable.S().W("ID=?", entityId).R();

        assert.equal( "string", typeof entityId );
        assert.equal( JSON.stringify(jsonTest), JSON.stringify(jsonRetrieved[0].j0) );
    });

    
    it( '# Insert float value', async() => {
        let entityId = await db.floattable.I().V( { f : 1.9 } ).R();

        assert.equal( "string", typeof entityId );
    });

    it( '# Insert string with quote entity', async () => {
        let alias = "O'Brian";
        let values = { Name: ShortId.generate(), Alias: alias };
        let entityId = await db.users.I().V( values ).R();

        let entity = await db.users.S().SingleById(entityId);
        assert.equal( entity.Alias, alias );
    });

    it( '# Insert longtext', async () => {
        let text = "Su última novela es El proyecto de mi vida.()&";
        let values = { t: text };
        let entityId = await db.longtexttype.I().V( values ).R();

        let entity = await db.longtexttype.S().SingleById(entityId);
        assert.equal( entity.t, text );
    });

    it( '# Insert longtext with accents, quotes and symbols', async () => {
        let text = "'''Su última novela es El/ proy\"ecto de<>&%$()-_ mi vida.()&";
        let values = { t: text };
        let entityId = await db.longtexttype.I().V( values ).R();

        let entity = await db.longtexttype.S().SingleById(entityId);
        assert.equal( entity.t, text );
    });
});