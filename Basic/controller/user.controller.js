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

// // Data of users
// let users = [{
//     _id: 1,
//     name: "Ram",
//     email: "ram@example.com"
// }, {
//     _id: 2,
//     name: "Shyam",
//     email: "shyam@example.com"
// }, {
//     _id: 3,
//     name: "Hari",
//     email: "hari@example.com"
// }];

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
        const id = parseInt(req.params.id);
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
    //user.create({name,email,password}),
    //await User.create(id,{name,email,password})\
    //await User.findByIDandUpdate(id,{nazme,email,password})
    //await User.findByIdAndDelete(id)
    console.log(req.body);
    const {
        name,
        email
    } = req.body;
    const newUser = {
        _id: users.length + 1,
        name,
        email
    };
    users.push(newUser);
    res.status(201).json({
        message: "user created",
        status: "success",
        data: newUser
    });
}

export const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const {
        name,
        email
    } = req.body;
    const index = users.findIndex(user => user._id === id);

    if (index === -1) {
        return res.status(404).json({
            message: `user with id ${id} not found`,
            status: "error"
        });
    }

    users[index] = {
        _id: id,
        name: name || users[index].name, // Keep old name if not provided
        email: email || users[index].email // Keep old email if not provided
    };

    res.status(200).json({
        message: `user with id ${id} updated`,
        status: "success",
        data: users[index]
    });
}

export const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(user => user._id === id);
    if (index === -1) {
        return res.status(404).json({
            message: `user with id ${id} not found`,
            status: "error"
        });
    }
    users.splice(index, 1);
    res.status(200).json({
        message: `user with id ${id} deleted`,
        status: "success"
    });
}