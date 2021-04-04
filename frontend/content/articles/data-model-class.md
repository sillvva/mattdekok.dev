---
title: Data Model Class
description: A TypeScript class for creating data models
date: 2021-03-28T23:07:22.325Z
updated: 2021-04-04T14:24:34.618Z
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
import { Db, MongoClient } from "mongodb";

let _db: Db;

class database {
  private client = MongoClient;
  connected = false;

  async connect() {
    let result: MongoClient;
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

## The Base Classes

### The Model Class

The base class is a data model template with generic fetch and save methods.

```typescript [db/model.ts]
import { connection } from "./database";
import { Db } from "mongodb";

interface Schema {
  name: string;
  type?: string | Function;
  required?: boolean;
  default?: any;
}

interface FetchAllOptions {
  skip?: number;
  limit?: number;
  projection?: Object;
}

type Constructor<T extends {} = {}> = new (...args: any[]) => T;

class Model<T extends Model<T>> {
  private _db: Db;
  protected static collection: string;
  protected static schema: (string | Schema)[];
  private _collection: string;
  private _schema: (string | Schema)[];
  data: any;

  constructor(data?: Object) {
    this._db = connection();
    this._collection = (<any>this.constructor).collection;
    this._schema = (<any>this.constructor).schema;
    this.init(data);
  }

  protected init(data?: Object) {
    this.checkCollection();
    this.checkSchema();
    if (data) {
      this.data = this.enforceSchema(data, true);
    }
  }

  private get collection() {
    return this._collection;
  }

  private checkCollection() {
    if (!this._collection) this.throw("Expected a 'collection' property on model.");
  }

  get dbCollection() {
    if (!this._db) this.throw("No database connection");
    this.checkCollection();
    return this._db.collection(this._collection);
  }

  private get schema() {
    return this._schema;
  }

  private checkSchema() {
    if (Array.isArray(this.schema)) {
      const schema = this.schema.map(s => {
        if (typeof s === "string") {
          return { name: s };
        }
        return s;
      });

      schema.forEach((s, i) => {
        if (!s.name) this.throw(`Schema item ${i} is missing a name`);
        if (typeof s.default !== "undefined" && s.default !== null) {
          if (s.type) {
            if (typeof s.type === "string" && typeof s.default !== s.type) {
              this.throw(`${s.name}: Schema default has invalid type`);
            } else if (s.type instanceof Function && !(s.type(s.default) || s.default instanceof s.type)) {
              this.throw(`${s.name}: Schema default has invalid type`);
            }
          }
        }
      });

      return schema;
    }

    return null;
  }

  enforceSchema(data: any, soft?: boolean) {
    const schema = this.checkSchema();
    if (!schema) return data;

    if (!data._id) {
      schema.forEach(s => {
        if (s.required && !data[s.name]) this.throw(`${s.name}: Required property is missing`, soft);
      });
    }

    const defaults = schema
      .filter(s => !!s.default)
      .reduce((obj: any, s) => {
        obj[s.name] = s.default;
        return obj;
      }, {});

    return Object.entries(data)
      .filter(([key, val]) => {
        return schema.find(s => {
          if (s.name === key) {
            if (s.type) {
              if (typeof s.type === "string" && typeof val !== s.type) {
                this.throw(`${key}: Invalid type`, soft);
              } else if (s.type instanceof Function && !(s.type(val) || val instanceof s.type)) {
                this.throw(`${key}: Invalid type`, soft);
              }
            }
            return true;
          }
          return false;
        });
      })
      .reduce((obj: any, [key, val]) => {
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
   * @param query Sepecifies selection filter using query operators.
   * @param projection Specifies the fields to return in the documents that match the query filter.
   *
   * @see https://docs.mongodb.com/manual/reference/method/db.collection.findOne
   *
   * @returns Returns document
   */
  async fetch(query: Object, projection?: Object) {
    const data = await this.dbCollection.findOne(query, projection);
    this.data = data && this.enforceSchema(data, true);
    return this.data;
  }

  /**
   * Fetches a single document from a collection and returns an instance of the class.
   *
   * @param Type The subclass used to invoke this method (ex. User)
   * @param query Sepecifies selection filter using query operators.
   * @param projection Specifies the fields to return in the documents that match the query filter.
   *
   * @see https://docs.mongodb.com/manual/reference/method/db.collection.findOne
   *
   * @returns Returns document as instance of the class
   */
  static async fetch<T extends Model<T>>(query: Object, projection?: Object) {
    const instance = new this();
    await instance.fetch(query, projection);
    return instance;
  }

  /**
   * Fetches multiple documents from a collection and returns them as instances of the class.
   *
   * @param Type The subclass used to invoke this method (ex. User)
   * @param [query] - Sepecifies selection filter using query operators.
   * If a query is not specified, this method will fetch all documents in the collection.
   * @param [options] - The query options object
   * @param [options.skip] - The number of documents to skip
   * @param [options.limit] - The number of documents to return
   * @param [options.projection] - Specifies the fields to return in the documents that match the query filter.
   *
   * @see https://docs.mongodb.com/manual/reference/method/db.collection.find
   *
   * @returns Returns documents as instances of the class
   */
  static async fetchAll<T extends Model<T>>(query?: Object, options?: FetchAllOptions) {
    if (options && options.skip && !(options.skip < 0 || options.skip % 1 !== 0))
      throw new Error("Expected options.skip as null or positive whole number");
    if (options && options.limit && !(options.limit < 0 || options.limit % 1 !== 0))
      throw new Error("Expected options.limit as null or positive whole number");
    if (options && options.projection) (<any>options.projection)._id = 1;

    const instance = new this();
    const cursor = instance.dbCollection.find(query, options && options.projection);
    if (options.skip) cursor.skip(options.skip);
    if (options.limit) cursor.limit(options.limit);
    const docs = await cursor.toArray();
    return new ModelCollection(docs.map((doc: Object) => new this(doc)));
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

    const result = await this.dbCollection.updateOne({ _id: _id }, { $set: saveData }, { upsert: true });
    if (result.modifiedCount) this.data = { _id: this.data._id, ...saveData };
    return result;
  }
}
```

### The ModelCollection Class

This purpose of this class is to contain the array of document instances returned by the `Model.fetchAll` method. It extends the built-in Array
class to add the Array methods and properties. It also has one additional method called `saveAll` to save all the instances in the array to their
corresponding documents by their `_id`.

```typescript [db/model.ts]
class ModelCollection<T extends Model<T>> extends Array<T> {
  constructor(instances: T[]) {
    super();
    instances.forEach(instance => {
      this.push(instance);
    });
  }

  /**
   * Saves multiple instances to their corresponding documents by their _id.
   *
   * @param instances - Instances of the subclass calling this method (ex. User[]);
   * @param data - An object containing updated properties of the instance data.
   *
   * @returns Returns the database write result
   */
  async saveAll(data: Object) {
    if (this.length === 0) throw new Error("Model collection is empty.");

    const instanceData = this.filter(i => i instanceof Model && i.data._id);
    if (instanceData.length === 0) throw new Error("Documents must have an _id property.");

    const constructor = <Constructor<T>>instanceData[0].constructor;
    const model = new constructor();
    const saveData = model.enforceSchema(data);
    delete saveData._id;

    const result = await model.dbCollection.updateMany(
      { _id: { $in: instanceData.map(i => i.data._id) } },
      { $set: saveData },
      { upsert: true }
    );

    if (result.modifiedCount) {
      this.splice(0, this.length, ...this.map(instance => ({ ...instance.data, ...saveData })));
    }

    return result;
  }
}
```

## An Example Subclass

You can then extend the base class to define a specific data entity, such as users, orders, etc. If specified, a schema will enforce specific object properties. It is not required to have a schema.

After you have defined the collection and schema, you need to initialize the subclass with the init method built into the Model class.

```javascript [db/user.ts]
import Model from "./model";

class User extends Model<User> {
  protected static collection = "users";
  protected static schema = [
    { name: "username", type: "string", required: true },
    { name: "email", type: "string", required: true },
    { name: "age", type: "number", required: true, default: 0 },
    // Schemas defined as strings will be optional 
    // fields with no required type or default value
    "hobbies",
  ];

  constructor(data?: Object) {
    super(data);
  }
}
```

## Example Usage

```typescript [./example.ts]
import User from "../db/user";

async function updateUserAge(userId: any, age: number) {
  const user = await User.fetch({ _id: userId });
  return await user.save({ age: age });
}

async function incrementUserAges(byYears = 1) {
  const users = await User.fetchAll();
  return await users.saveAll({ $inc: { age: byYears } });
}
```
## Demo

Here is a demo using dummy data:

https://codepen.io/Sillvva/pen/BMNrdG?editors=0011