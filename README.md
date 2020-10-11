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
* string, default value: string empty.
* datetime, default value: current datetime in UTC.
* boolean, default value: false.
* integer, default value: 0,
* float: default value: 0.0
* json, default value: {} (empty json object)

## Indexes
Within the model, you add indexes with the property "indexes". Like in the sample above, this property is an array with the properties (fields) included in each index.

## Creating RedEntities instance
To create an instance of RedEntities, just
```javascript
const RedEntitiesConfig = {
    "provider": "mysql", 
    "host" : "0.0.0.0",
    "database" : "redentitiestest",
    "user" : "myuser", 
    "password" : "myuserpassword"
};

const RedEntities = require("redentities")(RedEntitiesConfig);
```

, where RedEntitiesConfig is a json object with database access credential and location. Properties of RedEntitiesConfig is selfdescribed.

Currently, only **mysql** provider is supported. In future updates of Red Entities, other providers will be included.

Once you get RedEntities instance, get the RedEntities object just with:
```javascript
const db = RedEntities.Entities(jsonSchema);
```

After doing this, you are ready to retrieve, put, delete and update data within your database without any sql query sintax.

## Schema for the samples
Consider this schema for the following documentation:
```javascript
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

## Entities in db instance
For fast write query sentences, RedEntities instances a property for each entity defined in the json schema.

Following the sample, when you instance an schema with:
```javascript
const db = RedEntities.Entities(jsonSchema);
```
, db object has a property with the name of the entities defined in the schema (db.users, ie.).

## Selectors
RedEntities supports four selectors. They are available for each entity instance:
* db.users.S() : run this for select queries
* db.users.I() : run this for insert queries.
* db.users.D() : run this for delete queries:
* db.users.U() : run this for update queries.

## Basic samples
Here there are some basic samples of usage of the API using above model schema.

### Build insert queries
Inserting a new row is fast with RedEntities:
```javascript
let values = { Name: "testuser", Alias: "testalias" };

const id = await db.users.I().V( values ).R();
```
The id of the row is returned. The ids of rows in RedEntities are generated automatically. They are based on an 9 unique characters (shortid library is used).

See tests for more examples.

### Build select queries
```javascript
let entity = await db.users.S().SingleById( <id> );
```
### Build update queries
```javascript
await db.users.U()
              .W("ID = ?", user.ID)
              .V( ["Alias"], [newAlias] ).R();
```
### Build delete queries
```javascript
await db.Delete("users").DeleteById( <id> );
```

### Any funtionality missing?
Please consider to open an issue to improve this project. Glad to hear any suggestion.

## More info
Working in describing with detail the full API for RedEntities. In the meantime, refer to the tests in /test folder for full working samples.

Remember: testing is a way to document code ;-)