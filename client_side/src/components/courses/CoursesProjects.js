import SelectProjectsForCourse from "components/forms/SelectProjectsForCourse";
import React from "react";
import ProjectPreview from "components/project/ProjectPreview";


export default function CoursesProject({course}) {
    const [data , setData] = React.useState(course);
    const [preview, setPreview] = React.useState(false);
    const [selectedProject, setSelectedProject] = React.useState("");

    const handleClose = () => {
        setPreview(false);
    }
    
    return (
      <div>
        <SelectProjectsForCourse   projects={course.projects}    name={course.name}   setData={setData}  />
        {preview && <ProjectPreview projectId={selectedProject}  handleClose={handleClose} />}
        <table>
      {/* table headers */}
      <thead>
        <tr>
          <th>S.No</th>
          <th>Project Name</th>
          <th>Project Description</th>
          <th>Skills</th>
          <th>Created On</th>
        </tr>
      </thead>
      <tbody>
        {data.projects.map((row, index) => {
          return(<tr key={row._id}>
            {/* table rows */}
            <td>{index}</td>
            <td onClick={() => {setSelectedProject(row._id); setPreview(true);}} >{row.name}</td>
            <td>{row.description}</td>
            <td>{row.skills}</td>
            <td>{row.createdAt}</td>
          </tr>
          );
        })}
      </tbody>
    </table>
      </div>
    )
}