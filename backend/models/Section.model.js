const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
    name: { type: String, required: true },
    adviserName: { type: String, required: true },
    gradeLevel: { type: Number, required: true },
    students: { type: Array, required: true },
});

const Section = mongoose.model("Section", sectionSchema);

module.exports = Section;
