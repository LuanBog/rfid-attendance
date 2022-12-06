const router = require('express').Router();
let Student = require('../models/Student.model');

router.route('/').get((req, res) => {
    Student.find()
        .then(students => res.json(students))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
    console.log(req);

    const fullName = req.body.fullName;
    const birthday = Date.parse(req.body.birthday);
    const address = req.body.address;
    const contactNumber = Number(req.body.contactNumber);
    const section = req.body.section;
    const guardianName = req.body.adviserName;
    const adviserName = req.body.adviserName;

    const newStudent = new Student({ fullName, birthday, address, contactNumber, section, guardianName, adviserName });

    newStudent.save()
        .then(() => res.json(newStudent))
        .catch(err => res.status(400).json(`Error ${err}`));
});

router.route('/:id').get((req, res) => {
    Student.findById(req.params.id)
        .then(student => res.json(student))
        .catch(err => res.status(400).json(`Error ${err}`));
});
router.route('/:id').delete((req, res) => {
    Student.findByIdAndDelete(req.params.id)
        .then(() => res.json('Student deleted'))
        .catch(err => res.status(400).json(`Error ${err}`));
});
router.route('/update/:id').post((req, res) => {
    Student.findById(req.params.id)
        .then(student => {
            student.fullName = req.body.fullName;
            student.birthday = Date.parse(req.body.birthday);
            student.address = req.body.address;
            student.contactNumber = Number(req.body.contactNumber);
            student.section = req.body.section;
            student.guardianName = req.body.guardianName;
            student.adviserName = req.body.adviserName;

            student.save()
                .then(() => res.json('Student updated'))
                .catch(err => res.status(400).json(`Error ${err}`));
        })
        .catch(err => res.status(400).json(`Error ${err}`));;
});

module.exports = router;