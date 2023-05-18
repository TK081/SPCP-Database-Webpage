import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import {readFile, utils} from 'xlsx';

const SearchBar = () => { 

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState('');

    const handleSearchQuery = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = () => {
        localStorage.setItem('searchQuery', searchQuery);
        const workbook = readFile('excelfiles/Cleaned_Up_Data.xlsx');
        const sheetName = workbook.SheetNames[0]; // Assuming the first sheet is the one you want to search
        const worksheet = workbook.Sheets[sheetName];
        const data = utils.sheet_to_json(worksheet);
        const matchingRows = data.filter((row) => {
        // Customize the logic to match the search query against the desired cell value(s)
        // For example, if you want to match the search query against a specific column:
            return row.columnName === searchQuery;
        });
    };

    return ( 
        <div class = "functionButtons"> 
            <input className="search-bar"
                type="text"
                value={searchQuery}
                onChange={handleSearchQuery}
                placeholder="Search..."
            />
            <button className="search-button" onClick={handleSearchClick}><FaSearch/></button>
            <div>
                {searchResults}
            </div>
        </div>
    ); 
}; 

export default SearchBar;