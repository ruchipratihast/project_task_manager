const { Task } = require("../../models/taskModel");
const { Todo } = require("../../models/todoModel");

module.exports = [
    async (req, res) => {
        try {
            const tasks = await Task.find({ user: req.userId, });
            let alldata = [];
            for (let task of tasks) {
                let alltodos = await Todo.find({ taskRef: task._id });
                task.todos = alltodos;
                alldata.push({ ...task._doc, todos: alltodos });
            }
            return res.status(200).json(alldata);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
] 