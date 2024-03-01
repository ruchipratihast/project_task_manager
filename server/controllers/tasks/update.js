const { body } = require("express-validator");
const { Task } = require("../../models/taskModel");
const { Todo } = require("../../models/todoModel");

module.exports = [
    body("title").notEmpty().withMessage("Title is required"),
    body("selectedPriority")
        .notEmpty()
        .withMessage("Selected Priority is required"),
    body("todos").notEmpty().withMessage("Atleast one todo is required"),

    async (req, res) => {
        const taskId = req.params.taskId;
        const { title, priority, due_date, section, todos } = req.body;

        try {
            const updatedTask = await Task.findByIdAndUpdate(
                taskId,
                { $set: { title, priority, due_date, section } },
                { new: true }
            );

            if (!updatedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }

            // Update todo
            for (const todoData of todos) {
                try {
                    // if todo is not exist in Task
                    console.log(todoData._id)
                    const existingTodo = await Todo.findById(todoData._id);
                    if (!existingTodo) {
                        const todo = new Todo({
                            taskRef: taskId,
                            todo: todoData.todo,
                            completed: todoData.completed,
                        });
                        await todo.save();
                    }

                    const updatedTodo = await Todo.findOneAndUpdate(
                        { _id: todoData._id, "taskRef": taskId },
                        {
                            $set: {
                                todo: todoData.todo,
                                completed: todoData.completed,
                            }
                        },
                        { new: true }
                    );

                }
                catch (err) {
                    console.log(err);
                }
            }
            return res.status(200).json({message: updatedTask});
        } catch (err) {
            return res.status(500).json({ message: "Internal server error" });
        }
    },
];
