// import the model
const Todo = require('../models/Todo');
const User = require('../models/User');

exports.deleteTodo = async (req, res) => {
    try {
        // find the todo
        const todo = await Todo.findByIdAndDelete(req.params.id);

        // check if todo exists
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found',
            });
        }

        // check if the todo belongs to the user
        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to delete this todo',
            });
        }

        // remove the todo from the user's todo list
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { todo: req.params.id },
        });

        res.status(200).json({
            success: true,
            message: 'Todo deleted successfully',
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