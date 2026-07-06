import express from "express";
import {
    getAllBlogs,
    getBlogbyID,
    createBlog,
    updateBlog,
    deleteBlog
} from "../../controller/blog.controller.js";
const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlogbyID);
router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;