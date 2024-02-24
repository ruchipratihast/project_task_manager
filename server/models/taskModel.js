const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    priority: {
        type: String,
        required: true,
        enum: ['HIGH PRIORITY', 'MODERATE PRIORITY', 'LOW PRIORITY'],
        default: 'MODERATE PRIORITY'
    },
    due_date: {
        type: Date,
        default: null
    },
    section: {
        type: String,
        required: true,
        enum: ['Todo', 'Backlog', 'In Progress', 'Done'],
        default: 'Todo'
    },
}, { timestamps: true }) // Track creation and update timestamps

module.exports.Task = mongoose.model("task", taskSchema);