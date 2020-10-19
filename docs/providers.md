# Red Entities schemas

(Remember: best documentation in software should be found at... tests)

When creating Red Entities instance, you need to set the provider config (Mysql, Sqlite, etc).

This provider info is a json object with some credentials (if needed) of data that the provider needs.

For Mysql based engines, the json configuration is like this:

```js
{
    provider: "mysql",
    host: <mysql host, localhost, ip, domain, etc.>,
    user: <user name>,
    password: <user password>
}
```

For Sqlite instance, the json configuration is simple:

```js
{
    provider: "sqlite",
    databasepath: <full path to the database file>
}
```

Given a configuration json object, you instance Red Entities with:

```js
const RedEntities = require("redentities")( config );
```

Some samples of config files:

```js
const config = {
    provider: "mysql",
    host: "localhost",
    user: "myuser",
    password: "mypassword"
}
```

```js
const config {
    provider: "sqlite",
    databasepath: "/mnt/files/mydatabase.db"
}
```

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