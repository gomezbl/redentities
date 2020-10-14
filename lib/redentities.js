"use strict";

const SqlEntities = require("./SqlEntities.js");

class RedEntities {
    constructor(databaseConfig) {
        this.DatabaseConfig = databaseConfig;
    }

    Entities( schema ) {        
        switch( this.DatabaseConfig.provider ) {
            case "mysql": {
                const adaptors = getMysqlAdaptors();

                return new SqlEntities( this.DatabaseConfig, schema, adaptors );
            }
            case "sqlite": {
                const adaptors = getSqliteAdaptors();

                return new SqlEntities( this.DatabaseConfig, schema, adaptors );
            }
            default: throw new Error( `Unkown provider named as '${this.DatabaseConfig.provider}'` );            
        }        
    }
};

function getMysqlAdaptors() {
    return {
        Connector: require("./mysql/MySqlConnector"),
        Formatters: require("./mysql/MySqlFormatters"),
        DatabaseRemover: require("./mysql/MySqlDatabaseRemover"),
        DatabaseCreator: require("./mysql/MySqlDatabaseCreator"),
        DatabaseExists: require("./mysql/MySqlDatabaseExists")
    }
}

function getSqliteAdaptors() {
    return {
        Connector: require("./sqlite/SqliteConnector"),
        Formatters: require("./sqlite/SqliteFormatters"),
        DatabaseRemover: require("./sqlite/SqliteDatabaseRemover"),
        DatabaseCreator: require("./sqlite/SqliteDatabaseCreator"),
        DatabaseExists: require("./sqlite/SqliteDatabaseExists")
    }
}

module.exports = (databaseConfig) => new RedEntities(databaseConfig);