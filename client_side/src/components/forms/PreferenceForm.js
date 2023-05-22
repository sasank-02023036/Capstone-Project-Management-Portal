import React, { useState } from "react";
import axios from "axios";
import "../../styles/preference-form.css";

function PreferenceForm({ course }) {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  }
  const [preferences, setPreferences] = useState(
    Array.from({ length: course.maxPreferences }, () => "")
  );
  const [error, setError] = useState(null);

  const hasDuplicates = (array) => {
    return new Set(array).size !== array.length;
  };

  const handleChange = (event, index) => {
    const value = event.target.value;
    setPreferences((prevPreferences) => [
      ...prevPreferences.slice(0, index),
      value,
      ...prevPreferences.slice(index + 1),
    ]);
  };

  const getAvailableProjects = (index) => {
    return course.projects.filter((project, projectIndex) => {
      return !preferences.some((preference, prefIndex) => {
        return prefIndex !== index && preference === project._id;
      });
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (hasDuplicates(preferences)) {
      setError("Please ensure all selected projects are unique.");
      return;
    }

    try {
      const response = await axios.put("/api/preference", {
        course: course._id,
        projectPreferences: preferences.map((preference, index) => ({
            project: preference,
            rank: index + 1,
        })),
      });
      console.log(response.data);
      setOpen(false);
    } catch (error) {
      console.error("Error submitting preferences:", error);
    }
  };

  if (course.stage !== 2) {
    return null;
  }

  return (
    <div>

      <button className="set-preferences" onClick={() => setOpen(!open)}>Set Preferences</button>
      
      {open && (

        <form onSubmit={handleSubmit}>
          <div className='set-preferences-modal-wrapper'> 

<div className="set-preferences-popup-content">

      <div className="set-preferences-top"> 

          <div className='set-preferences-title'>
                  <span>Set Preferences</span>
            </div>

            {/* Close icon goes here */}
            <div className='set-preferences-close-wrapper'>
                    <div className='set-preferences-close' onClick={onClose}>
                      <div className='set-preferences-close-button'> 
                            <svg className='cSvg' xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 14 14">
                                <path id="ic_close_24px" d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)"/>
                            </svg>
                      </div>
                    </div>
            </div>
      </div>

      <div className="preference-form">

      
      
          {preferences.map((preference, index) => (

          

              <div key={index} className="preference-field">
                    <label className="preference-label" htmlFor={`preference${index + 1}`}>
                      Preference {index + 1}:
                    </label>

                    <select
                      name={`preference${index + 1}`}
                      value={preference}
                      onChange={(event) => handleChange(event, index)}
                      className="preference-select"
                    >
                      <option className="option" value="">Select a project</option>
                      {getAvailableProjects(index).map((project) => (
                        <option key={project._id} value={project._id}>
                          {project.name}
                        </option>

                      ))}
                    </select>
                    <br />
              </div>


          ))}
          {error && <p className="error-message">{error}</p>}


          </div>


          <div className="set-preferences-button-group">
                      <button className="set-preferences-save-button" type="submit">Submit</button>
              </div>

              </div>
          
          </div>
          
        </form>
      )}
    </div>
  );
}

export default PreferenceForm;
