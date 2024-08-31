const Todo = require("../models/Todo");
const User = require("../models/User");

// define route handler
exports.createTodo = async (req, res) => {

    const { title, description } = req.body;
    const user = req.user.id;

    try {
        const todo = new Todo({
            user,
            title,
            description,
        });

        const savedTodo = await todo.save();

        const updatedUser = await User.findByIdAndUpdate(user,
            { $push: { todo: savedTodo._id } },
            { new: true }
        ).populate('todo').exec();

        res.status(201).json({
            success: true,
            user: updatedUser,
            message: 'Todo created successfully',
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: 'Server error in creating todo',
        });
    }
}