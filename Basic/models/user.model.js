import mongoose from "mongoose";

//user schema
export const userSchema = new mongoose.Schema({
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

