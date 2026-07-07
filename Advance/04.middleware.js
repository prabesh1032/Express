// ============================================================
//  EXPRESS.JS: MIDDLEWARE
//  Day 9 — Express — MERN Stack Learning
// ============================================================


// ============================================================
//  1. WHAT IS MIDDLEWARE?
// ============================================================

// Middleware = a function that runs BETWEEN request and response
// It has access to req, res, and next()
// next() = "I am done, pass to the next middleware or route"
//
// REQUEST FLOW:
// Client Request
//      |
//      v
// Middleware 1  (log the request)
//      |
//      v
// Middleware 2  (check authentication)
//      |
//      v
// Middleware 3  (check authorization)
//      |
//      v
// Route Handler (send response)
//      |
//      v
// Client Response
//
// If you don't call next() -> request gets stuck, no response sent
// If you call res.json() in middleware -> chain stops, response sent immediately
//
// ⚠️  ORDER MATTERS — middleware runs top to bottom


// ============================================================
//  2. MIDDLEWARE SYNTAX
// ============================================================

// (req, res, next) => {
//     // do something
//     next(); // pass to next middleware or route
// }
//
// Three ways to use:
// app.use(fn)              -> runs for ALL routes, ALL methods
// app.use("/users", fn)    -> runs only for /users routes
// app.get("/users", fn, handler) -> runs only for this specific route


// ============================================================
//  3. APPLICATION LEVEL MIDDLEWARE
// ============================================================

import express from "express";
const app = express();
app.use(express.json());

// Middleware 1 — runs for every request
app.use((req, res, next) => {
    console.log("middleware 1 — logger");
    console.log(`${req.method} ${req.url}`); // GET /users
    req.user = { name: "John" };             // attach data to req
    next();                                  // pass to next
});

// Middleware 2 — runs after middleware 1
app.use((req, res, next) => {
    console.log("middleware 2 — auth check", req.user);
    req.isAuthenticated = true;              // set auth flag
    next();
});

// Middleware 3 — uses data set by previous middlewares
app.use((req, res, next) => {
    console.log("middleware 3 — authorization");
    if (req.isAuthenticated) {
        next();                              // allow to continue
    } else {
        res.status(401).json({ message: "Unauthorized. Access denied." });
        // no next() here — stops the chain, sends response
    }
});

// Middleware 4 — runs after all above pass
app.use((req, res, next) => {
    console.log("middleware 4 — final check", req.user);
    next();
});

// Route handler — runs after all middleware pass
app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>");
});


// ============================================================
//  4. TYPES OF MIDDLEWARE
// ============================================================

// a) APPLICATION LEVEL — app.use() — runs for all routes
//    eg: logger, body parser, cors

// b) ROUTE LEVEL — attached to specific route only
//    router.get("/", middlewareFn, handlerFn)

// c) BUILT-IN MIDDLEWARE — comes with Express
//    express.json()              -> parse JSON body
//    express.urlencoded()        -> parse form data
//    express.static("public")    -> serve static files (HTML, CSS, images)

// d) THIRD PARTY MIDDLEWARE — installed via npm
//    cors()      -> allow cross-origin requests (React calling Express)
//    morgan()    -> HTTP request logger
//    helmet()    -> security headers


// ============================================================
//  5. ROUTE LEVEL MIDDLEWARE
// ============================================================

// Only runs for specific routes — not all routes

const authMiddleware = (req, res, next) => {
    console.log("route level middleware — auth check");
    // check if user is logged in (token check etc)
    next();
};

app.get("/users", authMiddleware, (req, res) => {
    // authMiddleware runs first, then this handler
    res.status(200).json({ message: "all users" });
});

// Multiple middlewares on one route
app.get("/admin",
    (req, res, next) => {
        console.log("check 1 — is logged in?");
        next();
    },
    (req, res, next) => {
        console.log("check 2 — is admin?");
        next();
    },
    (req, res) => {
        res.status(200).json({ message: "admin page" });
    }
);


// ============================================================
//  6. EXPRESS ROUTER — group routes into separate files
// ============================================================

// Instead of putting ALL routes in server.js (gets messy),
// we group related routes into separate files using express.Router()

// user.routes.js  -> all /users routes
// product.routes.js -> all /products routes
// server.js -> just imports and mounts them

// user.routes.js:
// import express from "express";
// const router = express.Router();
//
// const mid = (req, res, next) => {
//     console.log("route level", req.user);
//     next();
// };
//
// router.get("/", mid, getAllUsers);    // GET /users
// router.get("/:id", getUserById);      // GET /users/:id
// router.post("/", createUser);         // POST /users
// router.put("/:id", updateUser);       // PUT /users/:id
// router.delete("/:id", deleteUser);    // DELETE /users/:id
//
// export default router;

// server.js:
// import userRouter from "./routes/user.routes.js";
// app.use("/users", userRouter);  <- mounts all user routes under /users


// ============================================================
//  7. MVC PATTERN — controller files
// ============================================================

// Controller = the actual logic for each route (kept in separate file)
// Keeps routes clean — route file only has path + middleware
// Logic lives in controller file

// user.controller.js:
// export const getAllUsers = (req, res) => {
//     res.status(200).json({ message: "all users" });
// };
// export const getUserById = (req, res) => {
//     const { id } = req.params;
//     res.status(200).json({ message: `user ${id}` });
// };

// user.routes.js then imports:
// import { getAllUsers, getUserById } from "../controller/user.controller.js";
// router.get("/", getAllUsers);
// router.get("/:id", getUserById);

// FOLDER STRUCTURE:
// server.js               -> entry point, app.use middlewares, mount routers
// routes/
//   user.routes.js        -> route definitions only
//   product.routes.js
// controllers/
//   user.controller.js    -> business logic for each route
//   product.controller.js


// ============================================================
//  START SERVER
// ============================================================

app.listen(8080, () => {
    console.log("server running at http://localhost:8080");
});


// ============================================================
//  INTERVIEW QUESTIONS
// ============================================================

// Q1: What is middleware in Express?
//     -> Function that runs between request and response
//     -> Has access to req, res, next()
//     -> next() passes control to the next middleware or route

// Q2: What happens if you don't call next() in middleware?
//     -> Request gets stuck — no response is ever sent
//     -> Client just waits (timeout)

// Q3: What is the difference between app.use() and app.get()?
//     -> app.use(): runs for ALL HTTP methods on that path
//     -> app.get(): runs ONLY for GET requests on that path

// Q4: What is express.Router()?
//     -> Mini Express app for grouping related routes
//     -> Keeps code organized — separate file per resource

// Q5: What is the MVC pattern?
//     -> Model: database schema/logic
//     -> View: what client sees (React in MERN)
//     -> Controller: business logic for each route
//     -> Keeps code clean and separated by responsibility

// Q6: What is the order of middleware execution?
//     -> Top to bottom — exactly as written in the file
//     -> First app.use() registered runs first

// Q7: How do you stop middleware chain and send a response?
//     -> Call res.json() or res.send() WITHOUT calling next()
//     -> Example: auth middleware returning 401 if not logged in

// Q8: Name some common third-party middleware?
//     -> cors: allow React frontend to call Express backend
//     -> morgan: log every request (method, url, status, time)
//     -> helmet: add security headers automatically
//     -> multer: handle file uploads