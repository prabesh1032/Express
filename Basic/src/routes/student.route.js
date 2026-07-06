import express from "express";
import {
    getAllStudent,
    getStudentbyID,
    createStudent,
    updateStudent,
    deleteStudent
} from "../../controller/student.controller.js";
const router = express.Router();

// GET /students — get all students
router.get("/", getAllStudent);

// GET /students/:id — get student by id
router.get("/:id", getStudentbyID);


// POST /students — create student
router.post("/", createStudent);

// PUT /students/:id — full update
router.put("/:id", updateStudent);


// DELETE /students/:id — delete student
router.delete("/:id", deleteStudent);

export default router;