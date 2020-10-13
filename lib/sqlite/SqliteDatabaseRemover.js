"use strict";

const FsExtra = require("fs-extra");
const Path = require("path");

module.exports = {
    RemoveDatabase: async (databaseName, formatters, connector, databaseConfig) => {
        let existsFile = await FsExtra.pathExists( databaseConfig.databasepath );

        if ( existsFile ) {
            await FsExtra.remove( databaseConfig.databasepath );
        }
    }
}