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
        enum: ['TODO', 'BACKLOG', 'PROGRESS', 'DONE'],
        default: 'TODO'
    },
}, { timestamps: true }) // Track creation and update timestamps

module.exports.Task = mongoose.model("task", taskSchema);