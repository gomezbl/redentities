# Red Entities schemas

(Remember: best documentation in software should be found at... tests)

A schema is a json object describing the data you need to persist.

One json schema object can contain different entities.

Each entity consists of a number of properties (fields with their types).

Red Entities maps the schema to sql table dialects, depending on the provider (Mysql, Sqlite, etc.).

In the scope of your application, create your Red Entities instances with your schemas once, because the process of mapping and creation of shortcut functions is heavy load.

## Defining a schema

You define a schema with this sort of json object:

```js
const schema = {
    entities: [
        {
            name : <name of the entity>,
            fields: [
                { name : <name of the property>, type: <type of the property> }
                ...
            ],
            indexes: [ [<name of the property>], [<name of the property 1>, <name of the property 2>] ]
        }
        ...
    ]
}
```

Each entity is mapped to a sql table. See [Types supported](docs/types.md) to check types currently supported and how they are mapped to specific engines supported.

## Creating a schema

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
This work of creating a schema, obsiously, only should have to be done once.

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