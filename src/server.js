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
//get/users
app.get("/users", (req, res) => {
    res.send("<h1>All users</h1>");
})
//get/products
app.get("/products", (req, res) => {
    res.send("<h1>All Products</h1>");
})

//listening in port
app.listen(8080, () => {
    console.log(`server is running at http://localhost:8080`);
    console.log("press ctrl +c to close the server")
});