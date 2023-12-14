import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../../styles/AutoAssign.css";
import { useState, useEffect } from "react";

export default function AutoAssignForm({data, setData, enabled}) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [projectCapacities, setProjectCapacities] = React.useState({});
  const [projects, setProjects] = React.useState([]);

  React.useEffect(()=>{
    setProjects(data.projects);
  }, [data])

  const handleCapacityChange = (project, capacity) => {
    setProjectCapacities({ ...projectCapacities, [project]: capacity });
  };

  // const [Assignments, setAssignments] = useState([])
  // useEffect(() => {
  //   // const fetchData = async () => {
  //   //   try {
  //   //     const response = await axios.get('/api/preferences');
  //   //     setAssignments(response.data.assignments);
  //   //   } catch (error) {
  //   //     console.error('Error fetching data:', error);
  //   //   }
  //   // };

  //   fetch("/api/preferences").then(res => res.json()).then(data => {setAssignments(data.assignments)})
  // },[])


  const [assignments, setAssignments] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/preferences', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAssignments(data.assignments);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

 
  // function onClickAutoAssign(){
  //   console.log(Assignments);
  //   return (
  //     <div>
  //     <p>{Assignments}</p>
  //     </div>
  //   );
  // }
  

  const handleSave = async() => {
    if (Object.keys(projectCapacities).length === projects.length) {
      try {
        const response = await axios.post(`/api/courses/assign/${data.name}`, 
          {projectCapacities : projectCapacities},
          {headers:{credentials : true}});
        console.log(response.data);
        setData(response.data);
        setOpen(false);
      } catch (err) {
        switch(err.response.status) {
          case 401:
            alert("User not Authorized");
            setOpen(false);
            navigate('/signin', {replace:true});
            break;
          case 400:
            alert("Some student Preferences missing");
            setOpen(false);
            break;
          case 404:
            alert("Cannot perform auto assign");
            setOpen(false);
            break;
          default:
            alert("Internal server error. Try again");
            setOpen(false);
            break;
        }
      }
    } else {
      alert("Cannot leave any project capacity as empty");
    }
  }

  return (
    <div>

      <div>
        <button className="Auto-Assign-button" onClick={() => console.log(assignments)}>
          Auto Assign
        </button>
        </div>

        {/* Render assignments */}
        {/* <div>
          <h2>Assignments</h2>
          <ul>
            {assignments.map((assignment, index) => (
              <li key={index}>
                <strong>Person:</strong> {assignment.person}, <strong>Project:</strong> {assignment.project}
              </li>
            ))}
          </ul>
        </div>
      </div> */}


      


      {open && (
        <div>


          <div className="Auto-Assign-wrapper">
              <div className="Auto-Assign-wrapper-modal-content">


            <div className='Auto-Assign-top'>
                            
                            {/* Title goes here */}
                    
                              <div className='Auto-Assign-title'> 
                                  <span class='Auto-Assign-title-01'>Choose Capacity</span>
                              </div>
              

                            {/* Close icon goes here */}
                            <div className='Auto-Assign-close' onClick={()=>{setOpen(false)}}>
                                <div className='Auto-Assign-close-button'> 
                                  <svg className='cSvg' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                                      <path id="ic_close_24px" d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)"/>
                                  </svg>
                                </div>
                            </div>

            </div>


        <div className="table-wrapper">

              <table>
                  <thead>
                    <tr>
                      <th>Project Name</th>
                      <th>Capacity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project, index) => (
                      <tr key={index}>
                        <td>{project.name}</td>
                        <td>
                          <select
                            value={projectCapacities[project._id] || ""}
                            onChange={(e) =>
                              handleCapacityChange(project._id, e.target.value)
                            }
                          >
                            <option value="">Select</option>
                            {Array.from({ length: 10 }).map((_, i) => (
                              <option key={i} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
              </table>

          </div>


          <div className="auto-assign-button-group">
                <button className="auto-assign" onClick={handleSave}>Submit</button>
          </div>

        </div>
        </div>
        </div>
      )}
    </div>
  );
}
