// ============================================================
//  EXPRESS.JS: COMPLETE CRUD API
//  Day 8 — Express — MERN Stack Learning
// ============================================================

import express from "express";
const app = express();


// ============================================================
//  MIDDLEWARE
// ============================================================

app.use(express.json());                         // parse JSON body -> req.body
app.use(express.urlencoded({ extended: true })); // parse form data


// ============================================================
//  IN-MEMORY DATA (simulating database before MongoDB)
// ============================================================

let users = [
    { id: 1, name: "Ram",  email: "ram@gmail.com" },
    { id: 2, name: "Sita", email: "sita@gmail.com" },
];

let products = [
    { id: 1, name: "Laptop", price: 1200, category: "Electronics" },
    { id: 2, name: "Shirt",  price: 50,   category: "Clothing" },
];


// ============================================================
//  HOME
// ============================================================

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to Express API" });
});


// ============================================================
//  USERS — FULL CRUD
// ============================================================

// GET /users — all users with optional query filter/pagination
app.get("/users", (req, res) => {
    console.log("method:      ", req.method);      // "GET"
    console.log("url:         ", req.url);          // "/users?name=Ram"
    console.log("path:        ", req.path);         // "/users"
    console.log("originalUrl: ", req.originalUrl);  // "/users?name=Ram"
    console.log("query:       ", req.query);        // { name: "Ram" }

    const { name, page = 1, limit = 10 } = req.query;

    let result = [...users];
    if (name) {
        result = result.filter(u =>
            u.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    res.status(200).json({
        total: result.length,
        page: Number(page),
        limit: Number(limit),
        users: result,
    });
});

// GET /users/:id — single user
app.get("/users/:id", (req, res) => {
    console.log("params:", req.params); // { id: "1" }
    const { id } = req.params;
    const user   = users.find(u => u.id === Number(id));

    if (!user) return res.status(404).json({ message: `User ${id} not found` });
    res.status(200).json(user);
});

// POST /users — create user
app.post("/users", (req, res) => {
    console.log("body:", req.body); // { name: "Hari", email: "hari@gmail.com" }
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "name and email are required" });
    }

    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json({ message: "User created", user: newUser });
});

// PUT /users/:id — full update (replace entire object)
app.put("/users/:id", (req, res) => {
    const { id }      = req.params;
    const { name, email } = req.body;

    const index = users.findIndex(u => u.id === Number(id));
    if (index === -1) return res.status(404).json({ message: `User ${id} not found` });

    users[index] = { id: Number(id), name, email }; // replaces entire user
    res.status(200).json({ message: `User ${id} updated`, user: users[index] });
});

// PATCH /users/:id — partial update (only sent fields)
app.patch("/users/:id", (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const index = users.findIndex(u => u.id === Number(id));
    if (index === -1) return res.status(404).json({ message: `User ${id} not found` });

    users[index] = { ...users[index], ...updates }; // merges only changed fields
    res.status(200).json({ message: `User ${id} partially updated`, user: users[index] });
});

// DELETE /users/:id — delete user
app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    const index  = users.findIndex(u => u.id === Number(id));

    if (index === -1) return res.status(404).json({ message: `User ${id} not found` });

    const deleted = users.splice(index, 1);
    res.status(200).json({ message: `User ${id} deleted`, user: deleted[0] });
});


// ============================================================
//  PRODUCTS — FULL CRUD
// ============================================================

app.get("/products", (req, res) => {
    const { category, minPrice, maxPrice } = req.query;
    let result = [...products];
    if (category) result = result.filter(p => p.category === category);
    if (minPrice) result = result.filter(p => p.price >= Number(minPrice));
    if (maxPrice) result = result.filter(p => p.price <= Number(maxPrice));
    res.status(200).json({ total: result.length, products: result });
});

app.get("/products/:id", (req, res) => {
    const product = products.find(p => p.id === Number(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
});

app.post("/products", (req, res) => {
    const { name, price, category } = req.body;
    if (!name || !price) return res.status(400).json({ message: "name and price required" });
    const newProduct = { id: products.length + 1, name, price, category };
    products.push(newProduct);
    res.status(201).json({ message: "Product created", product: newProduct });
});

app.put("/products/:id", (req, res) => {
    const index = products.findIndex(p => p.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Product not found" });
    products[index] = { id: Number(req.params.id), ...req.body };
    res.status(200).json({ message: "Product updated", product: products[index] });
});

app.delete("/products/:id", (req, res) => {
    const index = products.findIndex(p => p.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Product not found" });
    const deleted = products.splice(index, 1);
    res.status(200).json({ message: "Product deleted", product: deleted[0] });
});


// ============================================================
//  POSTS & COMMENTS
// ============================================================

app.get("/posts",    (req, res) => res.status(200).json({ message: "All posts" }));
app.get("/comments", (req, res) => res.status(200).json({ message: "All comments" }));


// ============================================================
//  req OBJECT — QUICK REFERENCE
// ============================================================

//  Property         | What it gives you                  | Example
//  -----------------|------------------------------------|---------------------------
//  req.method       | HTTP method                        | "GET"
//  req.url          | full URL with query string         | "/users?page=1"
//  req.originalUrl  | same (differs in nested routers)   | "/users?page=1"
//  req.path         | path only, no query string         | "/users"
//  req.params       | dynamic route values               | { id: "5" }
//  req.query        | query string values (all strings)  | { page: "1", name: "Ram" }
//  req.body         | JSON request body                  | { name: "Ram", email: "..." }

//  WHEN TO USE WHAT:
//  params -> "which one?"    /users/:id
//  query  -> "filter/sort?"  /users?page=1&name=Ram
//  body   -> "what data?"    POST { name, email, password }

//  REST CONVENTION:
//  BAD: POST /users/create   GET /users/getAll   DELETE /users/delete
//  GOOD: POST /users         GET /users          DELETE /users/:id


// ============================================================
//  START SERVER
// ============================================================

app.listen(8080, () => {
    console.log("Server running at http://localhost:8080");
    console.log("Press Ctrl+C to stop");
});


// ============================================================
//  INTERVIEW QUESTIONS
// ============================================================

// Q1: What is Express.js?
//     -> Minimal web framework for Node.js
//     -> Adds clean routing, middleware, error handling on top of http module

// Q2: Difference between req.params, req.query, req.body?
//     -> params: /users/:id     -> { id: "5" }      — identifies which resource
//     -> query:  /users?name=Ram -> { name: "Ram" }  — filtering/sorting/pagination
//     -> body:   POST data      -> { name, email }   — data to create/update

// Q3: Why is express.json() required?
//     -> Without it, req.body is always undefined
//     -> Parses raw JSON bytes and attaches to req.body

// Q4: Difference between PUT and PATCH?
//     -> PUT:   replaces ENTIRE object  users[i] = { id, name, email }
//     -> PATCH: merges only sent fields users[i] = { ...users[i], ...updates }

// Q5: What status code should POST return on success?
//     -> 201 Created — specifically for new resource creation (not 200)

// Q6: Why are verbs wrong in REST URLs?
//     -> HTTP method already describes the action
//     -> POST /users means CREATE — no need for /users/create

// Q7: What does req.query always return? Any gotcha?
//     -> Always an object {} even if no query params
//     -> All values are STRINGS — must convert: Number(req.query.page)

// Q8: Difference between req.url and req.path?
//     -> url:  "/users?page=1"  (includes query string)
//     -> path: "/users"         (path only, no query string)