
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

            const taskId = req.params.taskId;
            const { title, priority, due_date, section, todos } = req.body;

            const taskfield = await Task.updateOne(
                { _id: taskId },
                {
                    $set: {
                        title,
                        priority,
                        due_date,
                        section,
                    },
                }
            );
            console.log(taskfield);

            // Save the taskfield 
            try {
                let id = taskfield._id;
                let todosArr = [];
                for (var t of todos) {
                    todosArr.push({
                        taskRef: id,
                        todo: t
                    });
                }
                Todo.updateMany(todosArr);

            } catch (error) {
                return res.status(400).json({ "Error while updating task: ": err });
            }
            return res.status(200).json({ message: "Task updated successfully" });
        }
        catch (err) {
            res.status(500).json({ message: err });
        }
    },
];