import {React, useState} from 'react';
import "../../styles/InviteLink.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ErrorMessagePopup from './ErrorMessagePopup';

export default function InviteLinkStudent({setData, data}) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);
  
    const handleNameChange = (event) => {
      setName(event.target.value);
    }
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    }
  
    const handleSave = async() => {
      // do something with the name and email data, e.g. submit to server
      console.log('Name:', name);
      console.log('Email:', email);

      if (name && email) {
        try {
          const response = await axios.post( "/api/course/student" , 
            {_id:data._id, "name": name, "email": email, password: "testing"}, {
            headers: {
              'Content-Type': 'application/json',
            },
          }); 
            console.log("user created successfully");
            setData(response.data);
            setOpen(false);
        } catch (err) {
          switch (err.response.status) {
            case (401):
                navigate("/signin", {replace: true});
                break;
            case (400):
                <ErrorMessagePopup message={"Missing fields while adding students"} />;
                setOpen(false);
                break;
            case (409):
                <ErrorMessagePopup message={"Student already added to course"} />;
                setOpen(false);
                break;
            case (404):
                <ErrorMessagePopup message={"Course doesnt exist"} />;
                setOpen(false);
                break;
            default:
                navigate("/signin" , {replace: true});
                break;
          }
        }
    }}

    const handleOpenModal = () => {
      setOpen(true);
    }
  
    return (
      <div>
        <button className="open-button" onClick={handleOpenModal}>Invite Student</button>

        <div className="modal">
        <div className="modal-content" style={{ display: open ? 'block' : 'none' }}>
          <button className="close-button" onClick={() => setOpen(false)}>x</button>
          <h2>Enter your name and email</h2>
          <div className="input-group">
            <label>Name:</label>
            <input type="text" id="name" required value={name} onChange={handleNameChange} />
          </div>xw
          <div className="input-group">
            <label>Email:</label>
            <input type="email" id="email" value={email} required onChange={handleEmailChange} />
          </div>
          <div className="button-group">
            <button className="save-button" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
      </div> 
    );
}
  
