# Red Entities update sentences

Updating entities is done using U() selector and indicating the new values in V() selector.

```js
await db.U().W("ID=?", userId).V( { mail: "newmail@redentities.com" } ).R();
```

V() syntax allows to indicate values to update using arrays with field names and its fields values:

```js
await db.U().W("ID=?", userId).V(["mail"], ["newmail@redentities.com"]).R();
```

First parameters or V() is an array with the names of the fields to update; the second one is an array with the new values.

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
