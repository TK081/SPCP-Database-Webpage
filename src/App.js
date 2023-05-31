import React, { useState } from "react";
import './App.css';
import image from './images/spcp.jpg';
import {FaQuestion , FaDownload} from 'react-icons/fa';
import SearchBar from "./SearchBar";
import Dropdown from "./Dropdown";
import 'typeface-montserrat';

/* 
*------------------------------------*
*  Packages                          *
*                                    *
*   npm install react-icons --sav    *
*   npm install typeface-montserrat  *
*------------------------------------*
*/

function App() {

  // Code for help button pop up message
  const [showPopup, setShowPopup] = useState('');

  const handleHelp = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 5000); // Hide the popup after 5 seconds
  };

  // All HTML elements and components as they appear
  return (

    <div className = "container">

      {/* // Title of Webpage */}
      <h1>Portraits of Peel Database Webpage</h1>

      {/* // Paragraph #1 */}
      <div className = "paragraph">
        <p>Are you looking for information about South Asians within Peel, provincially, or nationally? </p>  
        <p>Look no further! Portraits of Peel has been collecting data since 1965 and helping curious </p> 
        <p>minds like yours use our data analysis to your advantage! Click the drop-down menu and </p>
        <p>get the information you need :)</p>
      </div>

      {/* // Paragraph #2 */}
      <div className="paragraphtwo">
        <h2>Dropdown Menu</h2>
        <p>This dropdown menu will allow you to cycle through three different profiles, which</p>
        <p>all contain unique data for specific areas.</p>
      </div>

      {/* // Dropdown Menu Component */}
       <Dropdown/>

      {/* // Logo */}
      <img className="logo" src={image} alt="SPCP Logo" />

      {/* // Paragraph #3 */}
      <div className="paragraphthree">
        <h2>Searchbar for database and search queries </h2>
        <p>This search bar allows for the user to input unique searches, which will allow</p>
        <p> for the needed table of data to be outputted.</p>
      </div>

      {/* // Search Bar Component */}
        <SearchBar/>

      {/* // Help & Download Buttons */}
      <div>
        <button className="button" onClick={handleHelp}><FaQuestion/></button>
        {showPopup && <div className="popup">Search in this format: "Indicator/Area"</div>}
        <button className="button"><FaDownload/></button>
      </div>

    </div>
  );
}

export default App;