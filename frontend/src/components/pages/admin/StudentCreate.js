import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentCreate = () => {
  const navigate = useNavigate();

  const [newStudent, setNewStudent] = useState({
    fullName: "",
    lrn: "",
    address: "",
    contactNumber: "",
    birthday: "",
    guardianName: "",
    adviserName: "",
    section: ""
  });
  const [error, setError] = useState("");

  const submitHandler = e => {
    e.preventDefault();

    let fieldWithoutData = [];

    Object.entries(newStudent).forEach(data => {
      if(data[1].trim() === '')
        fieldWithoutData.push(data[0]);
    });

    if(fieldWithoutData.length !== 0) {
      setError(fieldWithoutData.join(', ') + ' has no input');

      return;
    }

    setError('');

    axios.post('http://localhost:8000/students/add', newStudent)
      .then(() => {
        console.log("Created!");
        navigate('/studentview');
      })
      .catch(err => {
        setError(err)
      });
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <h1>CREATE NEW STUDENT</h1>
        <div className="error">{error}</div>

        <div className="form-group">
          <label htmlFor="full-name">Full Name:</label>
          <input type="text" name="full-name" onChange={e => setNewStudent({...newStudent, fullName: e.target.value})} value={newStudent.name} />
        </div>

        <div className="form-group">
          <label htmlFor="lrn">LRN:</label>
          <input type="number" name="lrn" onChange={e => setNewStudent({...newStudent, lrn: e.target.value})} value={newStudent.lrn} />
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
          <label htmlFor="guardian-name">Guardian Name:</label>
          <input type="text" name="guardian-name" onChange={e => setNewStudent({...newStudent, guardianName: e.target.value})} value={newStudent.guardianName} />
        </div>
        
        <div className="form-group">
          <label htmlFor="adviser-name">Adviser Name:</label>
          <input type="text" name="adviser-name" onChange={e => setNewStudent({...newStudent, adviserName: e.target.value})} value={newStudent.adviserName} />
        </div>

        {/* Need to be changed in the future */}
        <div className="form-group">
          <label htmlFor="section">Section:</label>
          <input type="text" name="section" onChange={e => setNewStudent({...newStudent, section: e.target.value})} value={newStudent.section} />
        </div>

        <input type="submit" value="Create" />
      </form>
    </>
  );
}

export default StudentCreate;
