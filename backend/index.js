const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// const uri = process.env.MONGODB_CONNECTION
const uri = 'mongodb://127.0.0.1:27017/rfid'
const port = process.env.PORT || 8000;

// MongoDB
mongoose.connect(uri)
    .then(() => {
        console.log("Connected to MongoDB Atlas");
    })
    .catch(err => {
        console.log(err);
    });
    
// Express
app.use(cors());
app.use(express.json());

const studentsRouter = require('./routes/students');
const sectionRouter = require('./routes/sections');
const attendanceRouter = require('./routes/attendance');

app.use('/students', studentsRouter);
app.use('/sections', sectionRouter);
app.use('/attendance', attendanceRouter);

app.listen(port, () => {
    console.log(`Server is listening to http://localhost:${port}`);
});

