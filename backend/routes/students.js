const router = require('express').Router();
let Student = require('../models/Student.model');

router.route('/').get((req, res) => {
    Student.find()
        .then(students => {
            console.log("[Student] Got a request to get data");
            res.json(students);
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
    console.log(req);

    const fullName = req.body.fullName;
    const sex = req.body.sex;
    const birthday = Date.parse(req.body.birthday);
    const lrn = Number(req.body.lrn);
    const uid = req.body.uid;
    const address = req.body.address;
    const contactNumber = Number(req.body.contactNumber);
    const section = req.body.section;
    const guardianName = req.body.guardianName;
    const adviserName = req.body.adviserName;

    const newStudent = new Student({ fullName, sex, birthday, lrn, uid, address, contactNumber, section, guardianName, adviserName });

    newStudent.save()
        .then(() => {
            console.log(`[Student] Added a new student: ${fullName}`);
            res.json(newStudent);
        })
        .catch(err => res.status(400).json(`Error ${err}`));
});

router.route('/:id').get((req, res) => {
    Student.findById(req.params.id)
        .then(student => {
            console.log(`[Student] Got a request to find student with id of ${req.params.id}`);
            res.json(student);
        })
        .catch(err => res.status(400).json(`Error ${err}`));
});
router.route('/:id').delete((req, res) => {
    Student.findByIdAndDelete(req.params.id)
        .then(student => {
            console.log(`[Student] Deleted student with id of ${req.params.id}`);
            res.json(student);
        })
        .catch(err => res.status(400).json(`Error ${err}`));
});
router.route('/update/:id').post((req, res) => {
    Student.findById(req.params.id)
        .then(student => {
            student.fullName = req.body.fullName;
            student.sex = req.body.sex;
            student.birthday = Date.parse(req.body.birthday);
            student.lrn = Number(req.body.lrn);
            student.uid = req.body.uid;
            student.address = req.body.address;
            student.contactNumber = Number(req.body.contactNumber);
            student.section = req.body.section;
            student.guardianName = req.body.guardianName;
            student.adviserName = req.body.adviserName;

            student.save()
                .then(() => { 
                    console.log(`[Student] ${student.fullName} got updated`);
                    res.json(student);
                })
                .catch(err => res.status(400).json(`Error ${err}`));
        })
        .catch(err => res.status(400).json(`Error ${err}`));
});

module.exports = router;