const router = require('express').Router();
let Student = require('../models/Student.model');

router.route('/in/:id').get((req, res) => {
    Student.findById(req.params.id)
        .then(student => {
            const date = new Date();
            const time = date.getDay() + "/" + date.getMonth()  + "/" + date.getFullYear() + " @ "  + date.getHours() + ":"  + date.getMinutes() + ":" + date.getSeconds();

            const data = {
                "timeIn": time,
                "timeOut": ''
            };

            student.attendance.push(data);  

            student.save()
            .then(() => { 
                console.log(`[Attendance] ${student.fullName} just timed in at ${time}`);
                res.json(data);
            })
            .catch(err => res.status(400).json(`Error ${err}`));
        });
});

router.route('/out/:id').get((req, res) => {
    Student.findById(req.params.id)
        .then(student => {
            const date = new Date();
            const time = date.getDay() + "/" + date.getMonth()  + "/" + date.getFullYear() + " @ "  + date.getHours() + ":"  + date.getMinutes() + ":" + date.getSeconds();

            const latestAttendance = student.attendance[student.attendance.length - 1];

            const data = {
                "timeIn": latestAttendance.timeIn,
                "timeOut": time
            };

            student.attendance[student.attendance.length - 1] = data;

            student.save()
            .then(() => { 
                console.log(`[Attendance] ${student.fullName} just timed out at ${time}`);
                res.json(data);
            })
            .catch(err => res.status(400).json(`Error ${err}`));
        });
});

module.exports = router;