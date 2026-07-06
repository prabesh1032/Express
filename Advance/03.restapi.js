// ============================================================
//  REST API — WHAT IT IS + USER CRUD
//  Day 8 — Express — MERN Stack Learning
// ============================================================


// ============================================================
//  1. WHAT IS AN API?
// ============================================================

// API = Application Programming Interface
// A way for two applications to talk to each other
//
// Real life example:
// You (React frontend) want user data from the server (Express backend)
// You send a REQUEST to the API
// API sends back a RESPONSE with the data
//
// Think of it like a waiter in a restaurant:
// You (client) -> order (request) -> waiter (API) -> kitchen (server/DB) -> food (response)


// ============================================================
//  2. WHAT IS REST?
// ============================================================

// REST = Representational State Transfer
// A set of RULES/CONVENTIONS for designing APIs
// An API that follows REST rules is called a REST API or RESTful API
//
// 6 REST PRINCIPLES:
// 1. CLIENT-SERVER    -> frontend and backend are separate, independent
// 2. STATELESS        -> each request is independent, server stores NO session
//                        all needed info must be in the request itself
// 3. UNIFORM INTERFACE-> standard rules: URLs for resources, HTTP methods for actions
// 4. CACHEABLE        -> responses can be cached to improve performance
// 5. LAYERED SYSTEM   -> client doesn't know if it talks to server, proxy, or load balancer
// 6. CODE ON DEMAND   -> (optional) server can send executable code


// ============================================================
//  3. REST RULES — HOW TO DESIGN URLS AND METHODS
// ============================================================

// RULE 1: URLs are NOUNS (resources), not VERBS (actions)
//
//  BAD (verbs in URL)        GOOD (REST standard)
//  ------------------------  ----------------------------
//  GET  /getUsers       ->   GET    /users
//  GET  /getUserById/5  ->   GET    /users/5
//  POST /createUser     ->   POST   /users
//  PUT  /updateUser/5   ->   PUT    /users/5
//  DELETE /deleteUser/5 ->   DELETE /users/5

// RULE 2: HTTP METHOD tells the ACTION
//
//  Method  | Action          | Success Status
//  --------|-----------------|---------------
//  GET     | read/fetch      | 200 OK
//  POST    | create          | 201 Created
//  PUT     | full update     | 200 OK
//  PATCH   | partial update  | 200 OK
//  DELETE  | delete          | 200 OK

// RULE 3: Use proper STATUS CODES
//
// ============================================================
//  HTTP STATUS CODES
// ============================================================

// 2xx — SUCCESS (request worked)
// 200 OK           -> standard success (GET, PUT, PATCH, DELETE)
// 201 Created      -> new resource created (POST success)
// 204 No Content   -> success but nothing to return (DELETE sometimes)

// 3xx — REDIRECTION
// 301 Moved Permanently -> resource moved to new URL forever
// 302 Found             -> temporary redirect

// 4xx — CLIENT ERROR (your fault — bad request)
// 400 Bad Request   -> missing or invalid data sent
//                      eg: required field is empty
// 401 Unauthorized  -> not logged in (no token / invalid token)
//                      eg: accessing protected route without login
// 403 Forbidden     -> logged in BUT no permission
//                      eg: normal user trying to access admin route
// 404 Not Found     -> URL or resource doesn't exist
//                      eg: GET /users/999 but user 999 doesn't exist
// 405 Method Not Allowed -> wrong HTTP method for that route
//                      eg: sending DELETE to a GET-only route
// 409 Conflict      -> resource already exists
//                      eg: registering with an email that already exists
// 422 Unprocessable -> validation failed
//                      eg: email format is wrong, password too short

// 5xx — SERVER ERROR (server's fault)
// 500 Internal Server Error -> something crashed on the server
//                              eg: unhandled error, DB connection failed
// 502 Bad Gateway           -> server got bad response from another server
// 503 Service Unavailable   -> server is down or overloaded

// ⚠️  MOST IMPORTANT TO REMEMBER:
// 200 -> success
// 201 -> created (POST)
// 400 -> bad data sent
// 401 -> not logged in
// 403 -> no permission
// 404 -> not found
// 500 -> server crashed

// RULE 4: Send and receive JSON
// RULE 5: Stateless — no sessions on server (use JWT tokens instead)


// ============================================================
//  4. ENDPOINTS — USER RESOURCE
// ============================================================

