import {React, useState} from 'react';
import "../../styles/InviteLink.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateCourseForm({closePopup , handleChange}) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [popup, setPopup] = useState(false);
    const [description, setDescription] = useState("");
  
    const handleNameChange = (event) => {
      setName(event.target.value);
    }
  
    const handleDescriptionChange = (event) => {
      setDescription(event.target.value);
    }

    const handleClose = (event) => {
        setPopup(false)
    }
  
    const handleSave = async() => {
      if (name && description) {
        try {
          const response = await axios.post("/api/course", {"name": name, "description": description}, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true
          });          
          switch(response.status) {
            case 201:
              console.log("course created successfully");
              handleChange(response.data);
              setPopup(false);
              break;
            case 400:
                console.log("name and description cannot be missing");
                break;
            case 409:
              console.log("course name already exists");
              break;
            case 401:
              console.log("user unauthorized");
              navigate("/signin", {replace: true});
              break;
            default:
              console.log("server error");
              break;
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        //do error handling;
        console.log("missing fields");
      }
    }
  
    return (
      <div>
        <button className='create-course-button' onClick={() => setPopup(true)}>Create Course</button>

        {popup && 
        (<div className="modal-content" >
          <button className="close-button" onClick={handleClose}>x</button>
          <h2>Enter the course name and description here</h2>
          <div className="input-group">
            <label>Name:</label>
            <input type="text" id="name" required value={name} onChange={handleNameChange} />
          </div>
          <div className="input-group">
            <label>Description:</label>
            <input type="text" id="description" value={description} required onChange={handleDescriptionChange} />
          </div>
          <div className="button-group">
            <button className="save-button" onClick={handleSave}>Save</button>
          </div>
        </div>
        )}
      </div>
    );
}
  

export default CreateCourseForm;
