import React, { useState } from "react";
import './App.css';
import image from './images/spcp.jpg';
import { FaQuestion } from 'react-icons/fa';
import excelFile1 from './excelfiles/Dummy_Data_1.xlsx';
import excelFile2 from './excelfiles/Dummy_Data_2.xlsx';
import excelFile3 from './excelfiles/Dummy_Data_3.xlsx';
import SearchBar from "./SearchBar";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

function App() {

  // Code for search bar logic
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {

    // Handle search logic here
  };

  // Code for help button pop up message
  const [showPopup, setShowPopup] = useState(false);
  
  const handleHelp = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 5000); // Hide the popup after 2 seconds
  };

  // Code for drop down menu for excel files
  const [selectedFile, setSelectedFile] = useState("");

  const options = [
    { value: "Dummy_Data_1.xlsx", label: "Profile 1" },
    { value: "Dummy_Data_2.xlsx", label: "Profile 2" },
    { value: "Dummy_Data_3.xlsx", label: "Profile 3" }
  ];

  const handleFileChange = (e) => {
    setSelectedFile(e.target.value);
  };

  return (
    <div className = "container">
      <h1>Portraits of Peel Database Webpage</h1>
      <p>Are you looking for information about South Asians within Peel, provincially, or nationally? 
        Look no further! Portraits of Peel has been collecting data since 1965 and helping curious minds like yours use our data analysis to your advantage! 
        Click the drop-down menu and get the information you need :)</p>  
      <h2>Dropdown Menu</h2>
      <p>This dropdown menu will allow you to cycle through three different profiles, which all contain unique data for specific areas.</p>
      <div>
      <select value={selectedFile} onChange={(e) => setSelectedFile(e.target.value)}>
      <option value="">Select Excel File</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
      </div>
      <img className="logo" src={image} alt="SPCP Logo" />
      <h2>Searchbar for database and search queries </h2>
      <p>This search bar allows for the user to input unique searches, which will allow for the needed table of data to be outputted.  </p>
      
      <SearchBar/>

      <button className="button" onClick={handleHelp}><FaQuestion/></button>
      {showPopup && <div className="popup">Search in this format: "Indicator/Area"</div>}
      <button className="button">Download</button>
      
    </div>
  );
}

export default App;
