---
title: Data Model Class
description: A JavaScript class for creating data models
date: 2021-03-28T23:07:22.325Z
updated: 2021-03-30T18:28:47.462Z
image: /images/blog/code.jpg
tags:
  - JavaScript
  - Snippets
  - Database
---

Using a data model class like this makes your database code cleaner and easier to manage. By creating a Model superclass, you eliminate the need to rewrite the fetching and saving logic for all your data models. You then use subclasses to define each data model's collection, schema, and unique properties and methods.

This example uses MongoDB, though you can rewrite it to use any database.

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
import { ObjectId } from "mongodb";

(async () => {
  const connected = await database.connect();
  console.log("DB Connected:", connected);
})();
```

## The Base Class

The base class is a data model template with generic fetch and save methods.

```javascript [db/model.js]
import { connection } from "./database.js";
import { ObjectId } from "mongodb";

export default class Model {
  constructor(data) {
    this.db = connection();

    this.checkCollection();
    this.checkSchema();
    if (data) {
      this.data = this.enforceSchema(data, true);
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
    let schema = this.constructor.schema;
    const _id = schema.find(s => s && (s === '_id' || s.name === '_id'));
    if (!_id) schema = [ 
      { name: '_id', default: new ObjectId() }, 
      ...schema 
    ];
    return schema;
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
            } else if (typeof val === "object" && !(s.default instanceof s.type)) {
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

    schema.forEach(s => {
      if (s.required && !data[s.name])
        this.throw(`${s.name}: Required property is missing`, soft);
    });

    const defaults = schema
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

  /**
   * Fetches a single document from a collection.
   * 
   * @param {Object} query - The database query object
   * 
   * @returns {Object} - Returns document
   */
  async fetch(query) {
    if (!(query instanceof Object))
      this.throw("Expected query as instance of Object");

    const data = await this.collection().findOne(query);
    this.data = data && this.enforceSchema(data, true);
    return this.data;
  }

  /**
   * Fetches a single document from a collection and returns an instance of the class.
   * 
   * @param {Object} query - The database query object
   * 
   * @returns {Object} - Returns document as instance of the class
   */
  static async fetch(query) {
    const instance = new this();
    instance.fetch(query);
    return instance;
  }

  /**
   * Fetches multiple documents from a collection and returns them as instances of the class.
   * 
   * @param {Object} query - The database query object
   * @param {Object} [options] - The query options object
   * @param {number} [options.skip] - The number of documents to skip
   * @param {number} [options.limit] - The number of documents to return
   * 
   * @returns {Object} - Returns documents as instances of the class
   */
  static async fetchAll(query, options) {
    if (!(query instanceof Object))
      throw new Error("Expected query as instance of Object");
    if (options && options.skip && (
      !(
        typeof options.skip === "number") || 
        options.skip < 0 || 
        options.skip % 1 !== 0
      )
    ) throw new Error("Expected options.skip as null or positive whole number");
    if (options && options.limit && (
      !(
        typeof options.limit === "number") || 
        options.limit < 0 || 
        options.limit % 1 !== 0
      )
    ) throw new Error("Expected options.limit as null or positive whole number");
    
    const instance = new this();
    let results = instance.collection().find(query);
    if (options.skip) results.skip(options.skip);
    if (options.limit) results.limit(options.limit);
    results = await results.toArray();
    return results.map(r => new this(r));
  }

  /**
   * Saves instance data to the corresponding document by its _id. If no _id is specified, one will be created.
   * 
   * @param {Object} [data] - An object containing updated properties of the instance data.
   * 
   * @returns {Object} - Returns the database write result
   */
  async save(data) {
    if (data && !(data instanceof Object))
      this.throw("Expected data as instance of Object");

    const saveData = this.enforceSchema({ ...this.data, ...data });
    const _id = saveData._id;
    delete saveData._id;
    const result = await this.collection().updateOne(
      { _id: _id },
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
  static collection = "users";
  static schema = [
    { name: "_id", type: "string", required: true },
    { name: "username", type: "string", required: true },
    { name: "email", type: "string", required: true },
    { name: "age", type: "number", required: false, default: 0 }
  ];

  constructor(data) {
    super(data);
  }
}
```

## Example Usage

```javascript
import User from "../db/user.js";

async function updateUserAge(userId, age) {
  const user = await User.fetch({ _id: userId })
  console.log("Before", user.data);

  const result = await user.save({ age: age });
  console.log("Result", result);
  console.log("After", user.data);
}
```
## Demo

Here is a demo using dummy data:

https://codepen.io/Sillvva/pen/BMNrdG?editors=0011