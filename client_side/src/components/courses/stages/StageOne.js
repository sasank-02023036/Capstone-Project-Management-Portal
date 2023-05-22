import React, { useState } from "react";
import "../../../styles/StageOne.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StageOne({ data, setData }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [maxPreferences, setMaxPreferences] = useState("");
  const [numStudentsPerProject, setNumStudentsPerProject] = useState("");
  const [deadline, setDeadline] = useState("");


    const [subjectIDFocused, setSubjectIDFocused] = useState(false);
    const [subjectIDHasValue, setSubjectIDHasValue] = useState(false);

    const [studentIDFocused, setStudentIDFocused] = useState(false);
    const [studentIDHasValue, setstudentIDHasValue] = useState(false);

    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);


    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        setHasValue(e.target.value !== '');
    };

  const handleSubmit = async () => {
    // Save data and close the form
    if (!data.projects) {
      console.log("Please add projects into the course");
      return;
    }

    if (maxPreferences && numStudentsPerProject && deadline) {
      try {
        const response = await axios.post(
          "/api/courses/assign",
          {
            name: data.name,
            maxPreferences: maxPreferences,
            maxStudentsPerProject: numStudentsPerProject,
            preferencesDeadline: deadline,
          },
          { headers: { "Content-Type": "application/json" } }
        );
        setData(response.data);
        handleClose();
      } catch (err) {
        switch (err.response.status) {
          case 401:
            navigate("/signin", { replace: true });
            handleClose();
            break;
          case 400:
            console.log("course couldnt be found");
            break;
          case 500:
            console.log("internal error");
            break;
        }
      }
    } else {
      console.log("missing course details");
    }
  };

  const handleClose = () => {
    // Reset form data and close the form
    setMaxPreferences("");
    setNumStudentsPerProject("");
    setDeadline("");
    setOpen(false);
  };

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Form</button>



      {open && (



          <div className="form-popup-wrapper"> 


            <div className="form-container">


              <div className='ep-top'>
                                
                                {/* Title goes here */}
                        
                                  <div className='ep-title'> 
                                      <span class='ep-title-01'>Enable Preferences</span>
                                  </div>
                  

                                {/* Close icon goes here */}
                                <div className="ep-close-wrapper">
                                
                                    <div className='ep-close' onClick={handleClose}>
                                        <div className='ep-close-button'> 
                                          <svg className='cSvg' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                                              <path id="ic_close_24px" d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)"/>
                                          </svg>
                                        </div>
                                    </div>

                                </div>

              </div>


              <div className='ep-proj'> 

                <label htmlFor="maxPreferences" className={`ep-proj-label ${subjectIDFocused  || subjectIDHasValue ? 'focused' : ''}`}>Max Preferences for a Student</label>
                <input
                  className="ep-proj-input"
                  type="text"
                  id="maxPreferences"
                  value={maxPreferences}
                  onChange={(e) => setMaxPreferences(e.target.value)}
                  required
                  onFocus={() => setSubjectIDFocused(true)}
                  onBlur={(e) => {
                                    setSubjectIDFocused(false);
                                    setSubjectIDHasValue(e.target.value !== '');
                                  }}
                />

            </div>



              {/*<label htmlFor="maxPreferences">
                Max Preferences for a Student:
                <input
                  type="text"
                  id="maxPreferences"
                  value={maxPreferences}
                  onChange={(e) => setMaxPreferences(e.target.value)}
                />
                                </label>*/}



              <div className='ep-stud'> 

                  <label htmlFor="numStudentsPerProject" className={`ep-stud-label ${studentIDFocused || studentIDHasValue ? 'focused' : ''}`}>Maximum Number of Students per Project</label>
                  <input
                    className="ep-stud-input"
                    type="text"
                    id="numStudentsPerProject"
                    value={numStudentsPerProject}
                    onChange={(e) => setNumStudentsPerProject(e.target.value)}
                    required
                    onFocus={() => setStudentIDFocused(true)}
                    onBlur={(e) => {
                                      setSubjectIDFocused(false);
                                      setstudentIDHasValue(e.target.value !== '');
                                    }}
                  />

              </div>





              {/*<label htmlFor="numStudentsPerProject">
                Maximum Number of Students per Project:
                <input
                  type="text"
                  id="numStudentsPerProject"
                  value={numStudentsPerProject}
                  onChange={(e) => setNumStudentsPerProject(e.target.value)}
                />
                                  </label>*/}


              <div className='ep-deadline'> 

              <label htmlFor="deadline" className={`ep-deadline-label ${isFocused || hasValue ? 'focused' : ''}`}>Expected Preferences Deadline</label>
              <input
                type="date"
                id="deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
                className={`ep-deadline-input ${isFocused || hasValue ? 'focused' : ''}`}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />

            </div>


              {/*<label htmlFor="deadline">
                Deadline:
                <input
                  type="date"
                  id="deadline"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </label>*/}

                  <div className="ep-buttons">
                    <button className="ep-submit-button" onClick={handleSubmit}>Save</button>
                  </div>

            
                 </div>
            </div>

      )}




    </div>
  );
}
