# Red Entities query shortcuts

Red Entities has been design to minimize the code needed to access data, in a regular and coherent way, avoidind sql syntax directly with all its dialects depending on the provider.

There exists four *shorcuts* or *selectors* to write sql sentences efficiently and quickly.

Given 

```js
const db = await RedEntities.Entities(sampleSchema);
```

, you have these shorcuts:

- db.S() -> to create select queries
- db.I() -> to create insert queries
- db.U() -> to create update queries
- db.D() -> to create delete queries

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
