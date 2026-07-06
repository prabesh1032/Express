//express give middleware, error handle, easy and better routing etc which make easy 
import express from "express";
const app = express();
//parse rqr raw json data=>{}=>req.body.
app.use(express.json());
// //express make multiples handlers for particular requests which make easy to make route.
//get/users=>handlers1
//get/products=>handlers2
//post/users=>handlers3
//post/products=>handlers1
//app.method(path,handler)


//get/
app.get("/", (req, res) => {
    res.send("<h1>Home pge</h1>");
})
//crud =>c-create/postMessage, r=>read/get, U=>update/put/patch, D=>delete/delete 

//read(get)/users
// app.get("/users", (req, res) => {
//     res.send("<h1>All users</h1>");
// })
// //create(post)/users
// app.post("/users/create", (req, res) => {
//     res.send("<h1>User creates</h1>")
// })
// //update(put)/users
// app.put("/users/update", (req, res) => {
//     res.send("<h1>User updates</h1>")
// })
// //delete(delete)/users
// app.delete("/users/delete", (req, res) => {
//     res.send("<h1>User deletes</h1>")
// })

//get products
app.get("/products/", (req, res) => {
    res.send("<h1>All Products </h1>")
})

//get/products with id
app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    res.send(`<h1>Products with id ${id}</h1>`);
})
//create(post)/products
app.post("/products/create", (req, res) => {
    res.send("<h1>Products creates</h1>")
})
//update(put)/products
app.put("/products/:id", (req, res) => {
    const id = req.params.id;
    res.send(`<h1>Products with id ${id} updated.</h1>`);
})
//delete(delete)/products
app.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    res.send(`<h1>Products with id${id} deleted.</h1>`);
})

//get posts
app.get("/posts", (req, res) => {
    res.send("<h1>All Posts</h1>");
})
//get comments
app.get("/comments", (req, res) => {
    res.send("<h1>All Comments</h1>");
})



//listening in port
app.listen(8080, () => {
    console.log(`server is running at http://localhost:8080`);
    console.log("press ctrl +c to close the server")
});


//express js
// req.url=> current req url(completw url with http and domain name)
//req.originalUrl=> current req url
//req.path=> path(path is ulr's path after /)
//req.method=> req method => get, post ,put, patch, delete
//req.params=> it will give route parameter. route parameter means dynamic route .
//read(get)/users
app.get("/users/:id", (req, res) => {
    //console.log(req.params);
    const id = req.params.id;
    //const{id, something id,...... }= req.params//this is object destructuring
    res.send(`<h1>User with id:${id}.</h1>`);
})
// //create(post)/users
// app.post("/users/create", (req, res) => {
//     res.send("<h1>User creates</h1>")
// }) //we dont need params in post.
app.put("/users/:id", (req, res) => {
    const id = req.params.id;
    res.send(`<h1>User update with id:${id}.</h1>`);
})
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    res.send(`<h1>User  delete with id:${id}.</h1>`);
})

//req.query=>query parameter=>it is also object{}.
//https://daraz.com/products?name=abc&category-xyz&page=1&limit=10.//url shape
//all users with query
app.get("/users", (req, res) => {
    console.log("query is:", req.query);
    console.log("url is:", req.url);
    console.log("path is:", req.path);
    console.log("original url is:", req.originalUrl);

    res.send(`<h1>All users</h1>`);
})
//query=>for filter
//param=>for dynamic
//body=> for sending data 

//create(post)/users
app.post("/users/create", (req, res) => {
    console.log(req.body);
    res.send("<h1>User creates</h1>")
}) //we dont need params in post.

//rest api of students


// fake database
let students = [
    { _id: 1, name: "Ram",     email: "ram@gmail.com",     faculty: "BIT",  roll: 1 },
    { _id: 2, name: "Sita",    email: "sita@gmail.com",    faculty: "BCA",  roll: 2 },
    { _id: 3, name: "Prabesh", email: "prabesh@gmail.com", faculty: "BITM", roll: 17 },
];


// GET /students — get all students
app.get("/students", (req, res) => {
    res.status(200).json({
        message: "all students fetched",
        status: "success",
        data: students,
    });
});

// GET /students/:id — get student by id
app.get("/students/:id", (req, res) => {
    const id = req.params.id;
    // db query -> find student by id
    res.status(200).json({
        message: `student with id ${id} fetched`,
        status: "success",
        data: { _id: id, name: "Ram", email: "ram@gmail.com", faculty: "BIT", roll: 1 },
    });
});

// POST /students — create student
app.post("/students", (req, res) => {
    console.log(req.body); // { name, email, faculty, roll }
    const { name, email, faculty, roll } = req.body;
    // db query -> create student
    res.status(201).json({
        message: "student created",
        status: "success",
        data: { name, email, faculty, roll },
    });
});

// PUT /students/:id — full update
app.put("/students/:id", (req, res) => {
    const id = req.params.id;
    const { name, email, faculty, roll } = req.body;
    // db query -> replace entire student
    res.status(200).json({
        message: `student ${id} updated`,
        status: "success",
        data: { _id: id, name, email, faculty, roll },
    });
});

// PATCH /students/:id — partial update
app.patch("/students/:id", (req, res) => {
    const id      = req.params.id;
    const updates = req.body;
    // db query -> update only sent fields
    res.status(200).json({
        message: `student ${id} partially updated`,
        status: "success",
        data: updates,
    });
});

// DELETE /students/:id — delete student
app.delete("/students/:id", (req, res) => {
    const id = req.params.id;
    // db query -> delete student
    res.status(200).json({
        message: `student ${id} deleted`,
        status: "success",
    });
});