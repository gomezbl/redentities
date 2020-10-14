"use strict";

const SqlEntities = require("./SqlEntities.js");

class RedEntities {
    constructor(databaseConfig) {
        this.DatabaseConfig = databaseConfig;
    }

    Entities( schema ) {        
        switch( this.DatabaseConfig.provider ) {
            case "mysql": {
                return new SqlEntities( this.DatabaseConfig, schema, getMysqlAdaptors() );
            }
            case "sqlite": {
                return new SqlEntities( this.DatabaseConfig, schema, getSqliteAdaptors() );
            }
            case "sqlserver": {
                return new SqlEntities( this.DatabaseConfig, schema, getSqlserverAdaptors() );
            }

            default: throw new Error( `Unkown provider named as '${this.DatabaseConfig.provider}'` );            
        }        
    }
};

function getMysqlAdaptors() {
    return {
        Connector: require("./providers/mysql/MySqlConnector"),
        Formatters: require("./providers/mysql/MySqlFormatters"),
        DatabaseRemover: require("./providers/mysql/MySqlDatabaseRemover"),
        DatabaseCreator: require("./providers/mysql/MySqlDatabaseCreator"),
        DatabaseExists: require("./providers/mysql/MySqlDatabaseExists")
    }
}

function getSqliteAdaptors() {
    return {
        Connector: require("./providers/sqlite/SqliteConnector"),
        Formatters: require("./providers/sqlite/SqliteFormatters"),
        DatabaseRemover: require("./providers/sqlite/SqliteDatabaseRemover"),
        DatabaseCreator: require("./providers/sqlite/SqliteDatabaseCreator"),
        DatabaseExists: require("./providers/sqlite/SqliteDatabaseExists")
    }
}

function getSqlserverAdaptors() {
    return {
        Connector: require("./providers/sqlserver/SqlserverConnector"),
        Formatters: require("./providers/sqlserver/SqlserverFormatters"),
        DatabaseRemover: require("./providers/sqlserver/SqlserverDatabaseRemover"),
        DatabaseCreator: require("./providers/sqlserver/SqlserverDatabaseCreator"),
        DatabaseExists: require("./providers/sqlserver/SqlserverDatabaseExists")
    }
}

module.exports = (databaseConfig) => new RedEntities(databaseConfig);