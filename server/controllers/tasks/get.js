const { Task } = require("../../models/taskModel");
const { Todo } = require("../../models/todoModel");

module.exports = [
    async (req, res) => {
        try {
            const tasks = await Task.find();
            // const tasksWithTodos = await Promise.all(tasks.map(async task => {
            //     const todos = await Todo.find({ task: task._id });
            //     return { ...task._doc, todos };
            // }));
            let alldata = [];
            for (let task of tasks) {
                let alltodos = await Todo.find({ taskRef: task._id });
                task.todos = alltodos;
                alldata.push({ ...task._doc, todos: alltodos });
            }

            // let todos = await Todo.find({ taskRef: tasks[0]._id });
            res.status(200).json(alldata);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
]