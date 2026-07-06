//blog fake database
let blogs = [{
        _id: 1,
        title: "My first blog",
        categories: "Technology",
        description: "This is my first blog content",
    },
    {
        _id: 2,
        title: "My second blog",
        categories: "Technology",
        description: "This is my second blog content",

    },
    {
        _id: 3,
        title: "My third blog",
        categories: "Technology",
        description: "This is my third blog content",
    },
];
export const getAllBlogs = (req, res) => {
    res.status(200).json({
        message: "all blogs fetched",
        status: "success",
        data: blogs,
    });
}

export const getBlogbyID = (req, res) => {
    const id = parseInt(req.params.id); // ← Convert to number
    const blog = blogs.find(blog => blog._id === id); // ← Use ===

    if (!blog) {
        return res.status(404).json({
            message: `blog with id ${id} not found`,
            status: "error"
        });
    }

    res.status(200).json({
        message: `blog with id ${id} fetched`,
        status: "success",
        data: blog
    });
}
export const createBlog = (req, res) => {
    console.log(req.body); // { title, categories, description }
    const {
        title,
        categories,
        description
    } = req.body;
    const newBlog = {
        _id: blogs.length + 1,
        title,
        categories,
        description
    };
    blogs.push(newBlog);
    res.status(201).json({
        message: "blog created",
        status: "success",
        data: newBlog
    });
}
export const updateBlog = (req, res) => {
    const id = parseInt(req.params.id);
    const {
        title,
        categories,
        description
    } = req.body;
    const index = blogs.findIndex(blog => blog._id == id);
    if (index === -1) {
        return res.status(404).json({
            message: `blog with id ${id} not found`,
            status: "error"
        });
    }
    blogs[index] = {
        _id: id,
        title,
        categories,
        description
    };
    res.status(200).json({
        message: `blog with id ${id} updated`,
        status: "success",
        data: blogs[index]
    });
}
export const deleteBlog = (req, res) => {
    const id = parseInt(req.params.id);
    const index = blogs.findIndex(blog => blog._id === id);
    if (index === -1) {
        return res.status(404).json({
            message: `blog with id ${id} not found`,
            status: "error"
        });
    }
    blogs.splice(index, 1);
    res.status(200).json({
        message: `blog with id ${id} deleted`,
        status: "success"
    });
}