import express from "express";
import {
    getAllUsers,
    getUserbyID,
    createUser,
    updateUser,
    deleteUser
} from "../../controller/user.controller.js";
const router = express.Router();

//route level middleware
const mid = (req, res, next) => {
    console.log("route level", req.user);
    next();
};

router.get("/", mid, getAllUsers);
router.get("/:id", getUserbyID);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;