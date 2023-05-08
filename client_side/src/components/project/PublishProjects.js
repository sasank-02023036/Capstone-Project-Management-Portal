import React from 'react';
import SendInviteLinkForm from 'components/forms/SendInviteLinkForm';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ConfirmationPopup from 'components/forms/ConfimationPopup';

function PublishProjects() {

  const navigate = useNavigate();
  const [popup, setPopup] = React.useState(false);
  const [clients, setClients] = React.useState([]);
  const [selectedClient , setSelectedClient] = React.useState("");
  
  const handleChange = (client) => {
    setClients([client, ...clients]);
  }

  React.useEffect(() => {
    async function fetchTableData() {
      try {
        const response = await axios.get('/api/users?role=CLIENT');
        setClients(response.data);
        console.log(response.data);
        console.log(clients);
      } catch (error) {
        console.log(error);
      }
    }
      
    fetchTableData();
  }, []);


  const handleYes = async() => {
    try {
      const response = await axios.delete('/api/user/'+ selectedClient);
      switch (response.status) {
        case (200):
          console.log("Deleted successfully");
          setPopup(false);
          setClients(clients.filter(p => p.email !== selectedClient));
          setSelectedClient("");
          break;
        case (401):
          console.log("Unauthorized to delete");
          navigate("/signin" , {replace: true});
          break;

        case(404):
          console.log("Cannot find the client");
          break;

        case(409):
          console.log("Cannot delete self");
          break;
        
        default:
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
    <div>
      <SendInviteLinkForm handleChange={handleChange} />
      {popup && <ConfirmationPopup message="Are you sure you want to delete this item ?"  onNo={handleNo} onYes={handleYes}/>}
      <table>
      {/* table headers */}
      <thead>
        <tr>
          <th>S.No</th>
          <th>Client Name</th>
          <th>Client email</th>
          <th>Created On</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((row, index) => {
          return(<tr key={row._id}>
            {/* table rows */}
            <td>{index}</td>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.createdAt}</td>
            <td>{row.role}</td>
            <td>
              <button onClick={() => {setSelectedClient(row.email); setPopup(true);}}>Remove</button>
            </td>
          </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
}

export default PublishProjects;
