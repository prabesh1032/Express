import mongoose from "mongoose";

//user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default: null,
    }

}, {
    timestamps: true,
}) //strict:false(we can add aditional field) by defult it is true(we cannot add additional field) which handle the structure of databasse.

//user model
const User = mongoose.model('user', userSchema); //user become users automatically by mongoose

export const getAllUsers = async (req, res) => {

    try {
        console.log(req.user); // Taking user from middleware
        console.log("get all user");
        //db op
        const users = await User.find({}); //inside find(find help to return multiple data) we did query for pagination, filter.
        res.status(200).json({
            message: "all users fetched",
            status: "success",
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            status: "error",
            data: null,
        });

    }
}

export const getUserbyID = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({
            _id: id
        });
        if (!user) {
            return res.status(404).json({
                message: `user with id ${id} not found`,
                status: "error",
                data: null,
            });
        }
        res.status(200).json({
            message: `user with id ${id} fetched`,
            status: "success",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            status: "error",
            data: null,
        });

    }

}


export const createUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phone
        } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({
            email
        });
        if (existingUser) {
            return res.status(400).json({
                message: "User with this email already exists",
                status: "error",
                data: null,
            });
        }

        const newUser = await User.create({
            name,
            email,
            password,
            phone: phone || null
        });

        res.status(201).json({
            message: "user created successfully",
            status: "success",
            data: newUser
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            status: "error",
            data: null,
        });
    }
}
//user.create({name,email,password}),
//await User.create(id,{name,email,password})\
//await User.findByIDandUpdate(id,{nazme,email,password})
//await User.findByIdAndDelete(id)

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const {
            name,
            email,
            password,
            phone
        } = req.body;

        // Check if user exists
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({
                message: `user with id ${id} not found`,
                status: "error",
                data: null,
            });
        }

        // Check if email is being changed and if it's already taken
        if (email && email !== existingUser.email) {
            const emailExists = await User.findOne({
                email
            });
            if (emailExists) {
                return res.status(400).json({
                    message: "Email already in use",
                    status: "error",
                    data: null,
                });
            }
        }

        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            id, {
                name: name || existingUser.name,
                email: email || existingUser.email,
                password: password || existingUser.password,
                phone: phone || existingUser.phone
            }, {
                new: true,
                runValidators: true
            } // To ensure that the updated data follows the schema validation rules
        );

        res.status(200).json({
            message: `user with id ${id} updated`,
            status: "success",
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            status: "error",
            data: null,
        });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                message: `user with id ${id} not found`,
                status: "error",
                data: null,
            });
        }

        // Delete user
        await User.findByIdAndDelete(id);

        res.status(200).json({
            message: `user with id ${id} deleted`,
            status: "success",
            data: null,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            status: "error",
            data: null,
        });
    }
}