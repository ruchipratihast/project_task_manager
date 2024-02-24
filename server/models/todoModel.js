const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    taskRef: {
        type: mongoose.Types.ObjectId,
        ref: 'tasks',
    },
    todo: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports.Todo = mongoose.model("todo", todoSchema);