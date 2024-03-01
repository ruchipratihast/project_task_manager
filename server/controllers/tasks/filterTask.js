const { Task } = require("../../models/taskModel");

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
                    startDate = new Date(currentDate);
                    startDate.setHours(0, 0, 0, 0); // Set to beginning of the day
                    endDate = new Date(currentDate);
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
                    startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                    startDate.setHours(0, 0, 0, 0); // Set to beginning of the day
                    endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
                    endDate.setHours(23, 59, 59, 999); // Set to end of the day
                    break;
                default:
                    return res.status(400).json({ message: 'Invalid filter' });
            }

            // Fetch tasks filtered by creation date
            const tasks = await Task.find({
                createdAt: { $gte: startDate, $lte: endDate }
            });

            return res.status(200).json(tasks);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
];
