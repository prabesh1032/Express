// ============================================================
//  MONGOOSE — CONNECTION, SCHEMA, MODEL & CRUD
//  Day 10 — MongoDB — MERN Stack Learning
// ============================================================


// ============================================================
//  1. WHAT IS MONGOOSE?
// ============================================================

// Mongoose = ODM (Object Document Mapper) for MongoDB in Node.js
// It adds:
// - SCHEMA     -> define structure and validation rules for documents
// - MODEL      -> interface to interact with a collection
// - QUERIES    -> clean methods to find, create, update, delete
//
// Install: npm install mongoose
// Without mongoose -> raw MongoDB driver (more complex, no validation)
// With mongoose    -> clean, structured, validated


// ============================================================
//  2. CONNECTING TO MONGODB
// ============================================================

import mongoose from "mongoose";

// MongoDB URL format:
// mongodb://localhost:27017       -> local MongoDB (development)
// mongodb+srv://...@cluster...   -> MongoDB Atlas (cloud/production)

const DB_URL = "mongodb://localhost:27017";

// WAY 1 — DB name in URL directly
// mongoose.connect("mongodb://localhost:27017/first_db")

// WAY 2 — DB name in options (cleaner, recommended)
mongoose.connect(DB_URL, {
    dbName: "first_db",
})
.then(() => {
    console.log("database connected");
})
.catch((error) => {
    console.log("------- database connection error -------");
    console.log(error);
});

// ⚠️  In real projects:
// - Store DB_URL in .env file (never hardcode credentials)
// - Put connection in separate db.js file
// - Call process.exit(1) in catch to stop server if DB fails

// server.js connection order:
// 1. connectDB()          <- connect DB first
// 2. app.use(middleware)  <- then middleware
// 3. app.use(routes)      <- then routes
// 4. app.listen(8080)     <- then start server


// ============================================================
//  3. SCHEMA — defines the structure of documents
// ============================================================

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,   // field is mandatory
        minlength: 3,     // minimum 3 characters
        trim: true,       // removes extra spaces
    },
    email: {
        type: String,
        required: true,
        unique: true,     // no two users can have same email
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default: null,    // if not provided, default is null
    }
}, {
    timestamps: true, // auto adds createdAt and updatedAt fields
});

// strict: true (default) -> extra fields not in schema are ignored
// strict: false          -> extra fields are allowed to be saved


// ============================================================
//  4. MODEL — interface to the collection
// ============================================================

const User = mongoose.model("user", userSchema);
// "user" -> mongoose automatically makes it "users" collection in MongoDB
// User   -> use this to do all DB operations


// ============================================================
//  5. MONGOOSE METHODS — QUICK REFERENCE
// ============================================================

//  Method                          | What it does
//  --------------------------------|--------------------------------
//  User.find({})                   | get ALL documents
//  User.find({ name: "Ram" })      | get all where name is Ram
//  User.findOne({ email })         | get FIRST match
//  User.findById(id)               | get by _id
//  User.create({ name, email })    | create new document
//  User.findByIdAndUpdate(id, {})  | find by id and update
//  User.findByIdAndDelete(id)      | find by id and delete
//  User.countDocuments({})         | count matching documents


// ============================================================
//  6. GET ALL USERS
// ============================================================

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
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
};


// ============================================================
//  7. GET USER BY ID
// ============================================================

export const getUserbyID = async (req, res) => {
    try {
        const id   = req.params.id;
        const user = await User.findById(id);

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
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            status: "error",
            data: null,
        });
    }
};


// ============================================================
//  8. CREATE USER
// ============================================================

export const createUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // check duplicate email before creating
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User with this email already exists",
                status: "error",
                data: null,
            });
        }

        const newUser = await User.create({ name, email, password, phone: phone || null });

        res.status(201).json({
            message: "user created successfully",
            status: "success",
            data: newUser,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            status: "error",
            data: null,
        });
    }
};


// ============================================================
//  9. UPDATE USER
// ============================================================

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, password, phone } = req.body;

        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({
                message: `user with id ${id} not found`,
                status: "error",
                data: null,
            });
        }

        // check if new email is already taken by someone else
        if (email && email !== existingUser.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({
                    message: "Email already in use",
                    status: "error",
                    data: null,
                });
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                name:     name     || existingUser.name,
                email:    email    || existingUser.email,
                password: password || existingUser.password,
                phone:    phone    || existingUser.phone,
            },
            {
                new: true,           // return updated document not old one
                runValidators: true, // run schema validation on update too
            }
        );

        res.status(200).json({
            message: `user with id ${id} updated`,
            status: "success",
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            status: "error",
            data: null,
        });
    }
};


// ============================================================
//  10. DELETE USER
// ============================================================

export const deleteUser = async (req, res) => {
    try {
        const id   = req.params.id;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: `user with id ${id} not found`,
                status: "error",
                data: null,
            });
        }

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
};


// ============================================================
//  INTERVIEW QUESTIONS
// ============================================================

// Q1: What is Mongoose?
//     -> ODM library for MongoDB in Node.js
//     -> Adds schema validation, clean query methods, middleware support

// Q2: What is a Schema in Mongoose?
//     -> Defines the structure, data types and validation rules for documents
//     -> Like a blueprint for what a document should look like

// Q3: What is a Model in Mongoose?
//     -> Created from a Schema — the actual interface to interact with the collection
//     -> User.find(), User.create() etc are all model methods

// Q4: Difference between findOne() and findById()?
//     -> findOne({ _id: id }) -> searches by any field
//     -> findById(id)         -> shortcut specifically for _id (cleaner)

// Q5: What does { new: true } do in findByIdAndUpdate?
//     -> By default returns the OLD document before update
//     -> { new: true } returns the UPDATED document instead

// Q6: What does { runValidators: true } do?
//     -> By default update skips schema validation
//     -> runValidators: true forces validation rules to run on update too

// Q7: What does timestamps: true do?
//     -> Auto adds createdAt and updatedAt to every document
//     -> updatedAt changes automatically every time document is modified

// Q8: How do you connect MongoDB with Mongoose?
//     -> mongoose.connect(DB_URL, { dbName: "mydb" })
//     -> Store URL in .env, connect in separate db.js, call before app.listen

// Q9: Difference between User.create() and new User().save()?
//     -> User.create({ data }) -> shortcut, creates and saves in one step
//     -> new User({ data }).save() -> creates instance first, then saves manually
//     -> Both do the same thing, create() is cleaner