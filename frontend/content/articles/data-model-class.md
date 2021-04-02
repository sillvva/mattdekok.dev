---
title: Data Model Class
description: A JavaScript class for creating data models
date: 2021-03-28T23:07:22.325Z
updated: 2021-04-02T01:58:24.045Z
image: /images/blog/code.jpg
tags:
  - JavaScript
  - TypeScript
  - Snippets
  - Database
  - MongoDB
---

Using a data model class like this makes your database code cleaner and easier to manage. By creating a Model superclass, you eliminate the need to rewrite the fetching and saving logic for all your data models. You then use subclasses to define each data model's collection, schema, and unique properties and methods.

This example uses MongoDB, though you can rewrite it to use any database.

## Initiate the Database

First, you'll need to create a database connection.

```typescript [db/database.ts]
import mongodb from "mongodb";

let _db: mongodb.Db;

class database {
  client = mongodb.MongoClient;
  connected = false;

  async connect() {
    let result: mongodb.MongoClient;
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

```typescript [index.ts]
import { database } from "./db/database";
import { ObjectId } from "mongodb";

(async () => {
  const connected = await database.connect();
  console.log("DB Connected:", connected);
})();
```

## The Base Class

The base class is a data model template with generic fetch and save methods.

```typescript [db/model.ts]
import { connection } from "./database";
import { ObjectId, Db } from "mongodb";

interface Schema {
  name: string,
  type?: string | Object | Function,
  required?: boolean,
  default?: any
}

interface FetchAllOptions {
  skip?: number,
  limit?: number
}

class Model {
  private _db: Db;
  private _collection: string;
  private _schema: Schema[];
  data: any;

  constructor() {
    this._db = connection();
  }

  /**
   * Validates the collection, schema, and initial data.
   * 
   * This method should be called by the constuctor of subclasses that extend this class
   * after setting the collection and (optionally) the schema.
   * 
   * @param [data] Data that initializes an instance of the class.
   */
  protected init(data?: Object) {
    this.checkCollection();
    this.checkSchema();
    if (data) {
      this.data = this.enforceSchema(data, true);
    }
  }

  protected get collection() {
    return this._collection;
  }

  protected set collection(collection: string) {
    this._collection = collection;
  }

  private get dbCollection() {
    this.checkCollection();
    return this._db.collection(this._collection);
  }

  private checkCollection() {
    if (!this._db) this.throw("No database connection");
    if (!this._collection) this.throw("Expected a collection property on model");
  }

  protected get schema() {
    let schema = this._schema;
    if (!schema) return null;
    const _id = schema.find(s => s && s.name === "_id");
    if (!_id) schema = [{ name: "_id", default: new ObjectId() }, ...schema];
    return schema;
  }

  protected set schema(schema: Schema[]) {
    this._schema = schema;
  }

  private checkSchema() {
    if (Array.isArray(this.schema)) {
      const schema = this.schema.map(s => {
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
            } else if (typeof s.type === "object" && !(s.default instanceof s.type)) {
              this.throw(`${s.name}: Schema default has invalid type`);
            }
          }
        }
      });

      return schema;
    }
  }

  private enforceSchema(data: Object, soft?: boolean) {
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
              } else if (typeof s.type === "object" && !(val instanceof s.type)) {
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

  private throw(msg: string, soft?: boolean) {
    if (soft) console.warn(msg);
    else throw new Error(msg);
  }

  /**
   * Fetches a single document from a collection.
   *
   * @param query The database query object
   *
   * @returns Returns document
   */
  async fetch(query: Object) {
    const data = await this.dbCollection.findOne(query);
    this.data = data && this.enforceSchema(data, true);
    return this.data;
  }

  /**
   * Fetches a single document from a collection and returns an instance of the class.
   *
   * @param Type The subclass used to invoke this method (ex. User)
   * @param query The database query object
   *
   * @returns Returns document as instance of the class
   */
  static async fetch(Type: any, query: Object) {
    const instance = new Type();
    instance.fetch(query);
    return instance;
  }

  /**
   * Fetches multiple documents from a collection and returns them as instances of the class.
   *
   * @param type The subclass used to invoke this method (ex. User)
   * @param query - The database query object
   * @param [options] - The query options object
   * @param [options.skip] - The number of documents to skip
   * @param [options.limit] - The number of documents to return
   *
   * @returns Returns documents as instances of the class
   */
  static async fetchAll(Type: any, query: Object, options?: FetchAllOptions) {
    if (options && options.skip && (!(options.skip < 0 || options.skip % 1 !== 0)))
      throw new Error("Expected options.skip as null or positive whole number");
    if (options && options.limit && (!(options.limit < 0 || options.limit % 1 !== 0)))
      throw new Error("Expected options.limit as null or positive whole number");

    const instance = new (<any>this.constructor);
    const cursor = instance.dbCollection.find(query);
    if (options.skip) cursor.skip(options.skip);
    if (options.limit) cursor.limit(options.limit);
    const results = await cursor.toArray();
    return results.map((r: Object) => new Type(r));
  }

  /**
   * Saves instance data to the corresponding document by its _id. 
   * If no _id is specified, one will be created.
   *
   * @param [data] - An object containing updated properties of the instance data.
   *
   * @returns Returns the database write result
   */
  async save(data?: Object) {
    const saveData: any = this.enforceSchema({ ...this.data, ...(data || {}) });
    const _id = saveData._id;
    delete saveData._id;
    
    const result = await this.dbCollection.updateOne(
      { _id: _id }, 
      { $set: { ...saveData } }, 
      { upsert: true }
    );
    this.data = { _id: (<any>this.data)._id, ...saveData };
    return result;
  }
}
```

## An Example Subclass

You can then extend the base class to define a specific data entity, such as users, orders, etc. If specified, a schema will enforce specific object properties. It is not required to have a schema.

After you have defined the collection and schema, you need to initialize the subclass with the init method built into the Model class.

```javascript [db/user.ts]
import Model from "./model";

class User extends Model {
  constructor(data?: Object) {
    super();
    this.collection = "users";
    this.schema = [
      { name: "username", type: "string", required: true },
      { name: "email", type: "string", required: true },
      { name: "age", type: "number", required: false, default: 0 }
    ];
    this.init(data);
  }
}
```

## Example Usage

```typescript [./example.ts]
import Model from "../db/model";
import User from "../db/user";

async function updateUserAge(userId: any, age: number) {
  const user = await Model.fetch(User, { _id: userId })
  console.log("Before", user.data);

  const result = await user.save({ age: age });
  console.log("Result", result);
  console.log("After", user.data);
}
```
## Demo

Here is a demo using dummy data:

https://codepen.io/Sillvva/pen/BMNrdG?editors=0011