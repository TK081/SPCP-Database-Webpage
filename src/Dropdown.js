import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dropdown = () => {
  const [sheetNames, setSheetNames] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState('');

  const handleSheetSelect = (event) => {
    setSelectedSheet(event.target.value);
  };

  useEffect(() => {

//     axios.get('http://localhost:8000/api/sheet', {
//   params: {
//     sheetName: 'Peel Region Statistics' // Use the correct sheet name from your Excel file
//   }
// })
    axios.get('http://localhost:8000/api/sheetNames')
    .then((response) => {
      console.log(response);
      setSheetNames(response.data.sheetNames);
    })
    .catch((error) => {
    //   // Handle any errors
    });
    }, []);
   

  const handleSheetLoad = () => {
    if (sheetNames.includes(selectedSheet)) {
      // The selected sheet is valid, load it
      // console.log('This is the selected sheet:', selectedSheet);
      axios.get(`http://localhost:8000/api/sheet/${encodeURIComponent(selectedSheet)}`, {
        params: {
          sheetName: selectedSheet
        }
      })
        .then((response) => {
          // Handle the response with the selected sheet data in the backend
          console.log('Selected Sheet Data:', response.data.sheetData);
        })
        .catch((error) => {
          // Handle any errors
        });
    } else {
      // The selected sheet is not valid
      console.log('Invalid sheet selection');
    }
      
  }; 

  return (
    <div>

<select className='dropdown' value={selectedSheet} onChange={handleSheetSelect}>

<option value="">Select a sheet</option>
    {sheetNames.map((sheetNames) => (
    <option key={sheetNames} value={sheetNames}>
    {sheetNames}
    </option>
 ))}

 </select>
      <button className ='button' onClick={handleSheetLoad}>Load Sheet</button>
    </div>
  );
};

export default Dropdown;