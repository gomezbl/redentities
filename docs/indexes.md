# Red Entities indexes

You can create all sort of indexes in the definition of the schemas for your entities.

Two types indexes: regular ones and unique ones.

Just add atribute "indexes" and set an array with the names of the files to index.

Unique indexes are added under "restrictions" attibute (cause in future versions, this will evolve with richer funcionality).

Following the sample schema used in this documentation, just have a look to "indexes" and "restrictions" attraibutes.

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