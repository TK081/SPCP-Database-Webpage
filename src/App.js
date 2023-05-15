import React, { useState } from "react";
import './App.css';
import image from './images/spcp.jpg';
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

  return (
    <div className="container">
      <h1>Portraits of Ontario</h1>
      <img className="logo" src={image} alt="SPCP Logo" />
      <p>Basic information about the webpage</p>
      <h2>Header about search bar</h2>
      <p>Placeholder information about webpage, database, and organization </p>
      <input className="search-bar"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <button className="search-button" onClick={handleSearch}>Search</button>
      <button className="button" onClick={handleHelp}>Help</button>
      {showPopup && <div className="popup">Search in this format: " "</div>}
      <button className="button">Download</button>
      
    </div>
  );
}

export default App;
