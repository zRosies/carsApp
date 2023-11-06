import { useState } from "react";
import "./index.css";

function Button() {
  const [activeButton, setActiveButton] = useState("Discover More");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <>
      <button
        className={activeButton === "Discover More" ? "active-button" : ""}
        onClick={() => handleButtonClick("Discover More")}
      >
        Discover More
      </button>
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
