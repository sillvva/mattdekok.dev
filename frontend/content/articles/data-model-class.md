---
title: Data Model Class
description: A JavaScript class for creating data models
date: 2021-03-28T23:07:22.325Z
updated: 2021-03-29T17:02:23.184Z
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
    if (!this.db) throw new Error("No database connection");

    this.data = this.filterDataBySchema(data || {});
  }

  schema() {
    return this.constructor.schema;
  }

  collection() {
    if (!this.db) throw new Error("No database connection");
    if (!this.constructor.collection)
      throw new Error("Expected a collection property on model");

    return this.db.collection(this.constructor.collection);
  }

  filterDataBySchema(data) {
    return this.schema() instanceof Array
      ? Object.entries(data)
          .filter(([key]) => this.schema().find(k => k === key))
          .reduce((obj, [key, val]) => {
            obj[key] = val;
            return obj;
          }, {})
      : data;
  }

  async fetch(query) {
    if (!(query instanceof Object))
      throw new Error("Expected query as instance of Object");

    this.data = await this.collection().findOne(query);
    return this.data;
  }

  async save(data) {
    if (!this.data._id) throw new Error("Instance is missing an id");
    if (!(data instanceof Object))
      throw new Error("Expected data as instance of Object");

    const saveData = this.filterDataBySchema(data);
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
  static schema = ["_id", "username", "age"];
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

  const result = await user.save({ ...user.data, age: age });
  console.log("After", result);
}
```
