"use strict";

const Sqlite = require("sqlite");

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
            DatabasePool[databaseConfig.database].run( sqlQuery, (err, result) => {
                if ( !!err ) { reject(err); }
                else resolve( JSON.parse(JSON.stringify(result)) );
            });
        });
    },
    
    /*
     * Run a query in its own connection. Connection to mysql database is open and closed
     */
    RunQueryOwnConnection: async (databaseConfig, sql) => {
        let db = await CreateSqliteDatabaseInstance(databaseConfig);
 
        return new Promise( (resolve, reject) => {
            db.run( sql, (error) => {
                if (error) reject(error);
                else { 
                    db.close();
                    resolve(); }
            });
        });
   }
}

async function CreateSqliteDatabaseInstance(databaseConfig) {
    return new Promise((res, rej) => {
        let db = new Sqlite.Database(`${databaseConfig.database}.db`, (err) => {
            if (err) {
                return rej(err);
            }
            res(db);
        });
    })
}