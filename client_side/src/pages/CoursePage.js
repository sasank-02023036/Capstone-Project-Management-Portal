import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CoursesAssignment from "../components/courses/CoursesAssignment";
import CoursesProject from "../components/courses/CoursesProjects";
import CoursesStudents from "../components/courses/CoursesStudents";

export default function CoursePage() {
  const { name } = useParams();
  const [component, setComponent] = useState(1);
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await axios.get(`/api/courses/${name}`);
        if (response.status === 200) {
          setCourse(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
        navigate("/signin", {replace: true});
      }
    }

    fetchCourse();
  }, [name]);


  function renderComponent(course) {
    console.log("Rendering component with course:", course);
    switch (component) {
      case 1:
        return <CoursesStudents course={course} />;
      case 2:
        return <CoursesProject course={course} />;
      case 3:
        return <CoursesAssignment course={course} />;
      default:
        return <CoursesStudents course={course} />;
    }
  }
  

  return (
    <div>
      <div>
        <div onClick={() => setComponent(1)}>Students</div>
        <div onClick={() => setComponent(2)}>Projects</div>
        <div onClick={() => setComponent(3)}>
          Assign Projects to Students
        </div>
      </div>
      {course ? renderComponent(course) : <div>Loading...</div>}
    </div>
  );
  
}
