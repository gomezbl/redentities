"use strict";

const Sqlite = require("sqlite3");

module.exports = {
    CreateDatabase: async (databaseName, formatters, connector, databaseConfig) => {
        return new Promise((res, rej) => {
            new Sqlite.Database(databaseConfig.databasepath, (err) => {
                if (err) {
                    return rej(err);
                }
                res();
            });
        });
    }
}