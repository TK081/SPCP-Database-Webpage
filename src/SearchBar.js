import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => { 

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState('');

    const handleSearchQuery = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = () => {
        localStorage.setItem('searchQuery', searchQuery);
    };

    return ( 
        <div class = "search"> 
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