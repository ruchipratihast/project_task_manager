
const { body } = require("express-validator");
const { Task } = require("../../models/taskModel");
const { Todo } = require("../../models/todoModel");

module.exports = [
    body("title").notEmpty().withMessage("Title is required"),
    body("selectedPriority").notEmpty().withMessage().withMessage("Selected Priority is required"),
    body("dueDate").notEmpty().withMessage("Due Date is required"),
    body("todos").notEmpty().withMessage("Atleast one todo is required"),

    async (req, res) => {

        const { title, selectedPriority, dueDate, todos } = req.body;

        const task = new Task(
            {
                title,
                priority: selectedPriority,
                due_date: dueDate,
                section: "Todo"
            }
        );

        for (let todoData of todos) {
            const todo = new Todo({
                taskRef: task._id,
                todo: todoData.name,
                completed: todoData.checked,
            });
            await todo.save();
        }
        await task.save();
        res.status(201).json(task);

    }
];