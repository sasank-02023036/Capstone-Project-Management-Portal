import React from 'react';
import ActiveProjects from '../components/project/ActiveProjects';
import PendingProjects from '../components/project/PendingProjects';
import PublishProjects from '../components/project/PublishProjects';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Navbar from 'components/Header/navbar';
import Footer from 'components/Footer/footer';
import "../styles/index.css"

export default function ProjectPage() {

    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
    const decodedToken = jwt_decode(token);
    const role = decodedToken.role;
    const navigate = useNavigate();

    const [tab, setTab] = React.useState(1);

    function renderTab() {
        switch (tab) {
            case 1:
                return <ActiveProjects />
            case 2:
                return <PendingProjects />
            case 3:
                return <PublishProjects />
            default:
                return <ActiveProjects />
        }
    }

    const isAdmin = () => {
        if (role !== "ADMIN") {
            navigate("/");
        }
    }


  
  return (
    <div className="container">
        {isAdmin()}
        <Navbar />
        <div className='main-content'>
            <div>
                <div onClick={()=>setTab(1)}>Active Projects</div>
                <div onClick={()=>setTab(2)}>Pending Projects</div>
                <div onClick={()=>setTab(3)}>Publish Projects</div>
            </div>

            <div>
                {renderTab()}
            </div>

        </div>
        <div className='bottom'><Footer /></div>
    </div>
  );
}
