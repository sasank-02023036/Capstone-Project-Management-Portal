import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/SigninPage.css";
import camsBlue from '../assets/camsBlue.png';

export default function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrorMessage("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    });

    if (response.ok) {
      navigate('/dashboard', { replace: true });
    } else if (response.status === 400){
      setErrorMessage('Username/ Password missing');
    } else if (response.status === 401) {
        setErrorMessage('Wrong Username/ Password');  
    } else {
        setErrorMessage('Internal server error. Try again');
    }
  };

  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordHasValue, setPasswordHasValue] = useState(false);

  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = () => {
      setIsFocused(true);
  };

  const handleBlur = (e) => {
      setIsFocused(false);
      setHasValue(e.target.value !== '');
  };

  const handleBack = (event) => {
    event.preventDefault();
    navigate("/", {replace: true});
}



  return (
    <div className='sign-in-page'> 
              <div className='formSignIn-container'>

                  <div className='formSignIn'> 
                                <span class='formSignIn-01'>Sign in</span>
                                <span   class='formSignIn-02'>to your account</span>
                  </div>
                    
            <form  className='formSignIn-form' onSubmit={handleSubmit}>


                    <div className='formSignIn-inputfields'>

                              <div className='formSignIn-email' >
                                <label htmlFor="email"  className={`label ${isFocused || hasValue ? 'focused' : ''}`}>Email</label>
                                <input
                                  type="email"
                                  id="email"
                                  value={email}
                                  onChange={handleEmailChange}
                                  className={`input ${isFocused || hasValue ? 'focused' : ''}`}
                                  onFocus={handleFocus}
                                  onBlur={handleBlur}
                                />
                              </div>

                              <div className='formSignIn-password'>
                                <input
                                  type="password"
                                  id="password"
                                  className="pwd-input"
                                  value={password}
                                  onChange={handlePasswordChange}
                                  onFocus={() => setPasswordFocused(true)}
                                                      onBlur={(e) => {
                                                          setPasswordFocused(false);
                                                          setPasswordHasValue(e.target.value !== '');
                                                      }}

                                />
                                <label htmlFor="password" className={`pwd-label ${passwordFocused  || passwordHasValue ? 'focused' : ''}`}>Password</label>
                              </div>

                    </div>  

          

                    <a className="forgot-password" onClick={() => navigate("/forgot-password", {replace: true})}>
                      Forgot Password?
                    </a>


                    <div id="error" style={{ color: "red" }}>
                      {errorMessage}
                    </div>

                    <div className='form-buttons'>
                      <button className='LoginForm-continue' type="submit">Continue</button>
                    </div>
            </form>

          </div>
    </div>
  );
}
