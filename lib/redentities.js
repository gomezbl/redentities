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

                return new SqlEntities( this.DatabaseConfig, schema, connector, formatters );
            }
            break;
            case "sqlite": {
                const connector = require("./sqlite/SqliteConnector");
                const formatters = require("./sqlite/SqliteFormatters");

                return new SqlEntities( this.DatabaseConfig, schema, connector, formatters );
            }
            break;            
            default: throw new Error( `Unkown provider named as '${this.DatabaseConfig.provider}'` );            
        }        
    }
};

module.exports = (databaseConfig) => new RedEntities(databaseConfig);