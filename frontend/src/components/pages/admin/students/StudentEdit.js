import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const StudentEdit = () => {
  const [student, setStudent] = useState({
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
  const [initialSection, setInitialSection] = useState('');
  const [fullName, setFullName] = useState(""); // I put this here because we don't want to change the name in the EDITING <NAME>
  const [error, setError] = useState();

  const navigate = useNavigate();
  const { id } = useParams();

  const adviserNameRef = useRef();

  const moveStudentFromSection = (studentUID, initialSection, newSection) => {
    if(initialSection === newSection) return;

    let initialSectionData = sections.filter(sec => sec.name === initialSection)[0];
    let newSectionData = sections.filter(sec => sec.name === newSection)[0];

    initialSectionData.students = initialSectionData.students.filter(id => id !== studentUID);
    newSectionData.students.push(studentUID);

    axios.post(`http://localhost:8000/sections/update/${initialSectionData._id}`, initialSectionData)
    axios.post(`http://localhost:8000/sections/update/${newSectionData._id}`, newSectionData)
  }

  // Sets the sections
  useEffect(() => {
    axios.get('http://localhost:8000/sections')
      .then(res => {
        setSections(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    let mounted = true;
    
    axios.get(`http://localhost:8000/students/${id}`)
      .then(res => { 
        if(mounted) {
          setStudent(res.data);
          setFullName(res.data.fullName);
          setInitialSection(res.data.section);
        }
      })
      .catch(err => console.error(`Error: ${err}`));

      return () => {
        mounted = false
      };
  }, [id]);

  const handleUpdate = e => {
    e.preventDefault();

    axios.post(`http://localhost:8000/students/update/${student._id}`, student)
    .then(() => {
      moveStudentFromSection(student._id, initialSection, student.section);
      navigate(`/studentview`);
    })
    .catch(err => {
      console.error(err);
    });
  }

  useEffect(() => {
    const sectionData = sections.filter(sec => sec.name === student.section)[0];

    if(sectionData)
      student.adviserName = sectionData.adviserName;
    else
      student.adviserName = "";

    adviserNameRef.current.value = student.adviserName;
  }, [student.section]);

  return (
    <>
      {student !== undefined ? (
        <>
          <form onSubmit={handleUpdate}>
            <h1>EDITING {fullName}</h1>
            <div className="error">{error}</div>
    
            <div className="form-group">
              <label htmlFor="full-name">Full Name:</label>
              <input type="text" name="full-name" onChange={e => setStudent({...student, fullName: e.target.value})} value={student.fullName} />
            </div>
    
            <div className="form-group">
              <label htmlFor="lrn">LRN:</label>
              <input type="number" name="lrn" onChange={e => setStudent({...student, lrn: e.target.value})} value={student.lrn} />
            </div>

            <div className="form-group">
              <label htmlFor="uid">UID:</label>
              <input type="text" name="uid" onChange={e => setStudent({...student, uid: e.target.value})} value={student.uid} />
            </div>
    
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input type="text" name="address" onChange={e => setStudent({...student, address: e.target.value})} value={student.address} />
            </div>
    
            <div className="form-group">
              <label htmlFor="contact-number">Contact Number:</label>
              <input type="number" name="contact-number" onChange={e => setStudent({...student, contactNumber: e.target.value})} value={student.contactNumber} />
            </div>
    
            <div className="form-group">
              <label htmlFor="birthday">Birthday:</label>
              <input type="date" name="birthday" onChange={e => setStudent({...student, birthday: e.target.value})} value={student.birthday} />
            </div>

            <div className="form-group">
              <label htmlFor="sex">Sex:</label>
              <select name="section" onChange={e => setStudent({...student, sex: e.target.value})} value={student.sex}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="guardian-name">Guardian Name:</label>
              <input type="text" name="guardian-name" onChange={e => setStudent({...student, guardianName: e.target.value})} value={student.guardianName} />
            </div>
            
            <div className="form-group">
              <label htmlFor="section">Section:</label>
              {/* <input type="text" name="section" onChange={e => setNewStudent({...newStudent, section: e.target.value})} value={newStudent.section} /> */}
              <select name="section" onChange={e => setStudent({...student, section: e.target.value})} value={student.section}>
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
    
            <input type="submit" value="Update" />
          </form>
        </>
      ) : 'Loading...'}
    </>
  );

}

export default StudentEdit;
