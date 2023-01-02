import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';

const SectionBlock = ({ section, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <tr>
      <td>{section.name}</td>
      <td>{section.gradeLevel}</td>
      <td>{section.students.length}</td>

      {/* Call to Actions */}
      <td><button onClick={() => navigate(`/sectionedit/${section._id}`)}>Edit</button></td>
      <td><button onClick={() => handleDelete(section._id)}>Delete</button></td>
    </tr>
  );
}

const SectionView = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/sections')
      .then(res => {
        setSections(res.data);
        console.log(sections);
      })
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {    
    axios.delete(`http://localhost:8000/sections/${id}`)
      .then(() => {
        setSections(sections.filter(section => section._id !== id));

        console.log(`Deleted section with the id of ${id}`);
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <>        
      <h1>SECTION VIEW</h1>

      {(sections.length !== 0)
        ? (
          <>
            <table>

              <tr>
                <th>Name</th>
                <th>Grade Level</th>
                <th>Students</th>
              </tr>

              
              {sections.map(section => (
                <SectionBlock section={section} handleDelete={handleDelete} key={section._id} />
              ))}
            </table>
          </>
        )
        : (
          <span className="no-section">No section found!</span>
        )}

      <Link to="/sectioncreate"><button>Create</button></Link>
    </>
  );
}

export default SectionView;
