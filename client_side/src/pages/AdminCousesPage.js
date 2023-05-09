import Footer from 'components/Footer/footer';
import Navbar from 'components/Header/navbar';
import axios from 'axios';
import CreateCourseForm from 'components/forms/CreateCourseForm';
import DeleteCourseForm from 'components/forms/deleteCourseForm';
import React from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function AdminCoursesPage() {

  const navigate = useNavigate();
  const token = Cookies.get("token");
  const payload = jwtDecode(token);
  const role = payload.role;
  if (role !== "ADMIN") {
    navigate("/signin", {replace: true});
  }

  const [allCourses, setAllCourses] = React.useState([]);

  React.useEffect(() => {
    async function getAllCourses() {
      try {
        const response = await axios.get('/api/courses');

        if (response.status === 200) {
          setAllCourses(response.data);
        }
      } catch (error) {
        // Handle the error as needed
        console.error('Error fetching courses:', error);
      }
  }

    getAllCourses();
  }, []);

  function handleCourseNameClick(name) {
    navigate(`/courses/${name}`);
  }

  function handleChange(course) {
    setAllCourses([course, ...allCourses]);
  }

  return (
    <div>
        
        <CreateCourseForm handleChange={handleChange}/>
        <table>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Course Name</th>
                    <th>Course Description</th>
                    <th>Actions</th>
                </tr>  
            </thead>
            <tbody>
                {allCourses.map((row, index) => {
                  return(<tr key={row._id}>
                          {/* table rows */}
                        <td>{index+1}</td>
                        <td onClick={()=>handleCourseNameClick(row.name)}>{row.name}</td>
                        <td>{row.description}</td>
                        <td>
                            <DeleteCourseForm _id={row._id} setData={setAllCourses} data={allCourses} />
                        </td>
                        </tr>
                      );
                      })}
            </tbody>
        </table>
        
        
    </div>
  );
}
