# Red Entities

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License](https://img.shields.io/npm/l/express.svg)](https://github.com/jprichardson/node-fs-extra/blob/master/LICENSE)

What it is?

Red Entities is a simple but flexible and fast ORM and sql query builder.

Red Entities is focused on minimal typing when accesing data and the definition of database models using schemas (simple json objects).

## Database engines supported

Tested with:
* Mysql 5.x
* Mysql 8.x
* Amazon Aurora
* AWS RDS databases based on Mysql
* Sqlite3
* (future integration of Posgresql, MariaDB and Sql Server)
  
Thus, has been fully tested with:
* Node.js 10.x
* Node.js 12.x
* Node.js 13.x
* Node.js 14.x

## Install

    $ npm install redentities --save

## Test

Change database configuration in files
* /test/mysql/config/RedEntitiesTestConfig.json
* /test/sqlite/config/RedEntitiesTestConfig.json

Testing will create many databases and tables.

Then, just run (mocha required): 

    $ npm test

## Basic sample

Consider this self-explained schema: 
```js
const sampleSchema = {
    "entities" : [
        {
            "name" : "users",
            "fields": [
                { "name" : "mail", "type" : "string" },
                { "name" : "password", "type" : "string" },
                { "name" : "created", "type" : "datetime"}
            ],
            "indexes": [ ["mail"], ["created"] ]
        }
    ]
}
```

Load this schema in an Red Entities object to be used in a Mysql database:

```js
const RedEntities = require("redentities")({
    provider: "mysql",
    host: "localhost",
    user: "myuser",
    password: "mypassword"
});
```

Create once schema in database with:
```js
await RedEntities.Entities(sampleSchema).CreateSchema();
```

From now on, you can use Red Entities powers with fast sentences like this:

```js
const db = await RedEntities.Entities(sampleSchema);

const newUserId = await db.users.I().V( { 
    mail: "re@redentities.com",
    password: "12345" ).R();
```

Retrieve an entity with simple sentences like:

```js
let userEntity = await db.users.S().SingleById(userId);
```

## Introduction

Red Entities is a simple ORM and sql builder for building fast model schemas and accesing data with fast and minimal code.

It has been design with optimization and extensibility in mind. Future versions will improve and add more database providers.

Current version supports MySql (and all its flavours) and Sqlite 3, but currently is fully tested only with MySql 5.x, 8.x, Aurora and AWS RDS Mysql based databases.

## Design intention

The intention design behind Red Entities is to keep data in data repositories (databases) with minimal design and no relations between entities, avoiding complex sql syntax typing in production code.

Minimal design in data repositories: Yes, is a principle to afford big projects with models which change constantly. Just use repositories as... a way to store, modify an retrieve data.

That's the reason that Red Entities doesn't support joins... (currently).

Is some kind of analytics should be performed over data, then these data should be placed in a way to *allow* data analysis, but production data should be placed in a simple storage as posible: fast to insert and fast to retrieve.

This project is part of Mantra Framework, which uses fully Red Entities as its ORM layer to build its components.

## Documentation
- [Defining schemas](docs/schemas.md)
- [Types supported](docs/types.md)
- [Creating schemas](docs/schemascreation.md)
- [Indexes](docs/indexes.md)
- [Rows ids](docs/ids.md)
- [Query shortcuts](docs/queryshortcuts.md)
- [Insert values](docs/insert.md)
- [Select values](docs/select.md)
- [Update values](docs/update.md)
- [Delete values](docs/delete.md)
- [Dynamic schemas](docs/dynamicschemas.md)
- [Iterating over values](docs/iterating.md)

## Credits

`Red Entities` has been fully written by:

- [Rafael Gómez Blanes](https://github.com/gomezbl)


## License

Licensed under MIT

Copyright (c) 2011-2017 [Rafael Gómez Blanes](https://github.com/gomezbl)
