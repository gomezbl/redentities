"use strict";

const Sqlite = require("sqlite3");

var DatabasePool = [];

module.exports = {
    /*
     * Runs a query using connections in pool
     * Returns the result of the query
     */
    RunQuery: async (databaseConfig, sqlQuery) => {
        if ( DatabasePool[databaseConfig.database] == null ) {
            DatabasePool[databaseConfig.database] = await CreateSqliteDatabaseInstance(databaseConfig);
        }        

        return new Promise( (resolve, reject) => {
            DatabasePool[databaseConfig.database].all( sqlQuery, (err, result) => {
                if ( !!err ) { reject(err); }
                else {
                    result = result ? result : [];
                    resolve( JSON.parse(JSON.stringify(result)) );
                }
            });
        });
    },
    
    /*
     * Run a query in its own connection. Connection to mysql database is open and closed
     */
    RunQueryOwnConnection: async (databaseConfig, sql) => {
        if ( sql == "" ) return;

        let db = await CreateSqliteDatabaseInstance(databaseConfig);

        return new Promise( (resolve, reject) => {
            db.run( sql, (error) => {
                if (error) {
                    reject(error);
                }
                else { 
                    db.close();
                    resolve(); }
            });
        });
   }
}

async function CreateSqliteDatabaseInstance(databaseConfig) {
    return new Promise((res, rej) => {
        let db = new Sqlite.Database(databaseConfig.databasepath, Sqlite.OPEN_READWRITE, (err) => {
            if (err) return rej(err);
            
            res(db);
        });
    })
}