# Red Entities schemas

(Remember: best documentation in software should be found at... tests)

A schema is a json object describing the data you need to persist.

One json schema object can contain different entities.

Each entity consists of a number of properties (fields with their types).

Red Entities maps the schema to sql table dialects, depending on the provider (Mysql, Sqlite, etc.).

In the scope of your application, create your Red Entities instances with your schemas once, because the process of mapping and creation of shortcut functions is heavy load.

## Defining a schema

You define a schema with this sort of json object:

```js
const schema = {
    entities: [
        {
            name : <name of the entity>,
            fields: [
                { name : <name of the property>, type: <type of the property> }
                ...
            ],
            indexes: [ [<name of the property>], [<name of the property 1>, <name of the property 2>] ]
        }
        ...
    ]
}
```

Each entity is mapped to a sql table. See [Types supported](docs/types.md) to check types currently supported and how they are mapped to specific engines supported.

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