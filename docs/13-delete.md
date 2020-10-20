# Red Entities delete sentences

Deleting entities with Red Entities is fast using D() selector:

```js
await db.users.D().DeleteById(userIdToRemove);

await db.users.D().W("mail=?",mail).R();
```

D() selectors returns the number of rows removed.

[Next - #14 Iterating over values](/docs/14-iterating.md)