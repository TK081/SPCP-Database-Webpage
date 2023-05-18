import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => { 

    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = () => {
        localStorage.setItem('searchQuery', searchQuery);
    }

    return ( 
        <div class = "functionButtons"> 
            <input className="search-bar"
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search..."
            />
            <button className="search-button" onClick={handleSearchClick}><FaSearch/></button>
        </div>
    ); 
}; 

export default SearchBar;