//data of users
let users = [{
        _id: 1,
        name: "Ram",
        email: "ram@example.com"
    },
    {
        _id: 2,
        name: "Shyam",
        email: "shyam@example.com"
    },
    {
        _id: 3,
        name: "Hari",
        email: "hari@example.com"
    }
];


export const getAllUsers = (req, res) => {
    console.log(req.user); //taking user from middleware
    res.status(200).json({
        message: "all users fetched",
        status: "success",
        data: users,
    });
}

export const getUserbyID = (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user._id === id);
    if (!user) {
        return res.status(404).json({
            message: `user with id ${id} not found`,
            status: "error"
        });
    }
    res.status(200).json({
        message: `user with id ${id} fetched`,
        status: "success",
        data: user
    });
}
export const createUser = (req, res) => {
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
        ...users[index],
        name,
        email
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