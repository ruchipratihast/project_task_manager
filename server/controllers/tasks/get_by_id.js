const { Task } = require("../../models/taskModel");
const { Todo } = require("../../models/todoModel");

module.exports = [
    async (req, res) => {
        const { id } = req.params;
        console.log(id);
        try {
            const tasks = await Task.findById(id);

            if (!tasks) {
                return res.status(404).json({
                    message: "Not found !"
                });
            }

            let alldata = [];

            let alltodos = await Todo.find({ taskRef: tasks._id });
            tasks.todos = alltodos;
            alldata.push({ ...tasks._doc, todos: alltodos });

            return res.status(200).json(alldata);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
] 