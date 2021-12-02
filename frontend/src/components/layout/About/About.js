import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";

const About = () => {
  const visitInstagram = () => {
    window.open("https://instagram.com/moiz_ratlam77",'_blank');
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://media-exp1.licdn.com/dms/image/C4E03AQF8kSzoRvRBSw/profile-displayphoto-shrink_800_800/0/1607677247882?e=1643846400&v=beta&t=BCKOpROzzRoui5Yra5ZpVTyza4vMYwDPbhNimA3WXhI"
              alt="Founder"
            />
            <Typography>Moiz Ratlamwala</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              Created by Moiz Ratlamwala
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;