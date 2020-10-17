# Red Entities query shortcuts

Red Entities has been design to minimize the code needed to access data, in a regular and coherent way, avoidind sql syntax directly with all its dialects depending on the provider.

There exists four *shorcuts* to create sql sentences:

Given 

```js
const db = await RedEntities.Entities(sampleSchema);
```

, you have these shorcuts:

- db.S() -> to create select queries
- db.I() -> to create insert queries
- db.U() -> to create update queries
- db.D() -> to create delete queries

More on:

- [Insert values](docs/insert.md)
- [Select values](docs/select.md)
- [Update values](docs/update.md)
- [Delete values](docs/delete.md)