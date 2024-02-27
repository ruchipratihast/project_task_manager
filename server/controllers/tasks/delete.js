
const { Task } = require("../../models/taskModel");

module.exports = [
    async (req, res) => {
        try {
            const taskId = req.params.taskId;

            // Find the task by ID and delete it
            const deletedTask = await Task.findByIdAndDelete(taskId);
    
            if (!deletedTask) {
                return res.status(404).json({message: 'Task not found'});
            }
    
            return res.status(200).json({
                message: "Task Delted successfully",
                user: deletedTask,
            });
        } catch (error) {
            console.error('Error deleting task:', error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }
]
