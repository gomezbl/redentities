# Red Entities indexes

You can create all sort of indexes in the definition of the schemas for your entities.

Two types indexes: regular ones and unique ones.

Just add atribute "indexes" and set an array with the names of the fields to index.

Unique indexes are added under "restrictions" attibute (cause in future versions, this will evolve with richer funcionality).

Following the sample schema used in this documentation, just have a look to "indexes" and "restrictions" properties.

```js
const sampleSchema = {
    entities: [
        {
            name : "users",
            fields: [
                { name : "mail", type : "string" },
                { name : "password", type : "string" },
                { name : "created", type : "datetime"}
            ],
            indexes: [ ["mail"], ["created"] ],
            restrictions: {
                unique: [ ["mail"] ]
            }
        }
    ]
}
```

In this sample, three indexes will be created when installing the schema in the database: one for "mail", one for "created" and another (and unique) for "mail".

You can create indexes for more than one field, like ["mail","alias"], ie.

## Documentation
- [Providers config](/docs/providers.md)
- [Sample schema](/docs/sampleschema.md)
- [Defining schemas](/docs/schemas.md)
- [Types supported](/docs/types.md)
- [Creating schemas](/docs/schemascreation.md)
- [Indexes](/docs/indexes.md)
- [Rows ids](/docs/ids.md)
- [Query shortcuts](/docs/queryshortcuts.md)
- [Insert values](/docs/insert.md)
- [Select values](/docs/select.md)
- [Update values](/docs/update.md)
- [Delete values](/docs/delete.md)
- [Iterating over values](/docs/iterating.md)
- [Updating schema to a new version](/docs/updatingschemasversion.md)
