const { body } = require("express-validator");
const { Task } = require("../../models/taskModel");

module.exports = [
    body("section").notEmpty().withMessage("Section is required"),

    async (req, res) => {
        const taskId = req.params.taskId;
        const { section } = req.body;

        try {
            const updatedTask = await Task.findByIdAndUpdate(
                taskId,
                { $set: { section } },
                { new: true }
            );

            if (!updatedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }

            return res.status(200).json({ message: updatedTask });
        } catch (err) {
            return res.status(500).json({ message: "Internal server error" });
        }
    },
];
