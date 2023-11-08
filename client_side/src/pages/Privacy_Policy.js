import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, TextField, Typography } from '@mui/material';
import Navbar from 'components/Header/navbar';
import Footer from 'components/Footer/footer';
import "../styles/index.css"

export default function Privacy_PolicyPage() {
    const navigate = useNavigate();

    // CSS for the background overlay
    // const overlayStyles = {
    //     position: 'fixed',
    //     top: 50,
    //     left: 0,
    //     width: '100%',
    //     height: '100%',
    //     background: 'rgba(0, 0, 0, 0.5)', 
    //     zIndex: 999,
    // };

    return (
        <div className="container">
            <Navbar />
            <div className='main-content'>
                <div>
                    <Typography>content</Typography>
                </div>
            </div>
            <div className='bottom'>
                <Footer />
            </div>
        </div>
    );
}
