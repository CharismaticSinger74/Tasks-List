const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    text: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    isChecked: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('tasks', taskSchema);