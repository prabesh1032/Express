// ============================================================
//  MONGODB — WHAT IT IS, HOW IT WORKS, WHY WE USE IT
//  Day 10 — MongoDB — MERN Stack Learning
// ============================================================


// ============================================================
//  1. WHAT IS MONGODB?
// ============================================================

// MongoDB is a NoSQL database
// Stores data as DOCUMENTS (like JSON objects) instead of tables/rows
// The M in MERN stack
//
// Install: https://www.mongodb.com/try/download/community
// GUI Tool: MongoDB Compass (visual interface to see your data)
// Cloud:    MongoDB Atlas (free cloud hosted MongoDB)
//
// In MERN:
// React      -> frontend (what user sees)
// Express    -> backend API (handles requests)
// Node.js    -> runtime (runs the backend)
// MongoDB    -> database (stores the data)


// ============================================================
//  2. SQL vs MONGODB — KEY DIFFERENCES
// ============================================================

//  SQL (MySQL, PostgreSQL)          | MongoDB (NoSQL)
//  ---------------------------------|----------------------------------
//  Table                            | Collection
//  Row                              | Document
//  Column                           | Field
//  Schema is FIXED (must define     | Schema is FLEXIBLE (documents in
//  all columns before inserting)    | same collection can differ)
//  Uses SQL language                | Uses JavaScript-like queries
//  Relationships via JOIN           | Embedded documents or references
//  Strict data types per column     | Each document can have any fields
//  Good for complex relationships   | Good for flexible, fast development
//  eg: MySQL, PostgreSQL, SQLite    | eg: MongoDB, CouchDB


// ============================================================
//  3. SQL TERMS vs MONGODB TERMS (side by side)
// ============================================================

// SQL TABLE — users
// | id | name  | email           | age |
// |----|-------|-----------------|-----|
// | 1  | Ram   | ram@gmail.com   | 25  |
// | 2  | Sita  | sita@gmail.com  | 23  |

// MONGODB COLLECTION — users
// [
//     { _id: ObjectId("..."), name: "Ram",  email: "ram@gmail.com",  age: 25 },
//     { _id: ObjectId("..."), name: "Sita", email: "sita@gmail.com", age: 23 },
// ]
//
// _id -> MongoDB auto-generates a unique ID for every document (like SQL primary key)
// ObjectId -> special MongoDB type, 24 character unique string


// ============================================================
//  4. WHAT IS A DOCUMENT?
// ============================================================

// A document = one record, stored as BSON (Binary JSON)
// Looks exactly like a JavaScript object
//
// {
//     _id: ObjectId("64f1a2b3c4d5e6f7a8b9c0d1"),
//     name: "Prabesh",
//     email: "prabesh@gmail.com",
//     age: 22,
//     faculty: "BITM",
//     address: {                       // nested object (embedded document)
//         city: "Kathmandu",
//         district: "Bagmati"
//     },
//     skills: ["JavaScript", "React", "Node.js"],  // array inside document
//     createdAt: ISODate("2024-01-01")
// }
//
// Notice: one document can have nested objects AND arrays
// In SQL this would need 3 separate tables (users, addresses, skills)
// In MongoDB everything lives in ONE document — simpler and faster to read


// ============================================================
//  5. HOW MONGODB STORES DATA
// ============================================================

// Database -> Collection -> Document
//
// Like folders:
// Database     = the whole project database  (eg: mernapp)
// Collection   = group of similar documents  (eg: users, products, orders)
// Document     = one individual record       (eg: one user)
//
// One MongoDB server can have MANY databases
// One database can have MANY collections
// One collection can have MANY documents
//
// Example structure:
// mernapp (database)
//   ├── users (collection)
//   │     ├── { _id, name: "Ram", email: "ram@gmail.com" }
//   │     └── { _id, name: "Sita", email: "sita@gmail.com" }
//   ├── products (collection)
//   │     ├── { _id, name: "Laptop", price: 1200 }
//   │     └── { _id, name: "Phone", price: 500 }
//   └── orders (collection)
//         └── { _id, userId: "...", products: [...] }


// ============================================================
//  6. FLEXIBLE SCHEMA — biggest MongoDB advantage
// ============================================================

