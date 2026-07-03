// ============================================================
//  EXPRESS.JS — WHAT IT IS, WHY WE NEED IT, HOW IT WORKS
//  Day 8 — Express — MERN Stack Learning
// ============================================================


// ============================================================
//  1. WHAT IS EXPRESS.JS?
// ============================================================

// Express.js is a minimal, fast web framework for Node.js
// It is the E in MERN (MongoDB, Express, React, Node)
//
// It sits on TOP of Node's built-in http module and makes it
// much easier to build web servers and REST APIs
//
// Install: npm install express
// Import:  import express from "express"  (ES module)
//          const express = require("express") (CommonJS)


// ============================================================
//  2. WHY DO WE NEED EXPRESS? (the problem it solves)
// ============================================================

// With raw http module — messy, painful:
//
// const server = http.createServer((req, res) => {
//     if (req.url === "/users" && req.method === "GET") { ... }
//     else if (req.url === "/users" && req.method === "POST") { ... }
//     else if (req.url === "/products" && req.method === "GET") { ... }
//     // 50 routes = 300 lines of if/else — nightmare to manage
//
//     // ALSO must manually:
//     // - parse JSON body (req.on("data") chunks)
//     // - set Content-Type headers every time
//     // - handle 404s manually
//     // - no middleware support
// });
//
// With Express — clean and organized:
//
// app.get("/users", (req, res) => res.json(users));
// app.post("/users", (req, res) => res.json(newUser));
// app.get("/products", (req, res) => res.json(products));
// One line per route. Clean. Readable.


// ============================================================
//  3. WHAT EXPRESS GIVES YOU
// ============================================================

//  Feature             | Raw http module          | Express
//  --------------------|--------------------------|---------------------------
//  Routing             | Manual if/else           | app.get(), app.post() etc
//  JSON body parsing   | Manual chunk collection  | express.json() one line
//  Middleware          | Not supported            | app.use() - plug & play
//  Error handling      | Manual everywhere        | Central error handler
//  Status codes        | res.writeHead(200)       | res.status(200).json()
//  Static files        | Manual                   | express.static()
//  Router grouping     | Not possible             | express.Router()


// ============================================================
//  4. HOW EXPRESS WORKS INTERNALLY
// ============================================================

// Express is just a wrapper around Node's http.createServer()
// Under the hood it still creates the same HTTP server
// But adds layers of organization on top
//
// REQUEST FLOW in Express:
//
// Client sends request
//      |
//      v
// http.createServer() (Node underneath)
//      |
//      v
// Express receives (req, res)
//      |
//      v
// Middleware 1 (express.json — parse body)
//      |
//      v
// Middleware 2 (your custom logger, auth check etc)
//      |
//      v
// Route handler matches METHOD + PATH
//      |
//      v
// res.json() sends response back to client
//
// Each step calls next() to pass to the next middleware/route
// If no route matches -> 404
// If an error is thrown -> error handling middleware


// ============================================================
//  5. MIDDLEWARE — the heart of Express
// ============================================================

// Middleware = a function that runs BETWEEN request and response
// Syntax: (req, res, next) => { ... next() }
// next() = "I'm done, pass to the next middleware or route"
//
// app.use(express.json())         -> parses JSON body for ALL routes
// app.use(express.urlencoded())   -> parses form data
// app.use(cors())                 -> allows cross-origin requests (frontend calling backend)
// app.use(morgan("dev"))          -> logs every request (third party)
// app.use(authMiddleware)         -> your own auth check
//
// ORDER MATTERS — middleware runs top to bottom
// app.use(express.json()) must come BEFORE routes that use req.body


// ============================================================
//  6. WHAT IS A REST API?
// ============================================================

// REST = Representational State Transfer
// A set of rules/conventions for building APIs
//
// Rules:
// 1. Use HTTP methods correctly (GET/POST/PUT/PATCH/DELETE)
// 2. URLs represent RESOURCES (nouns, not verbs)
//    BAD: /getUsers /createUser /deleteUser
//    GOOD: /users   /users      /users/:id
// 3. Stateless — each request is independent, server stores no session
// 4. Return JSON (standard data format for APIs)
// 5. Use proper status codes (200, 201, 400, 404, 500)


// ============================================================
//  7. EXPRESS APP STRUCTURE (basic)
// ============================================================

// index.js / server.js     -> entry point, starts the server
// routes/
//   userRoutes.js          -> all /users routes grouped together
//   productRoutes.js       -> all /products routes grouped together
// controllers/
//   userController.js      -> logic for each user route handler
//   productController.js
// middleware/
//   authMiddleware.js      -> authentication check
//   errorMiddleware.js     -> global error handler
// models/                  -> MongoDB schemas (comes with Mongoose)


// ============================================================
//  8. NODEMON — must know for development
// ============================================================

// Problem: every time you change your code, you must manually
// stop (Ctrl+C) and restart (node index.js) the server
//
// Nodemon watches your files and auto-restarts when you save
//
// Install: npm install --save-dev nodemon
// Use:     nodemon index.js
//
// Or add to package.json scripts:
// "scripts": {
//     "start": "node index.js",
//     "dev":   "nodemon index.js"
// }
// Then run: npm run dev


// ============================================================
//  9. ENVIRONMENT VARIABLES (.env)
// ============================================================

// Never hardcode sensitive values like port, DB URL, secrets in code
// Store them in a .env file and read with process.env
//
// .env file:
// PORT=8080
// MONGO_URI=mongodb://localhost:27017/mydb
// JWT_SECRET=mysecretkey
//
// Install: npm install dotenv
// Usage:
// import dotenv from "dotenv";
// dotenv.config();
// const PORT = process.env.PORT || 8080;
//
// ⚠️  ALWAYS add .env to .gitignore — never push secrets to GitHub


// ============================================================
//  INTERVIEW QUESTIONS
// ============================================================

// Q1: What is Express.js?
//     -> Minimal web framework for Node.js used to build REST APIs
//     -> Adds routing, middleware, body parsing on top of http module

// Q2: What is middleware in Express?
//     -> A function that runs between request and response
//     -> Has access to req, res, and next()
//     -> next() passes control to the next middleware or route

// Q3: Why use Express over raw http module?
//     -> Clean routing (app.get instead of if/else chains)
//     -> Built-in body parsing (express.json())
//     -> Middleware support, centralized error handling

// Q4: What is a REST API?
//     -> API following REST conventions: proper HTTP methods,
//        noun-based URLs, stateless, JSON responses, correct status codes

// Q5: What does app.use() do?
//     -> Registers middleware that runs for ALL routes
//     -> Order matters — runs top to bottom

// Q6: What is nodemon and why use it?
//     -> Auto-restarts server on file save during development
//     -> Without it, you must manually stop and restart every time

// Q7: What is .env and why is it important?
//     -> File storing sensitive config (port, DB URI, secrets)
//     -> Never hardcode these — use process.env
//     -> Always add to .gitignore so it's never pushed to GitHub

// Q8: What is the difference between app.use() and app.get()?
//     -> app.use(): runs for ALL HTTP methods on that path
//     -> app.get(): runs ONLY for GET requests on that path

// Q9: What is CORS and why does it matter?
//     -> Cross-Origin Resource Sharing — browser security policy
//     -> Blocks frontend (React on port 3000) from calling backend (Express on port 8080)
//     -> Fix: npm install cors, then app.use(cors())