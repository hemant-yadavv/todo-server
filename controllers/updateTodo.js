const Todo = require("../models/Todo")

exports.updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        const { title, description } = req.body;

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found',
            });
        }

        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to update this todo',
            });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { title, description, updatedAt: Date.now() },
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            data: updatedTodo,
            message: 'Todo updated successfully',
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Server error in updating todo',
        })
    }
}