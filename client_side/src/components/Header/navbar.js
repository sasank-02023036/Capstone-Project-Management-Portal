import React from "react";
import "../../styles/navbar.css";
import { useState } from "react";
import camsLogo from "../../assets/camsBlue.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

const Navbar = () => {
  const token = Cookies.get("token");
  const payload = jwt_decode(token);
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = React.useState(false);
  const [openHelp, setOpenHelp] = React.useState(false);

  const anchorRefProfile = React.useRef(null);
  const anchorRefHelp = React.useRef(null);

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/", { replace: true });
  };

  const handleToggleProfile = () => {
    setOpenProfile((prevOpen) => !prevOpen);
  };

  const handleCloseProfile = (event) => {
    if (anchorRefProfile.current && anchorRefProfile.current.contains(event.target)) {
      return;
    }
    setOpenProfile(false);
  };

  const handleProfileMenuItemClick = (event) => {
    setOpenProfile(false);
    navigate("/profile", { replace: true });
  }

  function handleProfileListKeyDown(event) {
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
    <div className="navbar">
      <div className="navbar-container">
        {/* logo goes here */}
        <div className="navbar-logo">
          <div class="navbar-camsLogo">
            {" "}
            <img src={camsLogo} alt="CAMS Logo" />{" "}
          </div>
        </div>

        {/* Links goes here */}
        <div className="navbar-links">
          {payload.role !== "CLIENT" && (
            <p
              className="courses"
              onClick={() => navigate("/courses", { replace: true })}
            >
              {payload.role === "STUDENT"? "Your Courses" : "Courses"}
            </p>
          )}

          {payload.role === "ADMIN" && (
            <p
              className="projects"
              onClick={() => navigate("/project", { replace: true })}
            >
              Projects
            </p>
          )}
          {payload.role === "ADMIN" && (
            <p
              className="dashboard"
              onClick={() => navigate("/dashboard", { replace: true })}
            >
              Dashboard
            </p>
          )}
        </div>

        <div className="navbar-buttons">
          {/* Profile icon goes here */}
          <div
           className="navbar-profile"
           ref={anchorRefProfile}
           id="composition-button"
           aria-controls={openProfile ? 'composition-menu' : undefined}
           aria-expanded={openProfile ? 'true' : undefined}
           aria-haspopup="true"
           onClick={handleToggleProfile}
           >
            <div className="profile-icon">
              <svg
                className="pSvg"
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 29 29"
              >
                <path
                  id="profile"
                  d="M16.519,2A14.514,14.514,0,0,0,5.841,26.327h0a14.536,14.536,0,0,0,21.355,0h0A14.514,14.514,0,0,0,16.519,2Zm0,26.127a11.627,11.627,0,0,1-8.063-3.266,8.719,8.719,0,0,1,16.125,0A11.627,11.627,0,0,1,16.519,28.127ZM13.613,13.612a2.905,2.905,0,1,1,2.905,2.9A2.9,2.9,0,0,1,13.613,13.612Zm12.944,8.709a11.619,11.619,0,0,0-5.68-4.906,5.809,5.809,0,1,0-8.716,0,11.619,11.619,0,0,0-5.68,4.906A11.488,11.488,0,0,1,4.9,16.515a11.622,11.622,0,0,1,23.244,0A11.488,11.488,0,0,1,26.557,22.321Z"
                  transform="translate(-2.019 -2)"
                  fill="#fff"
                />
              </svg>
            </div>
              <Popper
              open={openProfile}
              anchorEl={anchorRefProfile.current}
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
                    <ClickAwayListener onClickAway={handleCloseProfile}>
                      <MenuList
                        autoFocusItem={openProfile}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleProfileListKeyDown}
                      >
                        <MenuItem onClick={handleProfileMenuItemClick}>Profile</MenuItem>
                        <MenuItem onClick={handleCloseProfile}>My account</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>

          {/* Sign Out Button goes here */}
          <div className="navbar-sign-out">
            <div className="navbar-sign-out-btn" onClick={handleLogout}>
              <svg
                className="soSvg"
                width="36px"
                height="36px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M21.593 10.943c.584.585.584 1.53 0 2.116L18.71 15.95c-.39.39-1.03.39-1.42 0a.996.996 0 0 1 0-1.41 9.552 9.552 0 0 1 1.689-1.345l.387-.242-.207-.206a10 10 0 0 1-2.24.254H8.998a1 1 0 1 1 0-2h7.921a10 10 0 0 1 2.24.254l.207-.206-.386-.241a9.562 9.562 0 0 1-1.69-1.348.996.996 0 0 1 0-1.41c.39-.39 1.03-.39 1.42 0l2.883 2.893zM14 16a1 1 0 0 0-1 1v1.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1.505a1 1 0 1 0 2 0V5.5A2.5 2.5 0 0 0 12.5 3h-7A2.5 2.5 0 0 0 3 5.5v13A2.5 2.5 0 0 0 5.5 21h7a2.5 2.5 0 0 0 2.5-2.5V17a1 1 0 0 0-1-1z"
                  fill="#000000"
                />
              </svg>
            </div>
          </div>

          {/* Help icon goes here */}
          <div className="navbar-help">
            <div className="question" onClick={handleToggleHelp}>
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
  );
};

export default Navbar;