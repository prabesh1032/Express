// fake database
let students = [{
        _id: 1,
        name: "Ram",
        email: "ram@gmail.com",
        faculty: "BIT",
        roll: 1
    },
    {
        _id: 2,
        name: "Sita",
        email: "sita@gmail.com",
        faculty: "BCA",
        roll: 2
    },
    {
        _id: 3,
        name: "Prabesh",
        email: "prabesh@gmail.com",
        faculty: "BITM",
        roll: 17
    },
];
export const getAllStudent = (req, res) => {
    res.status(200).json({
        message: "all students fetched",
        status: "success",
        data: students,
    });
}
export const getStudentbyID = (req, res) => {
    const id = req.params.id;
    // db query -> find student by id
    res.status(200).json({
        message: `student with id ${id} fetched`,
        status: "success",
        data: {
            _id: id,
            name: "Ram",
            email: "ram@gmail.com",
            faculty: "BIT",
            roll: 1
        },
    });
}
export const createStudent = (req, res) => {
    console.log(req.body); // { name, email, faculty, roll }
    const {
        name,
        email,
        faculty,
        roll
    } = req.body;
    // db query -> create student
    res.status(201).json({
        message: "student created",
        status: "success",
        data: {
            name,
            email,
            faculty,
            roll
        },
    });
}
export const updateStudent = (req, res) => {
    const id = req.params.id;
    const {
        name,
        email,
        faculty,
        roll
    } = req.body;
    // db query -> replace entire student
    res.status(200).json({
        message: `student ${id} updated`,
        status: "success",
        data: {
            _id: id,
            name,
            email,
            faculty,
            roll
        },
    });
}
export const deleteStudent = (req, res) => {
    const id = req.params.id;
    // db query -> delete student
    res.status(200).json({
        message: `student ${id} deleted`,
        status: "success",
        data: "null",
    });
}