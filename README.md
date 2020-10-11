# Red Entities - simple ORM and query builder to build fast queries

## Install
$ npm install redentities --save

## Test
Change database configuration credentials in file /test/config/RedEntitiesTestConfig.json

Testing will create many databases and tables.

Just run: 

$ mocha

If don't have mocha installed, use:
"$ npm install -g mocha" )
## Introduction
Red Entities is a simple ORM and sql builder for building fast model schemas and accesing data with fast and minimal code.

It has been design with optimization and extensibility in mind. Future versions will improve and add more database providers.

Current version only supports MySql (and all its flavours), but currently is fully tested only with MySql 5.7. Future updates and updates will integrate (and test) MySql 8.x, MariaDB, Postgresql, SqlLite, Sql Server, etc.

The intention design behind RedEntities is to keep data in data repositories (databases) with minimal design and no relations between entities, avoiding any sql syntax typing.

Minimal design in data repositories: Yes, is a principle to afford big projects with models which change constantly.

That's the reason that RedEntities doesn't support joins...

This project is part of Mantra Framework, which uses fully RedEntities as its ORM layer to build its components.

RedEntities is fast, simple and efficient.

## Defining a model
A model (data schema), is defined easily with a json object. In this key / value json object, you define the name of the property, its type and its default value. Like this:
```javascript
{
    "entities" : [
        {
            "name" : "users",
            "fields": [
                { "name" : "mail", "type" : "string" },
                { "name" : "password", "type" : "string" },
                { "name" : "activated", "type" : "boolean", "default": false },
                { "name" : "created", "type" : "datetime"}
            ],
            "indexes": [ ["mail"], ["activated","created"] ]
        },
}
```
Note: consider this schema for the following documentation. </br>
The are the types supported:
* string
* datetime
* boolean
* integer
* float
* json

## Indexes
Within the model, you add indexes with the property "indexes". Like in the sample above, this property is an array with the properties included in each index.

## Creating RedEntities instance
To create an instance of RedEntities, just
```
$ const RedEntities = require("redentities")(RedEntitiesConfig);
```

, where RedEntitiesConfig is a json object with database access credential and location:

```
{
    "provider": "mysql", 
    "host" : "0.0.0.0",
    "database" : "redentitiestest",
    "user" : "myuser", 
    "password" : "myuserpassword"
}
```
Currently, only 'mysql' provider is supported.</br>
After doing this, get the RedEntities object just with:
```
const db = RedEntities.Entities(jsonSchema);
```
After doing this, you are ready to get, put and update data within your database.

## Build insert queries
Considering this schema:
```
{
    "entities": [
        {   
            "name": "users",
            "fields": [
                { "name": "Name", "type": "string" },
                { "name": "Alias", "type": "string" }
            ] 
        }
}
```
Inserting a new row is fast with RedEntities:
```
let values = { Name: "testuser", Alias: "testalias" };

await db.users.I().V( values ).R();
```
The id of the row is returned.
See tests for more examples.

## Build select queries

## Build update queries

## Build delete queries

## Any funtionality missing?
Please consider to open an issue to improve this project. Glad to hear any suggestion.