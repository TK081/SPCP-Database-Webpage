import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

const SearchBar = () => { 

    const [query , setSearchQuery] = useState('');
    // const [searchResults, setSearchResults] = useState('');

    const handleSearchQuery = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = (event) => {
        //localStorage.setItem('searchQuery', searchQuery);
        event.preventDefault();
        axios.get('http://localhost:8000/api/search', {params: {query}})
        .then((response) => {
            // setSearchQuery(response.data.query)
            console.log('Search Results:', response.data); 
        })

        .catch((error) => {
            console.error('Error:', error);
        });
    
        // try {
        //     const response = await axios.get(`/search?query=${searchQuery}`);
        //     // Process the response data as needed
        //     console.log(response.data);
        // } catch (error) {
        //     console.error(error);
        // }
        
    };

    return ( 
        <form onSubmit={handleSearchClick} >
        <div class = "search"> 
            <input className="search-bar"
                type="text"
                value={query}
                onChange={handleSearchQuery}
                placeholder="Search..."
            />
            <button className="search-button" type ="submit"><FaSearch/></button>
            <div>
                {setSearchQuery}
            </div>
        </div> 

        </form> 
    ); 
}; 

export default SearchBar;