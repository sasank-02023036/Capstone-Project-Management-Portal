import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField ,Typography } from '@mui/material';
import axios from "axios";
import jwt_decode from 'jwt-decode';
import Footer from 'components/Footer/footer';
import Navbar from 'components/Header/navbar';
import "../styles/UserProfilePage.css"
import "../styles/index.css"

export default function UserProfilePage() {
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const token = document.cookie.split("; ").find((row) => row.startsWith("token=")).split("=")[1];
    const decodedToken = jwt_decode(token);
    const email = decodedToken.email;

    useEffect(() => {
        // get data from server
        loadData();
    }, [])

    async function loadData() {
        // call server
        const response = await axios.get('/api/user/'+email);
        const user = response.data.user;
        setName(user.name);
    }

    const handleInputChange = (field) => (e) => {
        switch (field) {
          case 'name':
            setName(e.target.value);
            break;
          case 'password':
            setPassword(e.target.value);
            break;
          case 'confirmPassword':
            setConfirmPassword(e.target.value);
            break;
          default:
            break;
        }
      };
      const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (edit) {
            if (name == '' || password == '' || confirmPassword == '' || password != confirmPassword) {
                alert("invalid details");
                return;
            }
            // send message to server to update data
            const response = await axios.put('/api/user/'+email, {name: name, password: password});
            setEdit(false);
            setPassword('');
            setConfirmPassword('');
        }
      }

      if (!name) return null;

      return (
        <div className="user-profile-container">
        <Navbar />
        <div className="main-content">
        <div className="user-profile-header">
          <Typography variant="h4">User Profile</Typography>
         </div>
          <div>
            <form className='user-profile-form' onSubmit={handleFormSubmit}>
            <Grid container sm={true} spacing={2}>
                <Grid item xs={12}>
                <TextField
                    disabled={!edit}
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    value={name}
                    onChange={handleInputChange('name')}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    disabled={true}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleInputChange('email')}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    disabled={!edit}
                    variant="outlined"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    value={password}
                    placeholder='*****'
                    onChange={handleInputChange('password')}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    disabled={!edit}
                    variant="outlined"
                    required
                    fullWidth
                    id="confirmPassword"
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder='*****'
                    value={confirmPassword}
                    onChange={handleInputChange('confirmPassword')}
                />
                </Grid>
            </Grid>
            {edit && (<Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
            >
                Update
            </Button>)}
            {edit && (<Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={async () => {
                    await loadData();
                    setEdit(false);
                }}
            >
                Cancel
            </Button>)}
            {!edit && (<Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => setEdit(true)}
            >
                Edit User
            </Button>)}
            </form>
          </div>
        </div>
        <div className="bottom">
          <Footer />
        </div>
      </div>
    );
}