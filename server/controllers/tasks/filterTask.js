const { Task } = require("../../models/taskModel");
const { Todo } = require("../../models/todoModel");

// Get tasks filtered by creation date
module.exports = [
    async (req, res) => {
        try {
            const filter = req.params.filter;
            const currentDate = new Date();

            let startDate, endDate;

            // Calculate start and end dates based on the filter
            switch (filter) {
                case 'today':
                    startDate = new Date();
                    startDate.setHours(0, 0, 0, 0); // Set to beginning of the day
                    endDate = new Date();
                    endDate.setHours(23, 59, 59, 999); // Set to end of the day
                    break;
                case 'thisWeek':
                    // Calculate start date of the week (Sunday)
                    startDate = new Date(currentDate);
                    startDate.setDate(startDate.getDate() - startDate.getDay());
                    startDate.setHours(0, 0, 0, 0); // Set to beginning of the day
                    // Calculate end date of the week (Saturday)
                    endDate = new Date(currentDate);
                    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
                    endDate.setHours(23, 59, 59, 999); // Set to end of the day
                    break;
                case 'thisMonth':
                    startDate = new Date();
                    startDate.setDate(1);
                    startDate.setHours(0, 0, 0, 0);

                    endDate = new Date();
                    endDate.setMonth(endDate.getMonth() + 1);
                    endDate.setDate(0);
                    endDate.setHours(23, 59, 59, 999);
                    break;
                default:
                    return res.status(400).json({ message: 'Invalid filter' });
            }
            // Fetch tasks filtered by creation date
            const tasks = await Task.find({
                user: req.userId,
                createdAt: { $gte: startDate, $lte: endDate }
            });

            // add todos too
            let alldata = [];
            for (let task of tasks) {
                let alltodos = await Todo.find({ taskRef: task._id });
                task.todos = alltodos;
                alldata.push({ ...task._doc, todos: alltodos });
            }

            return res.status(200).json(alldata);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
];
