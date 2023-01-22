import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentCreate = () => {
  const navigate = useNavigate();

  const [newStudent, setNewStudent] = useState({
    fullName: "",
    lrn: "",
    uid: "",
    address: "",
    contactNumber: "",
    birthday: "",
    sex: "Male",
    guardianName: "",
    section: "",
    adviserName: ""
  });
  const [sections, setSections] = useState([]);
  const [error, setError] = useState("");
  const adviserNameRef = useRef();

  // Sets the sections
  useEffect(() => {
    axios.get('http://localhost:8000/sections')
      .then(res => {
        setSections(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const addStudentToSection = (student, section) => {
    const studentUID = student._id;
    let sectionData = sections.filter(sec => sec.name === section)[0];

    sectionData.students.push(studentUID);

    axios.post(`http://localhost:8000/sections/update/${sectionData._id}`, sectionData)
      .catch(err => {
        console.error(err);
      });
  }

  const submitHandler = e => {
    e.preventDefault();

    let fieldWithoutData = [];

    Object.entries(newStudent).forEach(data => {
      if(data[1].trim() === '' || data[1].trim() === 'None')
        fieldWithoutData.push(data[0]);
    });

    if(fieldWithoutData.length !== 0) {
      setError(fieldWithoutData.join(', ') + ' has no input');

      return;
    }

    setError('');

    // Adds student to the main database
    axios.post('http://localhost:8000/students/add', newStudent)
      .then((res) => {
        addStudentToSection(res.data, newStudent.section);
        
        console.log("Created!");
        navigate('/studentview');
      })
      .catch(err => {
        setError(err)
      });
  }

  useEffect(() => {
    const sectionData = sections.filter(sec => sec.name === newStudent.section)[0];

    if(sectionData)
      newStudent.adviserName = sectionData.adviserName;
    else
      newStudent.adviserName = "";

    adviserNameRef.current.value = newStudent.adviserName;
  }, [newStudent.section]);

  return (
    <form onSubmit={submitHandler}>
      <h1>CREATE NEW STUDENT</h1>
      <div className="error">{error}</div>

      <div className="form-group">
        <label htmlFor="full-name">Full Name:</label>
        <input type="text" name="full-name" onChange={e => setNewStudent({...newStudent, fullName: e.target.value})} value={newStudent.fullName} />
      </div>

      <div className="form-group">
        <label htmlFor="lrn">LRN:</label>
        <input type="number" name="lrn" onChange={e => setNewStudent({...newStudent, lrn: e.target.value})} value={newStudent.lrn} />
      </div>

      <div className="form-group">
        <label htmlFor="uid">UID:</label>
        <input type="text" name="uid" onChange={e => setNewStudent({...newStudent, uid: e.target.value})} value={newStudent.uid} />
      </div>

      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input type="text" name="address" onChange={e => setNewStudent({...newStudent, address: e.target.value})} value={newStudent.address} />
      </div>

      <div className="form-group">
        <label htmlFor="contact-number">Contact Number:</label>
        <input type="number" name="contact-number" onChange={e => setNewStudent({...newStudent, contactNumber: e.target.value})} value={newStudent.contactNumber} />
      </div>

      <div className="form-group">
        <label htmlFor="birthday">Birthday:</label>
        <input type="date" name="birthday" onChange={e => setNewStudent({...newStudent, birthday: e.target.value})} value={newStudent.birthday} />
      </div>
    
      <div className="form-group">
        <label htmlFor="sex">Sex:</label>
        <select name="section" onChange={e => setNewStudent({...newStudent, sex: e.target.value})} value={newStudent.sex}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="guardian-name">Guardian Name:</label>
        <input type="text" name="guardian-name" onChange={e => setNewStudent({...newStudent, guardianName: e.target.value})} value={newStudent.guardianName} />
      </div>

      <div className="form-group">
        <label htmlFor="section">Section:</label>
        <select name="section" onChange={e => setNewStudent({...newStudent, section: e.target.value})} value={newStudent.section}>
          <option value="None">None</option>

          {sections.map(section => (
            <option value={section.name} key={section.name}>{section.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="adviser-name">Adviser Name:</label>
        <input type="text" name="adviser-name" ref={adviserNameRef} readOnly />
      </div>

      <input type="submit" value="Create" />
    </form>
  );
}

export default StudentCreate;
