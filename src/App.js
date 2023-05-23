import React, { useState } from "react";
import './App.css';
import image from './images/spcp.jpg';
import {FaQuestion , FaDownload} from 'react-icons/fa';
import excelFile1 from './excelfiles/Cleaned_Up_Data.xlsx';
import excelFile2 from './excelfiles/South_Asian_Cleaned_Up_Data_-_Provinces.xlsx';
import excelFile3 from './excelfiles/First_Native_Languages_Spoken.png';
import SearchBar from "./SearchBar";
import 'typeface-montserrat';
import {readFile, utils} from 'xlsx';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

function App() {

  const XLSX = require('xlsx')

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
    { value: 'Dummy_Data_1.xlsx', label: "Profile 1" },
    { value: excelFile2, label: "Profile 2" },
    { value: excelFile3, label: "Profile 3" }
  ];

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
      <div>
      <select value={selectedFile} onChange={(event) => setSelectedFile(event.target.value)}>
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