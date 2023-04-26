import React, { useState } from 'react';
import camsBlue from '../../assets/camsBlue.png';
import './formContactStyles.css'

const FormContact = () => {

    const [subjectIDFocused, setSubjectIDFocused] = useState(false);
    const [subjectIDHasValue, setSubjectIDHasValue] = useState(false);

    const [studentIDFocused, setStudentIDFocused] = useState(false);
    const [studentIDHasValue, setstudentIDHasValue] = useState(false);

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
  return (
    <div className='formContact'>

        {/*<div className='contact-us-bg'>Hey</div>*/} 

        <div className='formContact-container'>


            <form className='formContact-actualForm'>
                        <div className='formContact-Logo-Help'>
                            
                                {/* logo goes here */}
                                <div className='formContact-logo'>
                                        <div className='sign-up-to-Submit'> 
                                            <span class='sign-up-to-Submit-text-01'>Contact Us</span>
                                        </div>
                                </div>

                                {/* Help icon goes here */}
                                <div className='formContact-help'>
                                    <div className='formContact-question'> 
                                        <svg className='qSvg' xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 29 29">
                                            <path id="ic_help_outline_24px" d="M15.05,25.2h2.9V22.3h-2.9ZM16.5,2A14.5,14.5,0,1,0,31,16.5,14.505,14.505,0,0,0,16.5,2Zm0,26.1A11.6,11.6,0,1,1,28.1,16.5,11.615,11.615,0,0,1,16.5,28.1Zm0-20.3a5.8,5.8,0,0,0-5.8,5.8h2.9a2.9,2.9,0,1,1,5.8,0c0,2.9-4.35,2.538-4.35,7.25h2.9c0-3.263,4.35-3.625,4.35-7.25A5.8,5.8,0,0,0,16.5,7.8Z" transform="translate(-2 -2)" fill="#fff"/>
                                        </svg>
                                    </div>
                                </div>

                        </div>

                

      
                <div className='formContact-input-fields'>

                        <div className='formContact-fullName-ID'>


                        <label htmlFor="text" className={`formContact-fullName-ID-label ${subjectIDFocused  || subjectIDHasValue ? 'focused' : ''}`}>Full Name</label>
                        
                                <input
                                    type="text"
                                    id="text"
                                    className="formContact-fullName-ID-input"
                                    onFocus={() => setSubjectIDFocused(true)}
                                    onBlur={(e) => {
                                        setSubjectIDFocused(false);
                                        setSubjectIDHasValue(e.target.value !== '');
                                    }}
                                />

                                
                        </div>


                        <div className='formContact-Email-ID'>
                                <input
                                    type="email"
                                    id="email"
                                    className="formContact-Email-ID-input"
                                    onFocus={() => setStudentIDFocused(true)}
                                    onBlur={(e) => {
                                        setStudentIDFocused(false);
                                        setstudentIDHasValue(e.target.value !== '');
                                    }}
                                />

                                <label htmlFor="numeric" className={`formContact-Email-ID-label ${studentIDFocused  || studentIDHasValue ? 'focused' : ''}`}>Your Email Address</label>
                        </div>

                        <div className='formContact-subject'>

                                <label htmlFor="text" className={`formContact-subject-label ${isFocused || hasValue ? 'focused' : ''}`}>
                                    Subject
                                </label>

                                <input
                                    type="text"
                                    id="text"
                                    className={`formContact-subject-input ${isFocused || hasValue ? 'focused' : ''}`}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                        </div>

                        <div className='formContact-message'>
                                <textarea
                                    type="edit-message"
                                    id="edit-message"
                                    className="formContact-message-input"
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={(e) => {
                                        setPasswordFocused(false);
                                        setPasswordHasValue(e.target.value !== '');
                                    }}
                                />

                                <label htmlFor="edit-message" className={`formContact-message-label ${passwordFocused  || passwordHasValue ? 'focused' : ''}`}>Your Message Goes Here</label>
                        </div>

                </div>

                <div className='formContact-buttons'>
                        <button className='formContact-submit'>Submit</button>
                </div>                        
                
            </form>
        </div>

    </div>
  )
}

export default FormContact