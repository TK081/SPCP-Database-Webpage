import React, { useState } from "react";
import './App.css';
import image from './images/spcp.jpg';
import {FaQuestion , FaDownload} from 'react-icons/fa';
import SearchBar from "./SearchBar";
import 'typeface-montserrat';

// Hi

function App() {

  // Code for help button pop up message
  const [showPopup, setShowPopup] = useState('');

  const handleHelp = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 5000); // Hide the popup after 2 seconds
  };

  // Code for drop down menu for excel files
  const [selectedSheet, setSelectedSheet] = useState("");

  const options = [
    { value: 'Peel Region Statistics', label: "Profile 1" },
    { value: 'Canada Statistics', label: "Profile 2" }
  ];

  // All HTML elements and components as they appear
  return (

    <div className = "container">

      <h1>Portraits of Peel Database Webpage</h1>

      <div className = "paragraph">
        <p>Are you looking for information about South Asians within Peel, provincially, or nationally? </p>  
        <p>Look no further! Portraits of Peel has been collecting data since 1965 and helping curious </p> 
        <p>minds like yours use our data analysis to your advantage! Click the drop-down menu and </p>
        <p>get the information you need :)</p>
      </div>

      <div className="paragraphtwo">
        <h2>Dropdown Menu</h2>
        <p>This dropdown menu will allow you to cycle through three different profiles, which</p>
        <p>all contain unique data for specific areas.</p>
      </div>

      <div >
        <select className="dropdown" value={selectedSheet} onChange={(event) => setSelectedSheet(event.target.value)}>
        <option value="">Select Excel File</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        </select>
      </div>

      <img className="logo" src={image} alt="SPCP Logo" />

      <div className="paragraphthree">
        <h2>Searchbar for database and search queries </h2>
        <p>This search bar allows for the user to input unique searches, which will allow</p>
        <p> for the needed table of data to be outputted.</p>
      </div>

        <SearchBar/>

      <div>
        <button className="button" onClick={handleHelp}><FaQuestion/></button>
        {showPopup && <div className="popup">Search in this format: "Indicator/Area"</div>}
        <button className="button"><FaDownload/></button>
      </div>

    </div>
  );
}

export default App;