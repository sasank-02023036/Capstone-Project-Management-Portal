import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/ProjectSelectionPopup.css";
import { useNavigate } from "react-router-dom";
import ErrorMessagePopup from "./ErrorMessagePopup";

export default function SelectProjectsForCourse({ projects , name, setData}) {


  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    // set the initially selected projects
    setSelectedProjects(projects.map((project) => project._id));
    
    async function getAllProjects() {
        try {
            const response = await axios.get("/api/projects");
            setAllProjects(response.data);
        } catch (err) {
            navigate('/signin', {replace: true});
        }
    }

    getAllProjects();

  }, [projects, navigate]);

  const handleProjectSelection = (event) => {
    const projectId = event.target.value;
    if (event.target.checked) {
      setSelectedProjects((prevState) => [...prevState, projectId]);
    } else {
      setSelectedProjects((prevState) =>
        prevState.filter((id) => id !== projectId)
      );
    }
  };

  const handleSubmit = async() => {
    try {
        
        console.log(selectedProjects);
        const response = await axios.put(`/api/courses/${name}`, { projects: selectedProjects },
        { headers: { 'Content-Type': 'application/json' } });
        

        if (response.status === 200) {
            setData(response.data);
            onClose();
        }
        

    } catch (err) {
        console.log(err);
    }
  };

  const onClose = () => {
    setOpen(false);
  }

  return (
    <div>

    
    <button onClick={()=>setOpen(true)}> Add Projects </button>
    {open && 
      (<div className="popup-background">
      <div className="popup-content">
        <h2>Select Projects</h2>
        <div className="project-list">
        {allProjects.map((project) => {
            const isChecked = selectedProjects.includes(project._id);
            return (<label key={project._id}>
            <input
                type="checkbox"
                value={project._id}
                checked={isChecked}
                onChange={handleProjectSelection}
            />
            {project.name}
            </label>
            )} ) }
        </div>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>)}
    </div>
  );
}
