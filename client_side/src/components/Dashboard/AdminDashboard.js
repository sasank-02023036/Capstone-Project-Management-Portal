import React from "react";
import Navbar from "components/Header/navbar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import { Box, Card, CardContent, CardActions, CardMedia, Button, Typography,Grid } from '@mui/material';
import Books from "../../assets/Books.jpg";
import Clients from "../../assets/clients.jpg"
import Students from "../../assets/students.jpg"
import PublishProjects from "components/project/PublishProjects";
import PendingProjects from "components/project/PendingProjects";
import ActiveProjects from "components/project/ActiveProjects";
import Studentdata from "./studentData";



export default function AdminDashboard() {
    

    const token = Cookies.get("token");
    const payload = jwt_decode(token);
    const navigate = useNavigate();
    const toStudents = useNavigate();

    const handleLogout = () => {
    Cookies.remove("token");
    navigate("/", { replace: true });
    toStudents("/courses/", {replace: true});
  };

  const [tab, setTab] = useState(1);

  
  function renderTab() {
    switch (tab) {
      case 1:
        return <ActiveProjects />;
      case 2:
        return <PendingProjects />;
      case 3:
        return <PublishProjects />;
      default:
        return <PublishProjects />;
    }
  }

  
 
  
    return(
        <>
            <Navbar/>
            
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item spacing={2} xs={12} md={4} lg={4} xl={4}>
                    <Box>
                        <Card>
                            <CardMedia 
                                component='img'
                                height='140'
                                image={Books}
                                alt="unsplash img"
                            />
                            <CardContent>
                                <Typography gutterBottom variant='h5' component='div'>
                                    Courses
                                </Typography>
                                <Typography variant="body2" color='text.secondary'>
                                    All the courses offered at UMass Boston
                                </Typography>
                            </CardContent>
                            <CardActions>
                                { payload.role !== "CLIENT" && ( <Button 
                                                                    variant="contained" 
                                                                    size="small" 
                                                                    onClick={() => navigate("/courses", {replace: true})}    
                                                                >{payload.role === "STUDENT"? "Your Courses" : "Go to Courses"}</Button> )}
                                <Button variant="outlined" size="small" >learn more</Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid>

                <Grid item spacing={2} xs={12} md={4} lg={4} xl={4}>
                    <Box>
                        <Card>
                            <CardMedia 
                                component='img'
                                height='140'
                                image={Clients}
                                alt="unsplash img"
                            />
                            <CardContent>
                                <Typography gutterBottom variant='h5' component='div'>
                                    Clients
                                </Typography>
                                <Typography variant="body2" color='text.secondary'>
                                    Clients for this semester at UMass Boston
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" size="small" onClick={() => {navigate("/pages", {replace: true}); setTab(3);renderTab();}}>Go To Clients</Button>
                                <Button variant="contained" size="small" >Projects</Button>
                                <Button variant="outlined" size="small" >learn more</Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid>
                <Grid item spacing={2} xs={12} md={4} lg={4} xl={4}>
                    <Box >
                        <Card>
                            <CardMedia 
                                component='img'
                                height='140'
                                image={Students}
                                alt="unsplash img"
                            />
                            <CardContent>
                                <Typography gutterBottom variant='h5' component='div'>
                                    Students
                                </Typography>
                                <Typography variant="body2" color='text.secondary'>
                                    All the Students enrolled in the courses listed in the site
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button 
                                    variant="contained" 
                                    size="small"
                                    onClick={() => toStudents("/students", { replace: true })}
                                >Go To Students</Button>
                                <Button variant="outlined" size="small" >Learn More</Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid>
                

                
                
                
            </Grid>
            
        </>
    )
}

