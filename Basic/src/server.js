//express give middleware, error handle, easy and better routing etc which make easy 
import express from "express";
const app = express();
//express make multiples handlers for particular requests which make easy to make route.
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
app.get("/users", (req, res) => {
    res.send("<h1>All users</h1>");
})
//create(post)/users
app.post("/users/create", (req, res) => {
    res.send("<h1>User creates</h1>")
})
//update(put)/users
app.put("/users/update", (req, res) => {
    res.send("<h1>User updates</h1>")
})
//delete(delete)/users
app.delete("/users/delete", (req, res) => {
    res.send("<h1>User deletes</h1>")
})

//get/products
app.get("/products", (req, res) => {
    res.send("<h1>All Products</h1>");
})
//create(post)/products
app.post("/products/create", (req, res) => {
    res.send("<h1>Products creates</h1>")
})
//update(put)/products
app.put("/products/update", (req, res) => {
    res.send("<h1>Products updates</h1>")
})
//delete(delete)/products
app.delete("/products/delete", (req, res) => {
    res.send("<h1>Products deletes</h1>")
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