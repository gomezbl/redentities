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
            default: throw new Error( `Unkown provider named as '${this.DatabaseConfig.provider}'` );            
        }        
    }
};

module.exports = (databaseConfig) => new RedEntities(databaseConfig);