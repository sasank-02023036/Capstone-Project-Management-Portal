import Footer from 'components/Footer/footer';
import React , { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/home-navbar.css";
import camsLogo from '../assets/cams-low-resolution-color-logo.png';
import SignIn from '../pages/SigninPage.js';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

export default function HomePage() {
  const navigate = useNavigate();
   const [showContactPopup, setShowContactPopup] = useState(false);

    const toggleContactPopup = () => {
      setShowContactPopup(!showContactPopup);
    };

    const [openContact, setOpenContact] = React.useState(false);
        const [openHelp, setOpenHelp] = React.useState(false);

        const anchorRefContact = React.useRef(null);
        const anchorRefHelp = React.useRef(null);


        const handleToggleContact = () => {
          setOpenContact((prevOpen) => !prevOpen);
        };

        const handleCloseContact = (event) => {
          if (anchorRefContact.current && anchorRefContact.current.contains(event.target)) {
            return;
          }
          setOpenContact(false);
        };

        const handleContactMenuItemClick = (event) => {
          setOpenContact(false);
          navigate("/profile", { replace: true });
        }

        function handleContactListKeyDown(event) {
          if (event.key === 'Tab') {
            event.preventDefault();
            setOpenHelp(false);
          } else if (event.key === 'Escape') {
            setOpenHelp(false);
          }
        }
        const handleToggleHelp = () => {
          setOpenHelp((prevOpen) => !prevOpen);
        };

        const handleCloseHelp = (event) => {
          if (anchorRefHelp.current && anchorRefHelp.current.contains(event.target)) {
            return;
          }

          setOpenHelp(false);
        };

        function handleHelpListKeyDown(event) {
          if (event.key === 'Tab') {
            event.preventDefault();
            setOpenHelp(false);
          } else if (event.key === 'Escape') {
            setOpenHelp(false);
          }
        }

  return (
    <div >
        <div className='home-navbar'>

              <div className='home-navbar-container'>

                  {/* logo goes here */}
                  <div className="navbar-home-logo">
                      <div class="navbar-home-camsLogo">
                        {/* Make the logo a clickable link */}
                       <a href="https://documenter.getpostman.com/view/26646748/2s93m1b5LA" target="_blank" rel="noopener noreferrer">
                         <img src={camsLogo} alt="CAMS Logo" />
                        </a>
                       </div>
                  </div>

                  <div className='home-navbar-links'>
                          <div className='contact'
                          ref={anchorRefContact}
                         id="composition-contact-button"
                         aria-controls={openContact ? 'composition-contact-menu' : undefined}
                         aria-expanded={openContact ? 'true' : undefined}
                         aria-haspopup="true"
                         onClick={handleToggleContact}>Contact
                         <Popper
                                                                             open={openContact}
                                                                             anchorEl={anchorRefContact.current}
                                                                             role={undefined}
                                                                             placement="bottom-start"
                                                                             transition
                                                                             disablePortal
                                                                             >
                                                                             {({ TransitionProps, placement }) => (
                                                                               <Grow
                                                                                 {...TransitionProps}
                                                                                 style={{
                                                                                   transformOrigin:
                                                                                     placement === 'bottom-start' ? 'left top' : 'left bottom',
                                                                                 }}
                                                                               >
                                                                                 <Paper>
                                                                                   <ClickAwayListener onClickAway={handleCloseContact}>
                                                                                   <MenuList
                                                                                       autoFocusItem={openContact}
                                                                                       id="composition-contact-menu"
                                                                                       aria-labelledby="composition-contact-button"
                                                                                       onKeyDown={handleContactListKeyDown}
                                                                                     >
                                                                                    <MenuItem >Email: kenneth.fletcher@umb.edu</MenuItem>
                                                                                    <MenuItem >Phone: 617.287.3832</MenuItem>
                                                                                    </MenuList>
                                                                                   </ClickAwayListener>
                                                                                 </Paper>
                                                                               </Grow>
                                                                             )}
                                                                           </Popper>


                  </div>



                      {/* Help icon goes here */}
                      <div className="help"
                                                 ref={anchorRefHelp}
                                                 id="composition-help-button"
                                                 aria-controls={openHelp ? 'composition-help-menu' : undefined}
                                                 aria-expanded={openHelp ? 'true' : undefined}
                                                 aria-haspopup="true"
                                                 onClick={handleToggleHelp}
                                                 >
                                                  <div className="question" >
                                                    <svg
                                                      className="qSvg"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      width="27"
                                                      height="27"
                                                      viewBox="0 0 29 29"
                                                    >
                                                      <path
                                                        id="ic_help_outline_24px"
                                                        d="M15.05,25.2h2.9V22.3h-2.9ZM16.5,2A14.5,14.5,0,1,0,31,16.5,14.505,14.505,0,0,0,16.5,2Zm0,26.1A11.6,11.6,0,1,1,28.1,16.5,11.615,11.615,0,0,1,16.5,28.1Zm0-20.3a5.8,5.8,0,0,0-5.8,5.8h2.9a2.9,2.9,0,1,1,5.8,0c0,2.9-4.35,2.538-4.35,7.25h2.9c0-3.263,4.35-3.625,4.35-7.25A5.8,5.8,0,0,0,16.5,7.8Z"
                                                        transform="translate(-2 -2)"
                                                        fill="#fff"
                                                      />
                                                    </svg>
                                                  </div>
                                                  <Popper
                                                    open={openHelp}
                                                    anchorEl={anchorRefHelp.current}
                                                    role={undefined}
                                                    placement="bottom-start"
                                                    transition
                                                    disablePortal
                                                    >
                                                    {({ TransitionProps, placement }) => (
                                                      <Grow
                                                        {...TransitionProps}
                                                        style={{
                                                          transformOrigin:
                                                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                                                        }}
                                                      >
                                                        <Paper>
                                                          <ClickAwayListener onClickAway={handleCloseHelp}>
                                                          <MenuList
                                                              autoFocusItem={openHelp}
                                                              id="composition-help-menu"
                                                              aria-labelledby="composition-help-button"
                                                              onKeyDown={handleHelpListKeyDown}
                                                            >
                                                           <MenuItem onClick={() => window.open("mailto:support@example.com")}>Support</MenuItem>
                                                           <MenuItem onClick={() => window.open("mailto:help@example.com")}>Help</MenuItem>
                                                           </MenuList>
                                                          </ClickAwayListener>
                                                        </Paper>
                                                      </Grow>
                                                    )}
                                                  </Popper>
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
