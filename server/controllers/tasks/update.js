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
        const  taskId  = req.params.taskId;
        const { title, selectedPriority, dueDate, todos } = req.body;

        try {
            const updatedTask = await Task.findByIdAndUpdate(
                taskId,
                { $set: { title, selectedPriority, dueDate } },
                { new: true }
            );

            if (!updatedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }

            // Update todo
            for (const todoData of todos) {
                try {
                    const updatedTodo = await Todo.findOneAndUpdate(
                        { _id: todoData._id, "taskRef": taskId },
                        {
                            $set: {
                                todo: todoData.name,
                                completed: todoData.checked,
                            }
                        },
                        { new: true }
                    );

                    if (!updatedTodo) {
                        throw new Error("Todo not found");
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }
           return res.status(200).json(updatedTask);
        } catch (err) {
           return res.status(500).json({ message: "Internal server error" });
        }
    },
];
