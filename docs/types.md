# Red Entities supported types

(Remember: best documentation in software should be found at... tests)

Currently, Mysql database engine flavours and Sqlite3 are supported.

These are the types mapped from Red Entities to MySql databases:

* "string" -> Mysql type of VARCHAR(2048)
* "key"-> Mysql type of VARCHAR(24)
* "integer" -> Mysql type of INT
* "boolean" -> Mysql type of BOOLEAN
* "datetime" -> Mysql type of DATETIME
* "json" -> Mysql type of LONGTEXT
* "float" -> Mysql type of FLOAT
* "longtext" -> Mysql type of LONGTEXT

The following are the mappings to Sqlite3 database engine:

* "string" -> Sqlite3 type of TEXT
* "key"-> Sqlite3 type of TEXT
* "integer" -> Sqlite3 type of INTEGER
* "boolean" -> Sqlite3 type of INTEGER (0 or 1)
* "datetime" -> Sqlite3 type of TEXT
* "json" -> Sqlite3 type of TEXT
* "float" -> Sqlite3 type of REAL
* "longtext" -> Sqlite3 type of TEXT

Tip: keeping your data persistance simple improves the design and scalability of your application.

## Documentation
- [Providers config](docs/providers.md)
- [Sample schema](docs/sampleschema.md))
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
- [Iterating over values](docs/iterating.md)
- [Updating schema to a new version](docs/updatingschemasversion.md)