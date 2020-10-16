# Red Entities schemas creation

(Remember: best documentation in software should be found at... tests)

Considering this schema, you can create it on database with the following code:

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
            indexes: [ ["mail"], ["created"] ]
        }
    ]
}

const RedEntities = require("redentities")({
    provider: "mysql",
    host: "localhost",
    user: "myuser",
    password: "mypassword"
});

await RedEntities.Entities(sampleSchema).CreateSchema();
```

This work of creating a schema, obviously, only should have to be done once.

## Accessing schema instance

Once your schema is instantiated, you only have to create Red Entities instance to select, insert, update or delete entities:

```js
const RedEntities = require("redentities")({
    provider: "mysql",
    host: "localhost",
    user: "myuser",
    password: "mypassword"
});

let db = RedEntities.Entities(sampleSchema);

db.users.I().V( { mail: "foo@foo.com", password: "12345" } ).R();
```

In db instance, there's a property with the name of the entity (in this case 'users').

Remember: the purpose of Red Entities is to isolate database engines (as it do all ORM) and to provide a way to type sql sentences in a fast and smarter way.

Have a look to [Query shortcuts](docs/queryshortcuts.md) section for more info about this.