# Sample schema

For the following samples, this schema will be used:

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

const RedEntities = require("redentities")({
    provider: "mysql",
    host: "localhost",
    user: "myuser",
    password: "mypassword"
});

const db = RedEntities.Entities(sampleSchema);
```

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