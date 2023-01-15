const router = require('express').Router();
let Section = require('../models/Section.model');

router.route('/').get((req, res) => {
    Section.find()
        .then(sections => {
            console.log("[Section] Got a request to get data");
            res.json(sections);
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
    console.log(req);

    const name = req.body.name;
    const adviserName = req.body.adviserName;
    const gradeLevel = Number(req.body.gradeLevel);
    const students = req.body.students;

    const newSection = new Section({ name, adviserName, gradeLevel, students });

    newSection.save()
        .then(() => {
            console.log(`[Section] Added a new section: ${name}`);
            res.json(newSection);
        })
        .catch(err => res.status(400).json(`Error ${err}`));
});

router.route('/:id').get((req, res) => {
    Section.findById(req.params.id)
        .then(section => {
            console.log(`[Section] Got a request to find section with id of ${req.params.id}`);
            res.json(section);
        })
        .catch(err => res.status(400).json(`Error ${err}`));
});
router.route('/:id').delete((req, res) => {
    Section.findByIdAndDelete(req.params.id)
        .then(() => {
            console.log(`[Section] Deleted section with id of ${req.params.id}`);
            res.json('Section deleted')
        })
        .catch(err => res.status(400).json(`Error ${err}`));
});
router.route('/update/:id').post((req, res) => {
    Section.findById(req.params.id)
        .then(section => {
            section.name = req.body.name;
            section.adviserName = req.body.adviserName;
            section.gradeLevel = Number(req.body.gradeLevel);
            section.students = req.body.students;

            section.save()
                .then(() => { 
                    console.log(`[Section] ${section.name} got updated`);
                    res.json('Section updated');
                })
                .catch(err => res.status(400).json(`Error ${err}`));
        })
        .catch(err => res.status(400).json(`Error ${err}`));
});

module.exports = router;