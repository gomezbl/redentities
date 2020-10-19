# Red Entities insert sentences

Inserting new values is easy using I() selector:

## Insert simple value

```js
const entityId = await db.users.I().V( { mail: "rd@redentities.com", password: "12345" }).R();
```

## Documentation
- [Providers config](/docs/providers.md)
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