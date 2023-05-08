import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function StageTwo({data , setData}) {
    const navigate = useNavigate();
    const assignedProjects = data.assignedProject;
    const students = data.users;

    const [selectedStudent, setSelectedStudent] = React.useState(null);
    const [preferences,setPreferences] = React.useState([]);

    React.useEffect(()=>{
        async function getPreferences() {
            try {
                const response = await axios.get(`/preference/${data.name}`);
                console.log(response.data);
                setPreferences(response.data);
            } catch (err) {
                console.log({err});
            }
        }
        getPreferences();
    },[data]);


    const assignedProjectToStudent = (userId) => {
        if (!Array.isArray(assignedProjects)) {
            return '-';
        }
        const assignedProject = assignedProjects.find((ap) => ap.student.toString() === userId.toString());
        return assignedProject ? assignedProject.project.name : '-';
    };
  
    
    const isPreferenceSet = (userId) => {
        if (!Array.isArray(preferences)) {
            return 'NO';
        }
        const studentPreferences = preferences.find(
          (preference) => preference.student._id === userId
        );
        if (studentPreferences && studentPreferences.projectPreferences.length > 0) {
          return 'Yes';
        }
        return 'No';
    };

    const isAssignButtonEnabled = (userId) => {
        if (!Array.isArray(preferences)) {
            return false;
        }

        const studentPreferences = preferences.find(
          (preference) => preference.student._id === userId
        );
        if (studentPreferences && studentPreferences.projectPreferences.length > 0) {
          return true;
        }
        return false;
    };

    const renderPopup = () => {
        if (!preferences) {
            return <div></div>
        }
        const selectedStudentPreferences = preferences.find((preference) => preference.student._id === selectedStudent)?.projectPreferences;
        return (
          <div className="popup">
            <div className="popup-content">
              <h3>Assign Project to {students.find((student) => student._id === selectedStudent)?.name}</h3>
              {selectedStudentPreferences && selectedStudentPreferences.map((preference) => (
                <div key={preference.project._id}>
                  <p>{preference.project.name}</p>
                  <p>Rank: {preference.rank}</p>
                </div>
              ))}
              <div>
                <select name="project" id="project-select">
                  {data.projects.map((project) => (
                    <option key={project._id} value={project._id}>{project.name}</option>
                  ))}
                </select>
                <button onClick={() => handleSavePopup(document.getElementById("project-select").value)}>Save</button>
                <button onClick={handleClose}>Cancel</button>
              </div>
            </div>
          </div>
        )
      }

    const handleClick = (studentId) =>{
        setSelectedStudent(studentId);
        {studentId && renderPopup()}
    }

    const handleSavePopup = (projectId) => {
        // Do something with the selected project and studentId
        console.log(projectId, selectedStudent);
        setSelectedStudent(null);
      }

    const handleClose = () => {
        setSelectedStudent(null);
    }
    
    return (
        <div>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Student Email</th>
                <th>Preferences Set</th>
                <th>Assigned Project</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{isPreferenceSet(student._id)}</td>
                    <td>{assignedProjectToStudent(student._id)}</td>
                    <td>
                      <button 
                        onClick={()=>handleClick(student._id)} 
                        disabled={!isAssignButtonEnabled(student._id)}
                      >
                        Assign
                      </button> 
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    );
}
