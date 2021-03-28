---
title: Data Model Class
description: A JavaScript class for creating data models
date: 2021-03-28T23:07:22.325Z
image: /images/code.jpg
tags:
  - JavaScript
  - Snippets
---

## The Base Class

The base class is a data model template with generic fetch and save methods.

```javascript
const db = require('./database.js');

class Model {
  constructor(data) {
    if (!db) throw new Error('Database is null or undefined');

    this.db = db;
    this.data = data || {};
    this.data =
      this.schema() instanceof Array
        ? Object.entries(this.data)
            .filter(([key]) => this.schema().find(k => k === key))
            .reduce((obj, [key, val]) => {
              obj[key] = val;
              return obj;
            }, {})
        : this.data;
  }

  schema() {
    return this.constructor.schema;
  }

  collection() {
    return this.constructor.collection;
  }

  static async getInstance(query) {
    if (!this.collection()) throw new Error("Expected a collection property on model");
    if (!(query instanceof Object)) throw new Error("Expected query as instance of Object");

    // Fetch doc from database based on query
    const doc = query;

    return doc ? new this(doc) : false;
  }

  async save(data) {
    if (!this.collection())
      throw new Error("Expected a collection property on model");
    if (!(data instanceof Object))
      throw new Error("Expected data as instance of Object");

    const saveData =
      this.schema() instanceof Array
        ? Object.entries(data)
            .filter(([key]) => this.schema().find(k => k === key))
            .reduce((obj, [key, val]) => {
              obj[key] = val;
              return obj;
            }, {})
        : data;

    // Save saveData to this.collection
    // return Promise with status ("success", "failed") and saveData;

    this.data = saveData;
    return this.data;
  }
}
```

## An Example Subclass

You can then extend the base class to define a specific data entity, such as users, orders, etc.

```javascript
class User extends Model {
  static schema = ["id", "username", "age"];
  static collection = "users";

  constructor(data) {
    super(data);
  }
}
```

## Example Usage

```javascript
User.getInstance({ id: 1 }).then(user => {
  console.log('Before', user.data);
  user.save({ ...user.data, age: 30 }).then(result => {
    console.log('After', result);
  });
});
```
