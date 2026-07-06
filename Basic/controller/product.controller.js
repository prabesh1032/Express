//product database
let products = [{
        _id: 1,
        name: "Product 1",
        price: 100,
        brand: "Brand 1",
        description: "This is product 1",
    },
    {
        _id: 2,
        name: "Product 2",
        price: 200,
        brand: "Brand 2",
        description: "This is product 2",
    },
    {
        _id: 3,
        name: "Product 3",
        price: 300,
        brand: "Brand 3",
        description: "This is product 3",
    },
];
export const getAllProducts = (req, res) => {
    res.status(200).json({
        message: "all products fetched",
        status: "success",
        data: products,
    });
}
export const getProductbyID = (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(product => product._id === id);
    if (!product) {
        return res.status(404).json({
            message: `product with id ${id} not found`,
            status: "error"
        });
    }
    res.status(200).json({
        message: `product with id ${id} fetched`,
        status: "success",
        data: product
    });
}
export const createProduct = (req, res) => {
    console.log(req.body); // { name, price, brand, description }
    const {
        name,
        price,
        brand,
        description
    } = req.body;
    const newProduct = {
        _id: products.length + 1,
        name,
        price,
        brand,
        description
    };
    products.push(newProduct);
    res.status(201).json({
        message: "product created",
        status: "success",
        data: newProduct
    });
}
export const updateProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(product => product._id === id);
    if (index === -1) {
        return res.status(404).json({
            message: `product with id ${id} not found`,
            status: "error"
        });
    }
    products[index] = {
        // _id: id,
        // name: req.body.name,
        // price: req.body.price,
        // brand: req.body.brand,  
        // description: req.body.description
        _id: id,
        name,
        price,
        brand,
        description
    } = req.body; //this is object destructuring. we can use this instead of above code.
    res.status(200).json({
        message: `product with id ${id} updated`,
        status: "success",
        data: products[index]
    });
}
export const deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(product => product._id === id);
    if (index === -1) {
        return res.status(404).json({
            message: `product with id ${id} not found`,
            status: "error"
        });
    }
    products.splice(index, 1);
    res.status(200).json({
        message: `product with id ${id} deleted`,
        status: "success"
    });
}