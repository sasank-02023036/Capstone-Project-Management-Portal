import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PublishProjectForm from "components/forms/PublishProjectForm";
import ProjectPreview from "../project/ProjectPreview";
import Navbar from "components/Header/navbar";

export default function ClientDashBoard() {
  const navigate = useNavigate();
  const [projects, setProjects] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [projectId, setProjectId] = React.useState("");

  React.useEffect(async () => {
    const response = await axios.get("/api/project");
    switch (response.status) {
      case 401:
        console.log("student cannot access");
        navigate("/sigin", { replace: true });
        break;
      case 200:
        setProjects(response.data);
        break;
      case 500:
        console.log("internal server error");
        break;
    }
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Navbar />
      <PublishProjectForm />
      {open && (
        <ProjectPreview onClose={onClose} projectId={projectId} />
      )}
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Project Name</th>
            <th>Created On</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((row, index) => {
            return (
              <tr key={row._id}>
                <td>{index + 1}</td>
                <td onClick={() => setProjectId(row._id)}>{row.name}</td>
                <td>{row.createdOn}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
