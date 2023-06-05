import React, { useState , useRef} from "react";
import './App.css';
import image from './images/spcp.jpg';
import imagetwo from './images/questionmark.png'
import {FaQuestion , FaDownload} from 'react-icons/fa';
import SearchBar from "./SearchBar";
import Dropdown from "./Dropdown";
import 'typeface-montserrat';
//pray this works

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
  // const [showPopup, setShowPopup] = useState('');

  // const handleHelp = () => {
  //   setShowPopup(true);
  //   setTimeout(() => {
  //     setShowPopup(false);
  //   }, 5000); // Hide the popup after 5 seconds
  // };

  // All HTML elements and components as they appear

  const popupRef = useRef(null);

  function openPopup(){
popupRef.current.classList.add("open-popup")
  }

  function closePopup(){
    popupRef.current.classList.remove("open-popup")
      }

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
        <button className="button" type ="submit" onClick={openPopup}><FaQuestion/></button>
        <div className="popup" ref={popupRef} id="popup">
          <img src={imagetwo} />
          <h2>Help</h2>
          <p>Search in this format: "Indicator/Area</p>
          <button type="button" onClick={closePopup}>OK</button>
        </div>
        <button className="button"><FaDownload/></button>
      </div>

    </div>
  );
}

export default App;