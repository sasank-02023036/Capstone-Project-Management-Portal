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

                  <div className='forSignIn-Top'>  

                                          {/* logo goes here */}
                                          <div className='formSignIn-logo'>
                                              <div class="formLogin-camsBlue"> <img src={camsBlue} alt="CAMS Logo" />  </div>
                                          </div>

                                          {/* Help icon goes here */}
                                          <div className='formSignIn-help'>
                                              <div className='formLogin-question'> 
                                                  <svg className='qSvg' xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 29 29">
                                                      <path id="ic_help_outline_24px" d="M15.05,25.2h2.9V22.3h-2.9ZM16.5,2A14.5,14.5,0,1,0,31,16.5,14.505,14.505,0,0,0,16.5,2Zm0,26.1A11.6,11.6,0,1,1,28.1,16.5,11.615,11.615,0,0,1,16.5,28.1Zm0-20.3a5.8,5.8,0,0,0-5.8,5.8h2.9a2.9,2.9,0,1,1,5.8,0c0,2.9-4.35,2.538-4.35,7.25h2.9c0-3.263,4.35-3.625,4.35-7.25A5.8,5.8,0,0,0,16.5,7.8Z" transform="translate(-2 -2)" fill="#fff"/>
                                                  </svg>
                                              </div>
                                          </div>

                  </div>

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

          

                    <a className="forgot-password" href="/forgot-password">
                      Forgot Password?
                    </a>


                    <div id="error" style={{ color: "red" }}>
                      {errorMessage}
                    </div>

                    <div className='form-buttons'>
                      <button className='LoginForm-continue' type="submit">Continue</button>
                      <button className='LoginFrom-homepage' onClick={handleBack}>Back to Home Page</button>
                    </div>

            </form>

          </div>
    </div>
  );
}