// In SQL — you MUST define columns before inserting
// ALTER TABLE to add a new column — affects all rows

// In MongoDB — each document can have different fields
// No migration needed — just add the field to the new document
//
// Example: adding phone to some users, not others
// { _id: 1, name: "Ram",     email: "ram@gmail.com" }
// { _id: 2, name: "Prabesh", email: "prabesh@gmail.com", phone: "9812965110" }
// { _id: 3, name: "Sita",    email: "sita@gmail.com",    phone: "9812345678", age: 23 }
//
// All valid! No errors — very flexible for fast development


// ============================================================
//  7. MONGODB BASIC QUERIES (how you talk to MongoDB)
// ============================================================

// Using MongoDB Shell or Compass:

// SELECT * FROM users             -> db.users.find()
// SELECT * FROM users WHERE id=1  -> db.users.findOne({ _id: id })
// INSERT INTO users               -> db.users.insertOne({ name, email })
// UPDATE users SET name WHERE id  -> db.users.updateOne({ _id: id }, { $set: { name } })
// DELETE FROM users WHERE id      -> db.users.deleteOne({ _id: id })

// In MERN we use MONGOOSE (ODM library) to talk to MongoDB from Node.js
// Mongoose makes queries even cleaner — next topic!


// ============================================================
//  8. WHY MONGODB FOR MERN?
// ============================================================

// 1. SAME LANGUAGE — JavaScript everywhere
//    Frontend (React) + Backend (Node/Express) + Database (MongoDB) = all JS
//    No need to learn SQL, no context switching

// 2. JSON EVERYWHERE — data flows naturally
//    React sends JSON -> Express receives JSON -> MongoDB stores JSON
//    No conversion needed between layers

// 3. FLEXIBLE SCHEMA — fast development
//    No need to define schema upfront
//    Easy to add/remove fields as app grows

// 4. SCALES WELL — horizontal scaling
//    Can distribute data across multiple servers (sharding)
//    Great for large amounts of data

// 5. EMBEDDED DOCUMENTS — fewer queries
//    Related data stored together in one document
//    SQL needs JOIN to combine tables — MongoDB just reads one document


// ============================================================
//  9. WHEN NOT TO USE MONGODB
// ============================================================

// MongoDB is NOT always the right choice:
//
// Use SQL when:
// - Data has complex relationships (banking, accounting)
// - You need strict data consistency (transactions)
// - Data is highly structured and unlikely to change
// - You need complex JOIN queries across many tables
//
// Use MongoDB when:
// - Fast development, flexible data structure
// - Social media, blogs, e-commerce (product catalogs)
// - Real-time apps (chat, notifications)
// - Data that naturally looks like JSON


// ============================================================
//  INTERVIEW QUESTIONS
// ============================================================

// Q1: What is MongoDB?
//     -> NoSQL document database that stores data as JSON-like documents
//     -> Part of MERN stack — replaces traditional SQL databases

// Q2: Difference between SQL and MongoDB?
//     -> SQL: tables, rows, fixed schema, uses SQL language
//     -> MongoDB: collections, documents, flexible schema, uses JS-like queries

// Q3: What is a document in MongoDB?
//     -> A single record stored as BSON (Binary JSON)
//     -> Like a JavaScript object with key-value pairs

// Q4: What is _id in MongoDB?
//     -> Auto-generated unique identifier for every document
//     -> Like primary key in SQL — always exists, always unique

// Q5: What is the difference between Collection and Table?
//     -> Table (SQL): fixed columns, all rows same structure
//     -> Collection (MongoDB): flexible, each document can have different fields

// Q6: Why is MongoDB good for MERN stack?
//     -> JavaScript everywhere — same language frontend to database
//     -> JSON flows naturally through all layers without conversion
//     -> Flexible schema — fast development

// Q7: What is the difference between embedded document and reference?
//     -> Embedded: store related data inside same document (like address inside user)
//     -> Reference: store _id of another document (like SQL foreign key)
//     -> Embedded = faster reads, Reference = avoids data duplication

// Q8: What is Mongoose?
//     -> ODM (Object Document Mapper) library for MongoDB in Node.js
//     -> Adds schema validation, easy queries, middleware to MongoDB
//     -> Next topic after MongoDB basics