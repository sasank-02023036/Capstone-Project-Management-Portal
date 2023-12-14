import React from "react";
import Navbar from "components/Header/navbar";
import Footer from "components/Footer/footer";
import FooterPlain from "components/Footer/footerPlain";

const LearnMoreAboutClientsAndProjects = () => {
  return (
    
    <div className="container" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div>
      <h2>Learn More About Clients and Projects</h2>
      <p>
        Welcome to the Learn More page! Here, you can find detailed information
        about the clients for this semester at UMass Boston and the ongoing
        projects.
      </p>
      <h3>Clients</h3>
      <p>
        Our clients play a crucial role in the success of our projects. They
        come from diverse backgrounds and industries, providing real-world
        challenges for our students to tackle.
      </p>
      <h3>Projects</h3>
      <p>
        Explore the various projects undertaken by our students. These projects
        cover a wide range of topics and technologies, showcasing the talent and
        innovation of our student community.
      </p>
    </div>

    <div className="flex-grow" style={{ flex: 1, height:200 }}>
                {/* Content of your component goes here */}
                </div>
    <div className="flex-grow" style={{ flex: 1, height:200 }}>
    {/* Content of your component goes here */}
    </div>
      

      <div className="bottom">
        <Footer />
        <FooterPlain />
      </div>
    </div>
  );
};

export default LearnMoreAboutClientsAndProjects;