//  Method  | Endpoint      | Description
//  --------|---------------|-----------------------------
//  GET     | /users        | get all users
//  GET     | /users/:id    | get one user
//  POST    | /users        | create new user
//  PUT     | /users/:id    | update entire user
//  PATCH   | /users/:id    | update specific fields only
//  DELETE  | /users/:id    | delete user


// ============================================================
//  5. COMPLETE USER REST API
// ============================================================

import express from "express";
const app = express();
app.use(express.json());

// fake database (will be replaced with MongoDB later)
let users = [
    { _id: 1, name: "John Doe",  email: "john@gmail.com" },
    { _id: 2, name: "Jane Doe",  email: "jane@gmail.com" },
    { _id: 3, name: "Prabesh",   email: "prabesh@gmail.com" },
];


// GET /users — get all users
app.get("/users", (req, res) => {
    // db query -> get all users
    res.status(200).json({
        message: "all users fetched",
        status: "success",
        data: users,
    });
});

// GET /users/:id — get user by id
app.get("/users/:id", (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    // db query -> filter user by id
    res.status(200).json({
        message: `user by id:${id} fetched`,
        status: "success",
        data: { _id: 1, name: "John Doe", email: "john@gmail.com" },
    });
});

// POST /users — create user
app.post("/users", (req, res) => {
    console.log(req.body);
    const { name, email } = req.body;
    // db query -> create user
    res.status(201).json({
        message: "user created",
        status: "success",
        data: { name, email },
    });
});

// PUT /users/:id — full update (all fields required)
app.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
    // db query -> replace entire user
    res.status(200).json({
        message: `user ${id} updated`,
        status: "success",
        data: { _id: id, name, email },
    });
});

// PATCH /users/:id — partial update (only sent fields)
app.patch("/users/:id", (req, res) => {
    const id      = req.params.id;
    const updates = req.body;
    // db query -> update only sent fields
    res.status(200).json({
        message: `user ${id} partially updated`,
        status: "success",
        data: updates,
    });
});

// DELETE /users/:id — delete user
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    // db query -> delete user
    res.status(200).json({
        message: `user ${id} deleted`,
        status: "success",
    });
});


// ============================================================
//  START SERVER
// ============================================================

app.listen(8080, () => {
    console.log("server running at http://localhost:8080");
});


// ============================================================
//  HOW TO TEST — Thunder Client / Postman
// ============================================================

// GET    http://localhost:8080/users
// GET    http://localhost:8080/users/1
// POST   http://localhost:8080/users        Body: { "name":"Hari", "email":"hari@gmail.com" }
// PUT    http://localhost:8080/users/1      Body: { "name":"Ram Updated", "email":"ram@gmail.com" }
// PATCH  http://localhost:8080/users/1      Body: { "name": "New Name Only" }
// DELETE http://localhost:8080/users/1


// ============================================================
//  INTERVIEW QUESTIONS
// ============================================================

// Q1: What is a REST API?
//     -> API following REST rules: noun URLs, HTTP methods for actions,
//        stateless, JSON responses, proper status codes

// Q2: What does stateless mean in REST?
//     -> Server stores NO session data between requests
//     -> Every request must carry all needed info (like JWT token in headers)

// Q3: Difference between PUT and PATCH?
//     -> PUT:   replaces ENTIRE object — all fields required
//     -> PATCH: updates only fields you send — rest stays unchanged

// Q4: What status code for POST success?
//     -> 201 Created (not 200 — 200 is for GET/PUT/PATCH/DELETE)

// Q5: Why no verbs in REST URLs?
//     -> HTTP method already tells the action
//     -> POST /users already means create — /users/create is redundant

// Q6: Difference between 400 and 404?
//     -> 400: bad request — client sent invalid or missing data
//     -> 404: not found — resource doesn't exist at that URL

// Q7: Difference between 401 and 403?
//     -> 401: unauthorized — not logged in (no token)
//     -> 403: forbidden — logged in but no permission

// Q8: What is the difference between REST API and normal API?
//     -> REST follows specific rules (stateless, uniform interface etc)
//     -> A normal API may work but not follow these conventions
//     -> REST APIs are predictable and easy to understand for any developer

// Q9: What are the 6 REST principles?
//     -> Client-Server, Stateless, Uniform Interface,
//        Cacheable, Layered System, Code on Demand (optional)

// Q10: How do you test REST APIs?
//      -> Postman, Thunder Client (VS Code extension), Insomnia
//      -> Or curl in terminal: curl http://localhost:8080/users