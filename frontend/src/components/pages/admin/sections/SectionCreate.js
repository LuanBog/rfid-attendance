import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SectionCreate = () => {
  const navigate = useNavigate();

  const [newSection, setNewSection] = useState({
    name: "",
    adviserName: "",
    gradeLevel: "",
    students: []
  });
  const [error, setError] = useState("");

  const submitHandler = e => {
    e.preventDefault();

    let fieldWithoutData = [];

    Object.entries(newSection).forEach(data => {
      if(data[0] !== 'students')
        if(data[1].trim() === '')
          fieldWithoutData.push(data[0]);
    });

    if(fieldWithoutData.length !== 0) {
      setError(fieldWithoutData.join(', ') + ' has no input');

      return;
    }

    setError('');

    axios.post('http://localhost:8000/sections/add', newSection)
      .then(() => {
        console.log("Created!");
        navigate('/sectionview');
      })
      .catch(err => {
        setError(err)
      });
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <h1>CREATE NEW SECTION</h1>
        <div className="error">{error}</div>

        <div className="form-group">
          <label htmlFor="name">Section Name:</label>
          <input type="text" name="name" onChange={e => setNewSection({...newSection, name: e.target.value})} value={newSection.name} />
        </div>

        <div className="form-group">
          <label htmlFor="adviser-name">Adviser Name:</label>
          <input type="text" name="adviser-name" onChange={e => setNewSection({...newSection, adviserName: e.target.value})} value={newSection.adviserName} />
        </div>

        <div className="form-group">
          <label htmlFor="grade-level">Grade Level:</label>
          <input type="number" name="grade-level" onChange={e => setNewSection({...newSection, gradeLevel: e.target.value})} value={newSection.gradeLevel} />
        </div>

        <input type="submit" value="Create" />
      </form>
    </>
  );
}

export default SectionCreate;
