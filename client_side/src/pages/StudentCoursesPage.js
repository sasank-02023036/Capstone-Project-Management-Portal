import React from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from 'components/Header/navbar';
import Footer from 'components/Footer/footer';
import { useNavigate } from 'react-router-dom';

export default function StudentCoursesPage() {

    const navigate = useNavigate();

    function checkSignedIn() {
        try {
            const token = Cookies.get("token");
            const payload = jwtDecode(token);
            const role = payload.role;
            if (role === "STUDENT") {
                return role;
            } else {
                navigate("/signin", {replace: true});
            }
        } catch (error) {
            navigate("/signin", {replace: true});
        }
    }
    
    const [allCourses, setAllCourses] = React.useState([]);
    const role = checkSignedIn();

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
        navigate(`/courses/${name}`, {replace: true});
    }

    return (
        <div>
            
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Course Name</th>
                        <th>Course Description</th>
                    </tr>  
                </thead>
                <tbody>
                    {allCourses.map((row, index) => {
                      return(<tr key={row._id}>
                              {/* table rows */}
                            <td>{index+1}</td>
                            <td onClick={()=>handleCourseNameClick(row.name)}>{row.name}</td>
                            <td>{row.description}</td>
                            </tr>
                          );
                          })}
                </tbody>
            </table>
            
        </div>
      );
}
