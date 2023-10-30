import Footer from 'components/Footer/footer';
import React , { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/home-navbar.css";
import camsLogo from '../assets/cams-low-resolution-color-logo.png';
import SignIn from '../pages/SigninPage.js';

export default function HomePage() {
  const navigate = useNavigate();
   const [showContactPopup, setShowContactPopup] = useState(false);

    const toggleContactPopup = () => {
      setShowContactPopup(!showContactPopup);
    };

  return (
    <div >
        <div className='home-navbar'>

              <div className='home-navbar-container'>

                  {/* logo goes here */}
                  <div className="navbar-logo">
                      <div class="navbar-camsLogo">
                        {/* Make the logo a clickable link */}
                       <a href="https://documenter.getpostman.com/view/26646748/2s93m1b5LA" target="_blank" rel="noopener noreferrer">
                         <img src={camsLogo} alt="CAMS Logo" />
                        </a>
                       </div>
                  </div>

                  <div className='home-navbar-links'>
                          <p className='contact' onClick={toggleContactPopup}>Contact</p>

                      {/* Help icon goes here */}
                      <div className='help'>
                              <div className='question'>
                                  <svg className='qSvg' xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29">
                                      <path id="ic_help_outline_24px" d="M15.05,25.2h2.9V22.3h-2.9ZM16.5,2A14.5,14.5,0,1,0,31,16.5,14.505,14.505,0,0,0,16.5,2Zm0,26.1A11.6,11.6,0,1,1,28.1,16.5,11.615,11.615,0,0,1,16.5,28.1Zm0-20.3a5.8,5.8,0,0,0-5.8,5.8h2.9a2.9,2.9,0,1,1,5.8,0c0,2.9-4.35,2.538-4.35,7.25h2.9c0-3.263,4.35-3.625,4.35-7.25A5.8,5.8,0,0,0,16.5,7.8Z" transform="translate(-2 -2)" fill="#fff"/>
                                  </svg>
                              </div>
                      </div>

                  </div>

              </div>

        </div>

         {/* Contact Popup */}
              {showContactPopup && (
                <div className="contact-popup">
                 <div className="popup-header">
                  <button className="close-button" onClick={toggleContactPopup}>X</button>
                  <h2>Contact Us </h2>
                  </div>
                  <p>Email: example@example.com</p>
                  <p>Phone: (123) 456-7890</p>
                </div>
              )}

        <div>
                <SignIn/>
        </div>

        <Footer/>

    </div>
  );
}
