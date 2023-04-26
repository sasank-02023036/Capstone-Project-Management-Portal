import React from 'react'
import './navbarStyles.css'
import camsBlue from '../../assets/camsBlue.png';

const navbarAdmin = () => {
  return (
    <div className='navbarAdmin'>
         <div className='containerAdmin'>

            {/* logo goes here */}
            <div className='blue'>
               <div class="camsBlue"> <img src={camsBlue} alt="CAMS Logo" />  </div>
            </div>
            
            {/* Empty Space goes here */}
            <div className='empty'>Admin</div>

            {/* Links goes here */}
            <div className='links'>
                <p className='studentView'>Student</p>
                <p className='professorView'>Professor</p>
                <p className='clientView'>Client</p>
                <p className='courses'>Courses</p>
                <p className='projects'>Projects</p>
                <p className='dashboard'>Dashboard</p>
            </div>

            {/* Profile icon goes here */}
            <div className='profile'>
                <div className='profile-icon'> 
                    <svg className='pSvg' xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29">
                        <path id="profile" d="M16.519,2A14.514,14.514,0,0,0,5.841,26.327h0a14.536,14.536,0,0,0,21.355,0h0A14.514,14.514,0,0,0,16.519,2Zm0,26.127a11.627,11.627,0,0,1-8.063-3.266,8.719,8.719,0,0,1,16.125,0A11.627,11.627,0,0,1,16.519,28.127ZM13.613,13.612a2.905,2.905,0,1,1,2.905,2.9A2.9,2.9,0,0,1,13.613,13.612Zm12.944,8.709a11.619,11.619,0,0,0-5.68-4.906,5.809,5.809,0,1,0-8.716,0,11.619,11.619,0,0,0-5.68,4.906A11.488,11.488,0,0,1,4.9,16.515a11.622,11.622,0,0,1,23.244,0A11.488,11.488,0,0,1,26.557,22.321Z" transform="translate(-2.019 -2)" fill="#fff"/>
                    </svg>
                </div>
            </div>

            {/* Sign Out Button goes here */}
            <div className='sign-out'>
                <button className='sign-out-btn'>Sign out</button>
            </div>

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
    
  )
}

export default navbarAdmin