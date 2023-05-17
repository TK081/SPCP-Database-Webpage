import React, { useState } from "react";
import './App.css';
import image from './images/spcp.jpg';
import { FaQuestion } from 'react-icons/fa';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';


function App() {

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Handle search logic here
  };

  const [showPopup, setShowPopup] = useState(false);
  
  const handleHelp = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 5000); // Hide the popup after 2 seconds

  };

  // Inside the component
  const [selectedFile, setSelectedFile] = useState("");

  return (
    <div className = "container">
      <h1>Portraits of Ontario</h1>
      <p>Basic information about the webpage</p>  
      <h2>Drop down Menu</h2>
      <p>Drop down menu paragraph</p>
      <img className="logo" src={image} alt="SPCP Logo" />
      <h2>Header about search bar</h2>
      <p>Placeholder information about webpage, database, and organization </p>
      
      <div class = "functionButtons">
      <input className="search-bar"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />

      <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      <button className="button" onClick={handleHelp}><FaQuestion/></button>
      {showPopup && <div className="popup">Search in this format: "Indicator/Area"</div>}
      <button className="button">Download</button>
      

    </div>
  );
}

export default App;
