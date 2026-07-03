// ============================================================
//  EXPRESS.JS: BASICS — ROUTING & CRUD
//  Day 8 — Express — MERN Stack Learning
// ============================================================

// Express = minimal web framework built ON TOP of Node's http module
// Gives you: clean routing, middleware, body parsing, error handling
//
// Install: npm install express
// Run:     node index.js  OR  nodemon index.js (auto-restart on save)

import express from "express";
const app = express();

// ============================================================
//  ESSENTIAL MIDDLEWARE
// ============================================================

// parse incoming JSON body (req.body won't work without this)
app.use(express.json());

// parse URL-encoded form data (HTML form submissions)
app.use(express.urlencoded({
    extended: true
}));


// ============================================================
//  HOW ROUTING WORKS
// ============================================================

// app.METHOD(path, handler)
// METHOD = get / post / put / patch / delete
// path   = URL string
// handler= (req, res) => {}
//
// Express matches METHOD + PATH together — completely separate:
// GET  /users  and  POST  /users  are TWO different routes


// ============================================================
//  HOME ROUTE
// ============================================================

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Express API"
    });
});


// ============================================================
//  USERS — CRUD ROUTES
// ============================================================

// READ — get all users
app.get("/users", (req, res) => {
    const users = [{
            id: 1,
            name: "Ram",
            email: "ram@gmail.com"
        },
        {
            id: 2,
            name: "Sita",
            email: "sita@gmail.com"
        },
    ];
    res.status(200).json(users);
});

// READ — get single user by ID (URL param)
app.get("/users/:id", (req, res) => {
    const {
        id
    } = req.params; // extract :id from URL
    res.status(200).json({
        message: `Get user with id: ${id}`
    });
});

// CREATE — create new user
app.post("/users", (req, res) => {
    const {
        name,
        email,
        password
    } = req.body; // data from request body
    // normally: save to DB here
    res.status(201).json({
        message: "User created",
        user: {
            name,
            email
        }
    });
});

// UPDATE (full replace) — update entire user
app.put("/users/:id", (req, res) => {
    const {
        id
    } = req.params;
    const userData = req.body;
    res.status(200).json({
        message: `User ${id} updated`,
        data: userData
    });
});

// UPDATE (partial) — update only specific fields
app.patch("/users/:id", (req, res) => {
    const {
        id
    } = req.params;
    const updates = req.body;
    res.status(200).json({
        message: `User ${id} partially updated`,
        updates
    });
});

// DELETE — delete a user
app.delete("/users/:id", (req, res) => {
    const {
        id
    } = req.params;
    res.status(200).json({
        message: `User ${id} deleted`
    });
});


// ============================================================
//  PRODUCTS — CRUD ROUTES
// ============================================================

app.get("/products", (req, res) => res.status(200).json({
    message: "All products"
}));
app.get("/products/:id", (req, res) => res.status(200).json({
    message: `Product ${req.params.id}`
}));
app.post("/products", (req, res) => res.status(201).json({
    message: "Product created",
    data: req.body
}));
app.put("/products/:id", (req, res) => res.status(200).json({
    message: `Product ${req.params.id} updated`
}));
app.delete("/products/:id", (req, res) => res.status(200).json({
    message: `Product ${req.params.id} deleted`
}));


// ============================================================
//  req OBJECT — what you can read from the request
// ============================================================

app.get("/demo", (req, res) => {
    console.log(req.params); // URL params      -> /users/:id  -> { id: "1" }
    console.log(req.query); // query string    -> /search?q=laptop -> { q: "laptop" }
    console.log(req.body); // request body    -> POST/PUT JSON data
    console.log(req.headers); // request headers -> Content-Type, Authorization etc
    console.log(req.method); // "GET", "POST", "PUT", "DELETE"
    console.log(req.url); // "/demo"

    res.json({
        message: "demo route"
    });
});

// ⚠️  URL params  (/users/:id)      -> req.params.id  — part of the URL path
// ⚠️  Query string (/search?q=ram)  -> req.query.q    — after the ? in URL
// ⚠️  Body         (POST data)      -> req.body       — needs express.json() middleware


// ============================================================
//  res OBJECT — what you can send back
// ============================================================

// res.json(data)         -> send JSON response (most common in APIs)
// res.send("text/html")  -> send text or HTML
// res.status(404)        -> set status code (chain with .json() or .send())
// res.redirect("/login") -> redirect to another route
// res.sendFile(path)     -> send a file (HTML file for serving frontend)


// ============================================================
//  QUERY PARAMS EXAMPLE
// ============================================================

// GET /search?q=laptop&category=electronics
app.get("/search", (req, res) => {
    const {
        q,
        category
    } = req.query;
    res.status(200).json({
        message: "Search results",
        query: q,
        category: category,
    });
});
// visit: http://localhost:8080/search?q=laptop&category=electronics


// ============================================================
//  REST API ROUTE CONVENTIONS (industry standard)
// ============================================================

//  Method  | Path          | Action
//  --------|---------------|-------------------------------
//  GET     | /users        | get ALL users
//  GET     | /users/:id    | get ONE user
//  POST    | /users        | create a new user
//  PUT     | /users/:id    | replace entire user
//  PATCH   | /users/:id    | update specific fields
//  DELETE  | /users/:id    | delete a user

// ⚠️  REST convention: NO action words in URLs
// BAD:  POST /users/create   GET /users/getAll  DELETE /users/deleteUser
// GOOD: POST /users          GET /users          DELETE /users/:id


// ============================================================
//  START SERVER
// ============================================================

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log("Press Ctrl+C to stop");
});


// ============================================================
//  INTERVIEW QUESTIONS
// ============================================================

// Q1: What is Express.js?
//     -> Minimal web framework for Node.js
//     -> Adds clean routing, middleware, error handling on top of http module

// Q2: Difference between req.params, req.query, req.body?
//     -> params: /users/:id     -> { id: "1" }        part of URL path
//     -> query:  /search?q=ram  -> { q: "ram" }       after ? in URL
//     -> body:   POST data      -> { name: "Ram" }     JSON body of request

// Q3: Why is express.json() needed?
//     -> Without it, req.body is undefined
//     -> It parses the incoming JSON body and attaches it to req.body

// Q4: Difference between PUT and PATCH?
//     -> PUT: replace the ENTIRE resource (all fields required)
//     -> PATCH: update only the FIELDS you send

// Q5: What status code should POST return on success?
//     -> 201 Created (not 200 OK — 201 is specifically for resource creation)

// Q6: What is wrong with POST /users/create?
//     -> REST convention says don't put action verbs in URLs
//     -> Method (POST) already says it's creating
//     -> Correct: POST /users

// Q7: How do you send a JSON response in Express?
//     -> res.status(200).json({ key: value })
//     -> Automatically sets Content-Type: application/json header