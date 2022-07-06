const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const taskRouter = require('./routes/task');
const keys = require('./keys');

const port = process.env.PORT || 8000;
const frontPath = path.join(__dirname, 'front');

mongoose.connect(keys.mongoURI)
    .then(() => console.log('MongoDB connected.'))
    .catch(err => console.error(err))

const app = express();
app.use(bodyParser.json());
app.use('/api/task', taskRouter);
app.use(express.static(frontPath));

app.listen(port, () => {
    console.log(`Server has been started on port ${port}`)
})