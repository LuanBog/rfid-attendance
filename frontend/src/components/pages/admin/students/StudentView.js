import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';

const StudentBlock = ({ student, handleDelete }) => {
  const birthdayObject = new Date(student.birthday);

  const navigate = useNavigate();

  return (
    <tr>
      <td>{student.fullName}</td>
      <td>{student.lrn}</td>
      <td>{student.address}</td>
      <td>{student.contactNumber}</td>
      <td>{birthdayObject.toLocaleDateString("en-US")}</td>
      <td>{student.guardianName}</td>
      <td>{student.adviserName}</td>
      <td>{student.section}</td>
      <td>{student._id}</td>

      {/* Call to Actions */}
      <td><button onClick={() => navigate(`/studentedit/${student._id}`)}>Edit</button></td>
      <td><button onClick={() => handleDelete(student._id)}>Delete</button></td>
    </tr>
  );
}

const StudentView = () => {
  const [students, setStudents] = useState([]);
  const [sections, setSections] = useState([]);

  const removeStudentFromSection = (studentUID, section) => {
    let sectionData = sections.filter(sec => sec.name === section)[0];
    
    sectionData.students = sectionData.students.filter(id => id !== studentUID);

    axios.post(`http://localhost:8000/sections/update/${sectionData._id}`, sectionData)
      .catch(err => {
        console.error(err);
      });
  }

  useEffect(() => {
    axios.get('http://localhost:8000/sections')
    .then(res => {
      setSections(res.data);
    })
    .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/students')
      .then(res => {
        setStudents(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {    
    axios.delete(`http://localhost:8000/students/${id}`)
      .then(res => {
        removeStudentFromSection(id, res.data.section);
        setStudents(students.filter(student => student._id !== id));
      
        console.log(`Deleted student with the id of ${id}`);
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <>        
      <h1>STUDENT VIEW</h1>

      {(students.length !== 0)
        ? (
          <>
            <table>

              <tr>
                <th>Name</th>
                <th>LRN</th>
                <th>Address</th>
                <th>Contact No.</th>
                <th>Birthday</th>
                <th>Guardian</th>
                <th>Adviser</th>
                <th>Section</th>
                <th>UID</th>
              </tr>

              
              {students.map(student => (
                <StudentBlock student={student} handleDelete={handleDelete} key={student._id} />
              ))}
            </table>
          </>
        )
        : (
          <span className="no-student">No student found!</span>
        )}

      <Link to="/studentcreate"><button>Create</button></Link>
    </>
  );
}

export default StudentView;
