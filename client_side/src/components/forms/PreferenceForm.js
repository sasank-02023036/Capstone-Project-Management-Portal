import React, { useState } from "react";
import axios from "axios";
import "../../styles/preference-form.css";

function PreferenceForm({ course }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleProjectSelect = (projectId) => {
    setSelectedProject(projectId);
  };

  const handlePreferenceAdd = () => {
    if (selectedProject && selectedPreferences.length < 4) {
      setSelectedPreferences([...selectedPreferences, selectedProject]);
      setSelectedProject(null);
    }
  };

  const handlePreferenceRemove = (projectId) => {
    setSelectedPreferences(selectedPreferences.filter((pref) => pref !== projectId));
  };

  const handleSubmit = async () => {
    if (selectedPreferences.length !== 4) {
      setError("Please select exactly 4 preferences.");
      return;
    }

    // Handle submitting the selected preferences to the server
    try {
      const response = await axios.put("/api/preference", {
        course: course._id,
        projectPreferences: selectedPreferences.map((preference, index) => ({
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

  return (
    <div>
      <button className="set-preferences" onClick={handleOpen}>
        Set Preferences
      </button>

      {open && (
        <div className="set-preferences-modal-wrapper">
          <div className="set-preferences-popup-content">
            <div className="set-preferences-top">
              <div className="set-preferences-title">
                <span>Set Preferences</span>
              </div>
              <div className="set-preferences-close-wrapper">
                <div className="set-preferences-close" onClick={handleClose}>
                  <div className="set-preferences-close-button">
                    <svg
                      className="cSvg"
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 14 14"
                    >
                      <path
                        id="ic_close_24px"
                        d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z"
                        transform="translate(-5 -5)"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="preference-form">
              <div className="set-preferences-dropdown">
                <select
                  value={selectedProject || ""}
                  onChange={(event) => setSelectedProject(event.target.value)}
                  className="preference-select"
                >
                  <option value="">Select a project</option>
                  {course.projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.name}
                    </option>
                  ))}
                </select>
                <button onClick={handlePreferenceAdd} className="add-preference-button">
                  Add Preference
                </button>
              </div>

              <div className="selected-preferences">
                <p>Selected Preferences:</p>
                {selectedPreferences.map((pref) => (
                  <div key={pref}>
                    <span>{pref}</span>
                    <button
                      onClick={() => handlePreferenceRemove(pref)}
                      className="remove-preference-button"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {error && <p className="error-message">{error}</p>}
            </div>

            <div className="set-preferences-button-group">
              <button onClick={handleSubmit} className="set-preferences-save-button">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PreferenceForm;
