"use strict";

const SqlEntities = require("./SqlEntities.js");

class RedEntities {
    constructor(databaseConfig) {
        this.DatabaseConfig = databaseConfig;
    }

    Entities( schema ) {        
        switch( this.DatabaseConfig.provider ) {
            case "mysql": {
                const connector = require("./mysql/MySqlConnector");
                const formatters = require("./mysql/MySqlFormatters");
                const databaseRemover = require("./mysql/MySqlDatabaseRemover");
                const databaseCreator = require("./mysql/MySqlDatabaseCreator");

                return new SqlEntities( this.DatabaseConfig, schema, connector, formatters, databaseRemover, databaseCreator );
            }
            case "sqlite": {
                const connector = require("./sqlite/SqliteConnector");
                const formatters = require("./sqlite/SqliteFormatters");
                const databaseRemover = require("./sqlite/SqliteDatabaseRemover");
                const databaseCreator = require("./sqlite/SqliteDatabaseCreator");

                return new SqlEntities( this.DatabaseConfig, schema, connector, formatters, databaseRemover, databaseCreator );
            }
            default: throw new Error( `Unkown provider named as '${this.DatabaseConfig.provider}'` );            
        }        
    }
};

module.exports = (databaseConfig) => new RedEntities(databaseConfig);