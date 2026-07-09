// ============================================================
//  EXPRESS.JS: ERROR HANDLING MIDDLEWARE
//  Day 9 — Express — MERN Stack Learning
// ============================================================


// ============================================================
//  1. WHAT IS ERROR HANDLING MIDDLEWARE?
// ============================================================

// Normal middleware:      (req, res, next)
// Error middleware:       (error, req, res, next)  <- 4 parameters
//
// Express knows it is an error handler ONLY when it has 4 params
// Must ALWAYS be registered at the VERY BOTTOM (after all routes)
//
// How to trigger it:
// next(error) -> pass an error object to next() -> goes to error handler
// Any error object you pass arrives as the first 'error' param


// ============================================================
//  2. HOW ERRORS FLOW
// ============================================================

// Normal flow:
// Request -> Middleware -> Route Handler -> Response
//
// Error flow:
// Request -> Middleware -> next(error) -> SKIPS all normal routes
//                                     -> Goes straight to error middleware
//                                     -> Sends error response


import express from "express";
const app = express();
app.use(express.json());


// ============================================================
//  3. APPLICATION LEVEL MIDDLEWARE (with error passing)
// ============================================================

app.use((req, res, next) => {
    console.log("middleware 1 — logger");
    req.user = { name: "John" };
    next();
});

app.use((req, res, next) => {
    console.log("middleware 2 — set auth");
    req.isAuthenticated = false; // change to false to test error handler
    next();
});

// middleware that passes error if not authenticated
app.use((req, res, next) => {
    console.log("middleware 3 — auth check");
    if (req.isAuthenticated) {
        next(); // ✅ authenticated — continue normally
    } else {
        next({
            message:    "Unauthorized. Access denied.",
            statusCode: 401,
            status:     "fail",
        }); // ❌ not authenticated — pass error to error handler
    }
});

app.use((req, res, next) => {
    console.log("middleware 4 — passed auth");
    next();
});


// ============================================================
//  4. ROUTES
// ============================================================

app.get("/", (req, res) => {
    res.status(200).json({ message: "Home Page" });
});

app.get("/users", (req, res) => {
    res.status(200).json({ message: "All Users" });
});

// manually throw error from a route
app.get("/error-test", (req, res, next) => {
    next({
        message:    "Something went wrong!",
        statusCode: 500,
        status:     "error",
    });
});


// ============================================================
//  5. ERROR HANDLING MIDDLEWARE
//  ⚠️  Must be LAST — after all routes
//  ⚠️  Must have exactly 4 params: (error, req, res, next)
// ============================================================

app.use((error, req, res, next) => {
    console.log("error handler triggered");
    console.log(error);

    res.status(error?.statusCode ?? 500).json({
        message: error?.message ?? "Internal Server Error",
        status:  error?.status  ?? "error",
        success: false,
        data:    null,
    });
});

// ⚠️  error?.statusCode ?? 500 means:
// if error.statusCode exists -> use it
// if not (undefined/null)    -> use 500 as default


// ============================================================
//  6. WHY ?? (nullish coalescing) instead of || (OR)?
// ============================================================

// || uses default if value is ANY falsy (0, "", false, null, undefined)
// ?? uses default ONLY if value is null or undefined
//
// statusCode could be 0 — || would wrongly use default
// ?? is safer here — only falls back when truly missing


// ============================================================
//  START SERVER
// ============================================================

app.listen(8080, () => {
    console.log("server running at http://localhost:8080");
});


// ============================================================
//  INTERVIEW QUESTIONS
// ============================================================

// Q1: What is error handling middleware in Express?
//     -> Special middleware with 4 params: (error, req, res, next)
//     -> Express identifies it as error handler because of 4 params
//     -> Must be registered LAST after all routes

// Q2: How do you trigger error handling middleware?
//     -> Call next(errorObject) instead of next()
//     -> Express skips all normal routes and goes straight to error handler

// Q3: Why must error middleware have exactly 4 parameters?
//     -> Express checks the function signature
//     -> If it has 4 params -> treats it as error handler
//     -> If it has 3 params -> treats it as normal middleware

// Q4: What does error?.statusCode ?? 500 mean?
//     -> Optional chaining (?.) -> safely access statusCode even if error is null
//     -> Nullish coalescing (??) -> use 500 if statusCode is null or undefined

// Q5: Difference between next() and next(error)?
//     -> next()        -> pass to NEXT middleware or route (normal flow)
//     -> next(error)   -> skip everything, go straight to error handler

// Q6: Where should error middleware be placed?
//     -> Always at the VERY BOTTOM — after all routes and middleware
//     -> If placed before routes, it will never catch their errors