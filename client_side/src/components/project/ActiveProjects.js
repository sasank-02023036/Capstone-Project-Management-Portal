import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConfirmationPopup from 'components/forms/ConfimationPopup';
import PublishProjectForm from 'components/forms/PublishProjectForm';
import ProjectPreview from './ProjectPreview';

function ActiveProjects() {

  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [preview ,setPreview] = useState(false);

  // api call to get the table
  React.useEffect(() => {
    async function fetchTableData() {
      try {
        const response = await axios.get('/api/projects', {
          params: {
            pending: false
          }
        });
        setProjects(response.data);
      } catch (error) {
        console.log(error);
      }
    }
      
    fetchTableData();
    }, []);
  
  const handleClick= (id) => {
      setPopup(true);
      setSelectedProject(id);
  }

  const handleClose = () => {
    setPreview(false);
  }

  const handleYes = async() => {
    try {
      console.log(selectedProject)
      const response = await axios.delete('/api/project/'+ selectedProject);
      
      switch (response.status) {
        case (200):
          console.log("Deleted successfully");
          setPopup(false);
          setProjects(projects.filter(p => p._id !== selectedProject));
          setSelectedProject("");
          break;
        case (401):
          console.log("Unauthorized to delete");
          navigate("/signin" , {replace: true});
          break;

        case(404):
          console.log("Cannot find the project");
          break;
        
        case(500):
          console.log("server error");
          break;
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  const handleNo = (event) => {
    setPopup(false);
  }

  

  return (
    <>
    <PublishProjectForm />
    {popup && <ConfirmationPopup message="Are you sure you want to delete this item ?"  onNo={handleNo} onYes={handleYes}/>}
    {preview && <ProjectPreview projectId={selectedProject}  handleClose={handleClose} />}
    <table>
      {/* table headers */}
      <thead>
        <tr>
          <th>S.No</th>
          <th>Project Name</th>
          <th>Skills</th>
          <th>Created On</th>
          <th>Created By</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((row, index) => {
          return(<tr key={row._id}>
            {/* table rows */}
            <td>{index}</td>
            <td onClick={() => {setSelectedProject(row._id); setPreview(true);}}>{row.name}</td>
            <td>{row.skills}</td>
            <td>{row.createdAt}</td>
            <td>{row.createdBy}</td>
            <td>
              <button onClick={() => handleClick(row._id)}>Delete</button>
            </td>
          </tr>
          );
        })}
      </tbody>
    </table>
    </>
  );
}

export default ActiveProjects;
