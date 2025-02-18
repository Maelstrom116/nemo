import React, { useState } from "react";

const buttonStyle = {
  padding: "10px 15px",
  textAlign: "left",
  color: "#E3F1FC",
  border: "none",
  //borderRadius: '10px',
  backgroundColor: "#0E162C",
  width: "100%",
  textTransform: "uppercase",
  marginBottom: "5px",
  cursor: "pointer",
  transition: "color 0.3s ease",
  fontFamily: '"Roboto", sans-serif',
  fontWeight: "900",
};

const activeButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#081020",
  color: "#FF743E",
};

const Navbar = ({ setActiveButton }) => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [activeButton, setActiveButtonLocally] = useState(null);

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
    setActiveButtonLocally(buttonNumber);
  };

  const buttonLabels = ["WELCOME", "CLUSTER", "NODES", "PODS"];

  return (
    <div className="flex">
      {/* <div style={sidebarStyle}> */}
      <div className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-nemo-blue-900 pt-5">
        {buttonLabels.map((label, i) => (
          <button
            key={i}
            className={`transition-color font-roboto mb-1 w-full cursor-pointer px-4 py-2 text-left font-bold uppercase duration-300 ${
              activeButton === i + 1 || hoveredButton === i + 1
                ? "bg-nemo-blue-950 text-nemo-orange-950"
                : "bg-nemo-blue-900 text-nemo-blue-200"
            }`}
            onClick={() => handleButtonClick(i + 1)}
            onMouseEnter={() => setHoveredButton(i + 1)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
