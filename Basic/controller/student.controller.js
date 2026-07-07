// Fake database
let students = [{
    _id: 1,
    name: "Ram",
    email: "ram@gmail.com",
    faculty: "BIT",
    roll: 1
}, {
    _id: 2,
    name: "Sita",
    email: "sita@gmail.com",
    faculty: "BCA",
    roll: 2
}, {
    _id: 3,
    name: "Prabesh",
    email: "prabesh@gmail.com",
    faculty: "BITM",
    roll: 17
}, ];

//  GET all students
export const getAllStudent = (req, res) => {
    res.status(200).json({
        message: "all students fetched",
        status: "success",
        data: students,
    });
}

// GET student by ID
export const getStudentbyID = (req, res) => {
    const id = parseInt(req.params.id); // Convert to number
    const student = students.find(student => student._id === id);

    if (!student) {
        return res.status(404).json({
            message: `student with id ${id} not found`,
            status: "error"
        });
    }

    res.status(200).json({
        message: `student with id ${id} fetched`,
        status: "success",
        data: student
    });
}

// CREATE new student 
export const createStudent = (req, res) => {
    const {
        name,
        email,
        faculty,
        roll
    } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !faculty || !roll) {
        return res.status(400).json({
            message: "All fields (name, email, faculty, roll) are required",
            status: "error"
        });
    }

    const newStudent = {
        _id: students.length + 1,
        name,
        email,
        faculty,
        roll
    };

    students.push(newStudent);

    res.status(201).json({
        message: "student created",
        status: "success",
        data: newStudent
    });
}

// UPDATE student 
export const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const {
        name,
        email,
        faculty,
        roll
    } = req.body;

    const index = students.findIndex(student => student._id === id);

    if (index === -1) {
        return res.status(404).json({
            message: `student with id ${id} not found`,
            status: "error"
        });
    }

    // Update the student
    students[index] = {
        _id: id,
        name: name || students[index].name, // Keep old value if not provided
        email: email || students[index].email,
        faculty: faculty || students[index].faculty,
        roll: roll || students[index].roll
    };

    res.status(200).json({
        message: `student ${id} updated`,
        status: "success",
        data: students[index]
    });
}

// DELETE student 
export const deleteStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(student => student._id === id);

    if (index === -1) {
        return res.status(404).json({
            message: `student with id ${id} not found`,
            status: "error"
        });
    }

    students.splice(index, 1);

    res.status(200).json({
        message: `student ${id} deleted`,
        status: "success",
        data: null
    });
}