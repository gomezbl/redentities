"use strict";

module.exports = {
    FromJsonToBase64: function( json ) {
        let b = new Buffer.from( JSON.stringify( json ) );
        return b.toString("base64");
    },

    FromBase64ToJson: function( base64string ) {
        var b = new Buffer.from( base64string, "base64" );
        return JSON.parse(b.toString());
    }
}