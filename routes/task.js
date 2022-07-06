const express = require('express');
const router = express.Router();
const Task = require('../models/Tasks')

router.get('/', async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json(tasks)
})

router.post('/', async (req, res) => {
    const taskData = {
        text: req.body.text
    };
    const task = new Task(taskData);
    await task.save();
    res.status(201).json(task);
})

router.delete('/:id', async (req, res) => {
    await Task.remove({_id: req.params.id});  
    res.status(200).json({
        message: 'Deleted'
    });
})

module.exports = router;