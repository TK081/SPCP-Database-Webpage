import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import {readFile} from 'xlsx';

const SearchBar = () => { 

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState('');

    const handleSearchQuery = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = () => {
        localStorage.setItem('searchQuery', searchQuery);
        const workbook = readFile('excelfiles/Cleaned_Up_Data.xlsx');
        const worksheet = workbook.Sheets['demograpic-Peel Canada Ontario'];
        const cell = worksheet['A1'];
        const cellValue = cell.v;
        console.log('Cell Value:', cellValue);
        setSearchResults(cellValue);
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