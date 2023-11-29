import React from "react";
import axios from "axios";
import "../../styles/ProjectPreview.css";
import { Typography } from "@mui/material";

export default function ProjectPreview({ projectId, handleClose }) {
    const [project, setProject] = React.useState({});
    
    React.useEffect(()=>{
        async function fetchPdf() {
        try {
            const response = await axios.get(`/api/project/${projectId}?pdf=false`);
            if (response.status === 500) {
                console.log("project doesnt exist");
            } else {
                setProject(response.data);
            }
        } catch (err) {
            console.log(err);
        }}
        fetchPdf();
    },[projectId]);

    const downloadPDF = async () => {
      try {
        const response = await axios.get(`/api/project/${projectId}?pdf=true`, {
          responseType: "blob",
        });
        console.log(response);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${projectId}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } catch (err) {
        console.log("Error downloading PDF file", err);
      }
    };
    
    if (!project) {
        return <div>Loading...</div>;
    }

    return (
      <div className="popup">
          <div className="popup-wrapper"> 
            
            
            <div className="popup-content">

                <div className="pdf-top">
                    <div className="title">{project.name}</div>

                    
                    {/* Close icon goes here */}
                    <div className='popup-close-wrapper'>
                                                  <div className='popup-close' onClick={handleClose}>
                                                      <div className='popup-close-button'> 
                                                          <svg className='cSvg' xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 14 14">
                                                              <path id="ic_close_24px" d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)"/>
                                                          </svg>
                                                      </div>
                                                  </div>
                    </div>

                </div>

                <div className="popup-content-01">

                    <div className="popup-content-header"> 
                        Description
                    </div>


                    <div className="popup-content-desc">    
                        <p>{project.description}</p>
                    </div>  


                    <div  className="popup-content-header">
                        Administrators
                    </div>

                    <div className="popup-content-desc">
                      <p><Typography>{project.administrators}</Typography></p>
                    </div>


                    <div className="popup-content-header"> 
                        Skills & Technologies Required
                    </div>

                    <div className="popup-content-desc">
                        <p>{project.skills}</p>
                    </div>
                        
                    <div  className="popup-content-header">
                        Resources Provided
                    </div>

                    <div className="popup-content-desc">
                        <p>{project.resources}</p>
                    </div>

                    <div  className="popup-content-header">
                      Expect Project Deadline
                    </div>

                    <div className="popup-content-desc">
                      <p>{project.deadline}</p>
                    </div>

            </div>


            <div className="pdf-download">
                   
                   <div className="attachments">
                      Additional Information
                   </div>

                    <div className="p-d">
                        <div className="popup-download" onClick={downloadPDF}>
                        Download PDF
                        </div>
                    </div>
                    
            </div>

              

            </div>



          </div>
      </div>
    );
  }
  