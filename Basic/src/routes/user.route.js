import express from "express";
import {
    getAllUsers,
    getUserbyID,
    createUser,
    updateUser,
    deleteUser
} from "../../controller/user.controller.js";
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserbyID);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;