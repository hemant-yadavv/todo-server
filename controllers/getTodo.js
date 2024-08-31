const Todo = require("../models/Todo")

exports.getTodo = async (req, res) => {
    try {
        const user = req.user.id;
        // fetch all todos from db
        const todos = await Todo.find({ user: user });

        // send the response
        res.status(200).json({
            success: true,
            count: todos.length,
            data: todos,
            message: 'All todos fetched successfully',
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Server error',
        });
    }
}