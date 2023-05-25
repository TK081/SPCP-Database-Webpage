import React, { useState } from 'react';

// const options = [
//   { value: 'Peel Region Statistics', label: "Profile 1" },
//   { value: 'Canada Statistics', label: "Profile 2" }
// ];

    <div>
    <select className="dropdown" value={selectedSheet} onChange={(event) => setSelectedSheet(event.target.value)}>
    <option value="">Select Excel File</option>
    {options.map((option) => (
        <option key={option.value} value={option.value}>
            {option.label}
        </option>
    ))}
    </select>
    </div>

const Dropdown = () => {
  const [selectedSheet, setSelectedSheet] = useState('');

  const handleSheetSelect = (event) => {
    setSelectedSheet(event.target.value);
  };

  const handleSheetLoad = () => {
    // Load the selected sheet here using SheetJS or any other library
    console.log('Loading sheet:', selectedSheet);
  };

  return (
    <div>
      <select value={selectedSheet} onChange={handleSheetSelect}>
        <option value="">Select a sheet</option>
        <option value="Sheet1">Peel Region Statistics</option>
        <option value="Sheet2">Ontario Statistics</option>
        {/* Add more options for each sheet */}
      </select>
      <button onClick={handleSheetLoad}>Load Sheet</button>
    </div>
  );
};

export default Dropdown;