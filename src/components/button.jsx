import { useState } from "react";
import "./index.css";
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
      <button
        className={activeButton === "Meet R5" ? "active-button" : ""}
        onClick={() => handleButtonClick("Meet R5")}
      >
        Meet R5
      </button>
    </>
  );
}

export default Button;
