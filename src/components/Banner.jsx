import truckLogo from "../images/whitebordertruck.svg";
import React from "react";
//import PropTypes from "prop-types";
import "./Banner.css";

export default function Banner() {
  const song = new Audio("https://media1.vocaroo.com/mp3/13mciD8mPyEj");
  const playAudio = () => {
    song.play();
  };
  return (
    <>
      <div className="App-header">
        <div
          className="banner-box"
          onClick={() => {
            playAudio();
          }}
        >
          <img id="truckLogo" src={truckLogo} alt="truckLogo" />
        </div>
        <div>
          <span className="flyingk">FLYING K</span>
        </div>
      </div>
    </>
  );
}
