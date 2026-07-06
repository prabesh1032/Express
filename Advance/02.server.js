// ============================================================
//  EXPRESS.JS: SERVER — ROUTING, PARAMS, QUERY, BODY
//  Day 8 — Express — MERN Stack Learning
// ============================================================

import express from "express";
const app = express();
app.use(express.json()); // parse raw JSON data -> req.body


// ============================================================
//  HOW ROUTING WORKS
// ============================================================

// Express makes multiple handlers for particular requests
// get  /users    -> handler1
// get  /products -> handler2
// post /users    -> handler3
// app.METHOD(path, handler)


// ============================================================
//  HOME
// ============================================================

app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>");
});


// ============================================================
//  USERS — CRUD
// ============================================================

// GET /users — all users
// req.query     -> query parameter -> object {}
// eg: https://daraz.com/products?name=abc&category=xyz&page=1&limit=10
// query  -> for filter
// param  -> for dynamic/specific resource
// body   -> for sending data
app.get("/users", (req, res) => {
    console.log("query is:",        req.query);       // { name: "abc", page: "1" }
    console.log("url is:",          req.url);          // "/users?name=abc"
    console.log("path is:",         req.path);         // "/users"
    console.log("original url is:", req.originalUrl);  // "/users?name=abc"
    res.send("<h1>All Users</h1>");
});

// GET /users/:id — get user by id
// req.params -> route parameter -> dynamic route
app.get("/users/:id", (req, res) => {
    console.log(req.params);           // { id: "1" }
    const id = req.params.id;
    // const { id } = req.params;      // same using destructuring
    res.send(`<h1>User with id: ${id}</h1>`);
});

// POST /users — create user
// req.body -> data sent from client (needs express.json() middleware)
app.post("/users", (req, res) => {
    console.log(req.body); // { name: "Ram", email: "ram@gmail.com" }
    res.send("<h1>User Created</h1>");
});

// PUT /users/:id — update user
app.put("/users/:id", (req, res) => {
    const id = req.params.id;
    res.send(`<h1>User with id: ${id} updated</h1>`);
});

// DELETE /users/:id — delete user
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    res.send(`<h1>User with id: ${id} deleted</h1>`);
});


// ============================================================
//  PRODUCTS — CRUD
// ============================================================

app.get("/products", (req, res) => {
    res.send("<h1>All Products</h1>");
});

app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    res.send(`<h1>Product with id: ${id}</h1>`);
});

app.post("/products", (req, res) => {
    res.send("<h1>Product Created</h1>");
});

app.put("/products/:id", (req, res) => {
    const id = req.params.id;
    res.send(`<h1>Product with id: ${id} updated</h1>`);
});

app.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    res.send(`<h1>Product with id: ${id} deleted</h1>`);
});


// ============================================================
//  POSTS & COMMENTS
// ============================================================

app.get("/posts",    (req, res) => res.send("<h1>All Posts</h1>"));
app.get("/comments", (req, res) => res.send("<h1>All Comments</h1>"));


// ============================================================
//  req OBJECT — QUICK REFERENCE
// ============================================================

// req.url         -> full url with query string  "/users?page=1"
// req.originalUrl -> same as url                 "/users?page=1"
// req.path        -> path only, no query string  "/users"
// req.method      -> HTTP method                 "GET", "POST", "PUT", "DELETE"
// req.params      -> route params (dynamic)      { id: "1" }
// req.query       -> query string params         { page: "1", name: "Ram" }
// req.body        -> request body (POST/PUT)     { name: "Ram", email: "..." }

// WHEN TO USE WHAT:
// params -> which one?    /users/:id
// query  -> filter/sort?  /users?page=1&name=Ram
// body   -> what data?    POST { name, email }


// ============================================================
//  START SERVER
// ============================================================

app.listen(8080, () => {
    console.log("server is running at http://localhost:8080");
    console.log("press ctrl+c to close the server");
});


// ============================================================
//  INTERVIEW QUESTIONS
// ============================================================

// Q1: What is Express.js?
//     -> Minimal web framework for Node.js
//     -> Adds clean routing, middleware, body parsing on top of http module

// Q2: Difference between req.params, req.query, req.body?
//     -> params: /users/:id      -> { id: "1" }      — which specific resource
//     -> query:  /users?page=1   -> { page: "1" }    — filter/sort/paginate
//     -> body:   POST data       -> { name, email }  — data to create/update

// Q3: Why is express.json() needed?
//     -> Without it req.body is undefined
//     -> It parses incoming JSON and attaches to req.body

// Q4: Difference between req.url and req.path?
//     -> url:  "/users?page=1"  includes query string
//     -> path: "/users"         path only, no query string

// Q5: What is a dynamic route?
//     -> Route with a parameter placeholder like /users/:id
//     -> :id matches any value — /users/1, /users/2, /users/abc

// Q6: Why use params for id and query for filters?
//     -> params identify ONE specific resource (/users/5)
//     -> query adds options without changing the resource (/users?name=Ram)      