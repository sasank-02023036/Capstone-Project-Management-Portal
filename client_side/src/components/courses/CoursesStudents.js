import InviteLinkStudent from "components/forms/InviteLinkStudent";
import React from 'react';
import DeleteStudentForm from "components/forms/DeleteStudentForm";

export default function CoursesStudents({ course }) {

    const [data , setData] = React.useState(course);

    return (
      <div>
        <InviteLinkStudent data={data} setData={setData}/>
        <table>
      {/* table headers */}
      <thead>
        <tr>
          <th>S.No</th>
          <th>Student Name</th>
          <th>Student email</th>
          <th>Created On</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.users.map((row, index) => {
          return(<tr key={row._id}>
            {/* table rows */}
            <td>{index}</td>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.createdAt}</td>
            <td>
              <DeleteStudentForm student={row} data={data} setData={setData}/>
            </td>
          </tr>
          );
        })}
      </tbody>
    </table>
      </div>
    );
}
