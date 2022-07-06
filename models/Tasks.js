const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    text: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isChecked: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('tasks', taskSchema);