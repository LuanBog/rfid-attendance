const router = require('express').Router();
let Student = require('../models/Student.model');

router.route('/in/:id').get((req, res) => {
    Student.findById(req.params.id)
        .then(student => {
            const date = new Date();
            const time = date.getDay() + "/" + date.getMonth()  + "/" + date.getFullYear() + " @ "  + date.getHours() + ":"  + date.getMinutes() + ":" + date.getSeconds();

            const data = {
                "time-in": time,
                "time-out": ''
            };

            console.log(data);

            student.attendance.push(data);  

            student.save()
            .then(() => { 
                console.log(`[Student] ${student.fullName} got updated`);
                res.json(student);
            })
            .catch(err => res.status(400).json(`Error ${err}`));
        });
});

module.exports = router;