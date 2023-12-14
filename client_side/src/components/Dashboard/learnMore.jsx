import React from "react";
import Navbar from "components/Header/navbar";
import Footer from "components/Footer/footer";
import FooterPlain from "components/Footer/footerPlain";

import { Typography } from "@mui/material";

const LearnMorePage = () => {
    const externalLink = "https://www.umb.edu/academics/";
  return (
    <div className="container" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />

      <div>
        <h1>Welcome to UMass Boston Courses</h1>
        <p>
            At UMass Boston, we offer a diverse range of courses to cater to
            students' academic interests and career goals. Our courses are designed
            to provide a comprehensive and enriching learning experience.
        </p>
        <h2>Key Features:</h2>
        <ul>
            <li>Wide variety of disciplines and majors</li>
            <li>Experienced faculty members</li>
            <li>State-of-the-art facilities</li>
            <li>Hands-on learning opportunities</li>
        </ul>
        <h2>Explore Our Departments:</h2>
        <p>
            Whether you are interested in arts and humanities, sciences, business,
            or technology, UMass Boston has something for everyone. Explore our
            departments to find the perfect fit for your academic journey.
        </p>
        <Typography variant="h4">Learn More Page</Typography>
        <Typography variant="body1">
            Welcome to the Learn More page! Here, you can find information about all
            the courses offered at UMass Boston.
        </Typography>
        <Typography variant="body2">
            <a href={externalLink} target="_blank" rel="noopener noreferrer">
            Visit UMass Boston Academics
            </a>
        </Typography>
        {/* Add links or additional content as needed */}
    </div>

      <div className="bottom">
        <Footer />
        <FooterPlain />
      </div>
    </div>
  );
};

export default LearnMorePage;