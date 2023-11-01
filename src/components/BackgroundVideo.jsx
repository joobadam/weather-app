import React from "react";
import clouds from "../assets/clouds.mp4";

const BackgroundVideo = () => {
  return (
    <div>
      <video src={clouds} autoPlay loop muted />
    </div>
  );
};

export default BackgroundVideo;
