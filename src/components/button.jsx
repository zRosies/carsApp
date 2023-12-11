import { useState } from "react";
import "../css/home.css";
import { Link } from "react-router-dom";

function Button() {
  const [activeButton, setActiveButton] = useState("Discover More");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <>
      <Link to="/cars">
        <button
          className={activeButton === "Discover More" ? "active-button" : ""}
          onClick={() => handleButtonClick("Discover More")}
        >
          Discover More
        </button>
      </Link>
      <Link to="/details/cloiwpo3j0dmn0aizkbpegx7b">
        <button
          className={activeButton === "Meet R5" ? "active-button" : ""}
          onClick={() => handleButtonClick("Meet R5")}
        >
          Meet R5
        </button>
      </Link>
    </>
  );
}

export default Button;
