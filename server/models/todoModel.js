const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    taskRef : {
        type : mongoose.Types.ObjectId,
        ref : 'task',
    },
    todo: {
        type: {
            task: {
                type: String,
                required: true
            },
            completed: {
                type: Boolean,
                default: false
            }
        },
        required: true
    },
}, { timestamps : true });

module.exports.Todo = mongoose.model("todo", todoSchema);