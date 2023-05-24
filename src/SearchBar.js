import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

const SearchBar = () => { 

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState('');

    const handleSearchQuery = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = async (event) => {
        //localStorage.setItem('searchQuery', searchQuery);
        event.preventDefault();
    
    try {
      const response = await axios.get(`/search?query=${searchQuery}`);
      // Process the response data as needed
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    };

    return ( 
        <form onSubmit={handleSearchClick} >
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

        </form> 
    ); 
}; 

export default SearchBar;