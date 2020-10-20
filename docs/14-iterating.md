# #14 Red Entities iterating over values

When formatting a query, you can iterate over the results using IA() selector.

This selector expects a function which recieves as parameter the instance of the entity.

```js
// Iterater over all users

let fnc = async (entity) => {
    // Do something with entity :)
}

await db.users.S().IA(fnc);
```