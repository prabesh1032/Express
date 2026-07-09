import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    brand: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    }

}, {
    timestamps: true,
});

//product model
const Product = mongoose.model("product", productSchema);

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            message: "all products fetched",
            status: "success",
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            status: "error",
            data: null,
        });
    }
}

export const getProductbyID = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findOne({
            _id: id
        });
        if (!product) {
            return res.status(404).json({
                message: `product with id ${id} not found`,
                status: "error",
                data: null,
            });
        }
        res.status(200).json({
            message: `product with id ${id} fetched`,
            status: "success",
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            status: "error",
            data: null,
        });
    }
}
export const createProduct = async (req, res) => {
    try {
        const {
            name,
            price,
            brand,
            description
        } = req.body;
        const newProduct = await Product.create({
            name,
            price,
            brand,
            description
        });

        res.status(201).json({
            message: "product created successfully",
            status: "success",
            data: newProduct
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            status: "error",
            data: null,
        });
    }
}
export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const {
            name,
            price,
            brand,
            description
        } = req.body;

        // Check if product exists
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({
                message: `product with id ${id} not found`,
                status: "error",
                data: null,
            });
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            id, {
                name: name || existingProduct.name,
                price: price || existingProduct.price,
                brand: brand || existingProduct.brand,
                description: description || existingProduct.description
            }, {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            message: `product with id ${id} updated successfully`,
            status: "success",
            data: updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            status: "error",
            data: null,
        });
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if product exists
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                message: `product with id ${id} not found`,
                status: "error",
                data: null,
            });
        }

        // Delete product
        await Product.findByIdAndDelete(id);

        res.status(200).json({
            message: `product with id ${id} deleted successfully`,
            status: "success",
            data: null,
        });

    } catch {
        res.status(500).json({
            message: "Something went wrong",
            status: "error",
            data: null,
        });

    }
}