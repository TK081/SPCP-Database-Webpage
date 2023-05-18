import React, { useState } from 'react';

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
            <button className="search-button" onClick={handleSearchClick}>Search</button>
        </div>
    ); 
}; 

export default SearchBar;