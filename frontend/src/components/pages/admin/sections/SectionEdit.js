import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SectionEdit = () => {
  const [section, setSection] = useState({
    name: "",
    adviserName: "",
    gradeLevel: "",
    students: []
  });
  const [name, setName] = useState(""); // I put this here because we don't want to change the name in the EDITING <NAME>
  const [error, setError] = useState();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    let mounted = true;
    
    axios.get(`http://localhost:8000/sections/${id}`)
      .then(res => { 
        if(mounted) {
          setSection(res.data);
          setName(res.data.name);
        }
      })
      .catch(err => console.error(`Error: ${err}`));

      return () => {
        mounted = false
      };
  }, [id]);

  const handleUpdate = e => {
    e.preventDefault();

    axios.post(`http://localhost:8000/sections/update/${section._id}`, section)
    .then(() => {
      navigate(`/sectionview`);
    })
    .catch(err => {
      console.error(err);
    });
  }

  return (
    <>
      {section !== undefined ? (
        <>
          <form onSubmit={handleUpdate}>
            <h1>EDITING {name}</h1>
            <div className="error">{error}</div>

            <div className="form-group">
              <label htmlFor="name">Section Name:</label>
              <input type="text" name="name" onChange={e => setSection({...section, name: e.target.value})} value={section.name} />
            </div>

            <div className="form-group">
              <label htmlFor="adviser-name">Adviser Name:</label>
              <input type="text" name="adviser-name" onChange={e => setSection({...section, adviserName: e.target.value})} value={section.adviserName} />
            </div>

            <div className="form-group">
              <label htmlFor="grade-level">Grade Level:</label>
              <input type="number" name="grade-level" onChange={e => setSection({...section, gradeLevel: e.target.value})} value={section.gradeLevel} />
            </div>
    
            <input type="submit" value="Update" />
          </form>
        </>
      ) : 'Loading...'}
    </>
  );
}

export default SectionEdit;
