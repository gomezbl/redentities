# Red Entities iterating over values

When formatting a query, you can iterate over the results using IA() selector.

This selector expects a function which recieves as parameter the instance of the entity.

```js
// Iterater over all users

let fnc = async (entity) => {
    // Do something with entity :)
}

await db.users.S().IA(fnc);
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