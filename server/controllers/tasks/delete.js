const { Task } = require("../../models/taskModel");
const { Todo } = require("../../models/todoModel");

module.exports = [
    async (req, res) => {
        const taskId = req.params.taskId;
        console.log(taskId)
        try {
            const deletedTask = await Task.findByIdAndDelete({ _id: taskId });
            console.log(deletedTask)

            if (!deletedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }

            // Delete todo also
            await Todo.deleteMany({ taskRef: { $in: taskId } });

            return res.status(200).json({ message: "Task deleted successfully" });
        } catch (err) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
]
