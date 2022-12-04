const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    fullName: { type: String, required: true },
    birthday: { type: Date, required: true },
    address: { type: String, required: true },
    contactNumber: { type: Number, required: true },
    section: { type: String, required: true },
    adviserName: { type: String, required: true }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
