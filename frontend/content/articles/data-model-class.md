---
title: Data Model Class
description: A JavaScript class for creating data models
date: 2021-03-28T23:07:22.325Z
updated: 2021-03-30T18:28:47.462Z
image: /images/blog/code.jpg
tags:
  - JavaScript
  - Snippets
---

Using a data model class like this makes your database code cleaner and easier to manage. By creating a Model superclass, you eliminate the need to rewrite the fetching and saving logic for all your data models. You then use subclasses to define each data model's collection, schema, and unique properties and methods.

## Initiate the Database

First, you'll need to create a database connection.

```javascript [db/database.js]
import mongodb from "mongodb";

let _db: mongodb.Db;

class database {
  client = mongodb.MongoClient;
  connected = false;

  async connect() {
    let result;
    try {
      result = await this.client.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true
      });
    } catch (err) {
      console.log(err);
    }

    if (result) {
      this.connected = true;
      _db = result.db();
      return true;
    }

    return false;
  }
}

export default {
  database: new database(),
  connection: () => {
    return _db;
  }
};
```

```javascript [index.js]
import { database } from "./db/database.js";

(async () => {
  const connected = await database.connect();
  console.log("DB Connected:", connected);
})();
```

## The Base Class

The base class is a data model template with generic fetch and save methods.

```javascript [db/model.js]
import { connection } from "./database.js";

export default class Model {
  constructor(data) {
    this.db = connection();
    this.checkCollection();

    this.checkSchema();
    if (data) {
      this.data = this.enforceSchema(data);
    }
  }

  collection() {
    this.checkCollection();
    return this.db.collection(this.constructor.collection);
  }

  checkCollection() {
    if (!this.db) this.throw("No database connection");
    if (!this.constructor.collection)
      this.throw("Expected a collection property on model");
  }

  schema() {
    return this.constructor.schema;
  }

  checkSchema() {
    if (Array.isArray(this.schema())) {
      const schema = this.schema().map(s => {
        if (typeof s === "string") {
          return { name: s, required: false, default: null };
        }
        return s;
      });

      schema.forEach((s, i) => {
        if (!s.name) this.throw(`Schema item ${i} is missing a name`);
        if (typeof s.default !== "undefined" && s.default !== null) {
          if (s.type) {
            if (typeof s.type === "string" && typeof s.default !== s.type) {
              this.throw(`${s.name}: Schema default has invalid type`);
            } else if (typeof s.type === "function" && !s.type(s.default)) {
              this.throw(`${s.name}: Schema default has invalid type`);
            } else if (!(s.default instanceof s.type)) {
              this.throw(`${s.name}: Schema default has invalid type`);
            }
          }
        }
      });

      return schema;
    }
  }

  enforceSchema(data, soft) {
    const schema = this.checkSchema();
    if (!schema) return data;

    const defaults = schema
      .forEach((s, i) => {
        if (s.required && !data[s.name])
          this.throw(`${s.data}: Required property is missing`, soft);
      })
      .filter(s => !!s.default)
      .reduce((obj, s) => {
        obj[s.name] = s.default;
        return obj;
      }, {});

    return Object.entries(data)
      .filter(([key, val]) => {
        return schema.find((s, i) => {
          if (s.name === key) {
            if (s.type) {
              if (typeof s.type === "string" && typeof val !== s.type) {
                this.throw(`${key}: Invalid type`, soft);
              } else if (typeof s.type === "function" && !s.type(val)) {
                this.throw(`${key}: Invalid type`, soft);
              } else if (!(val instanceof s.type)) {
                this.throw(`${key}: Invalid type`, soft);
              }
            }
            return true;
          }
          return false;
        });
      })
      .reduce((obj, [key, val]) => {
        obj[key] = val;
        return obj;
      }, defaults);
  }

  throw(msg, soft) {
    if (soft) console.warn(msg);
    else throw new Error(msg);
  }

  async fetch(query) {
    if (!(query instanceof Object))
      this.throw("Expected query as instance of Object");

    this.data = await this.collection().findOne(query);
    return this.data && this.enforceSchema(this.data, true);
  }

  async save(data) {
    if (!this.data._id) this.throw("Instance is missing an id");
    if (!(data instanceof Object))
      this.throw("Expected data as instance of Object");

    const saveData = this.enforceSchema({ ...this.data, ...data });
    delete saveData._id;
    const result = await this.collection().updateOne(
      { _id: this.data.id },
      { $set: { ...saveData } },
      { upsert: true }
    );

    this.data = { _id: this.data._id, ...saveData };
    return result;
  }
}
```

## An Example Subclass

You can then extend the base class to define a specific data entity, such as users, orders, etc. If specified, a schema will enforce specific object properties. It is not required to have a schema.

```javascript [db/user.js]
import Model from "./model.js";

export default class User extends Model {
  static schema = [
    { name: "_id", type: "string", required: true },
    { name: "username", type: "string", required: true },
    { name: "email", type: "string", required: true },
    { name: "age", type: "number", required: false, default: 0 }
  ];
  static collection = "users";

  constructor(data) {
    super(data);
  }
}
```

## Example Usage

```javascript
import User from "../db/user.js";

async function updateUserAge(userId, age) {
  const user = new User();
  await user.fetch({ _id: userId });
  console.log("Before", user.data);

  const result = await user.save({ age: age });
  console.log("After", result);
}
```
