import React, { useEffect, useState } from 'react';
import axios from 'axios';

    // const options = [
    //   { value: 'Peel Region Statistics', label: "Profile 1" },
    //   { value: 'Canada Statistics', label: "Profile 2" }
    // ];

    // <div>
    // <select className="dropdown" value={selectedSheet} onChange={(event) => setSelectedSheet(event.target.value)}>
    // <option value="">Select Excel File</option>
    // {options.map((option) => (
    //     <option key={option.value} value={option.value}>
    //         {option.label}
    //     </option>
    // ))}
    // </select>
    // </div>

const Dropdown = () => {
  const [sheetNames, setSheetNames] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState('');

  const handleSheetSelect = (event) => {
    setSelectedSheet(event.target.value);
  };

  useEffect(() => {
    axios.get('http://localhost:8000/sheetNames')
    .then((response) => {
    setSheetNames(response.data.sheetNames);
    })
    .catch((error) => {
    // Handle any errors
    });
    }, []);
   

  const handleSheetLoad = () => {
    if (sheetNames.includes(selectedSheet)) {
      // The selected sheet is valid, load it
      console.log('Loading sheet:', selectedSheet);
    }

    else {
      // The selected sheet is not valid
      console.log('Invalid sheet selection');
    }
      
  }; 

  return (
    <div>

<select value={selectedSheet} onChange={handleSheetSelect}>

<option value="">Select a sheet</option>
 {sheetNames.map((sheetNames) => (
 <option key={sheetNames} value={sheetNames}>
 {sheetNames}
 </option>
 ))}

 </select>
      <button onClick={handleSheetLoad}>Load Sheet</button>
    </div>
  );
};

export default Dropdown;