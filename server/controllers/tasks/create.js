
const { body } = require("express-validator");
const { Task } = require("../../models/taskModel");
const { Todo } = require("../../models/todoModel");

module.exports = [
    body("title").notEmpty().withMessage("Title is required"),
    body("priority").notEmpty().withMessage().withMessage("Priority is required"),
    body("section").notEmpty().withMessage("Section is required"),
    body("todos").notEmpty().withMessage("Atleast one todo is required"),

    async (req, res) => {
        try {
            const { title, priority, due_date, section, todos } = req.body;
            // Create a new Taskfield
            const taskfield = new Task({
                title,
                priority,
                due_date,
                section,
            });

            // Save the taskfield 
            try {
                let task = await taskfield.save();
                let id = task._id;
                let todosArr = [];
                for (var t of todos) {
                    todosArr.push({
                        taskRef: id,
                        todo: t,
                    });
                }

             Todo.insertMany(todosArr);

            } catch (error) {
                return res.status(400).json({ "Error while adding task: ": err });
            }
            return res.status(200).json({ message: "Task added successfully" });
        }
        catch (err) {
            res.status(500).json({ message: err });
        }
    },
];