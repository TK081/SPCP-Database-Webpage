import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

const SearchBar = ({sheet}) => { 

    const [query , setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    // const [searchResults, setSearchResults] = useState('');
    const [data, setData] = useState([]);


    const handleSearchQuery = async (event) => {
        const value = event.target.value;
        setSearchQuery(event.target.value);
        if (value === '') {
            setSuggestions([]);
        } else {
            const response = await axios.get(`http://localhost:8000/autocomplete?term=${value}&sheet=${encodeURIComponent(sheet)}`);
            setSuggestions(response.data);
        }
    };

    const handleSuggestionClick = (suggestions) => {
        setSearchQuery(suggestions);
        setSuggestions([]);
      };

    const handleSearchClick = (event) => {
        event.preventDefault();
        axios.get('http://localhost:8000/api/search', {params: {query, sheet}})
        .then((response) => {
            console.log('Search Results:', response.data); 
        })

        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const DataComponent = () => {      
        useEffect(() => {
          fetch('/api/search')
            .then((response) => response.json())
            .then((jsonData) => setData(jsonData))
            .catch((error) => {
              // Handle any errors
            });
        }, []);

    return ( 
        <div class = "search"> 
        <form onSubmit={handleSearchClick} >

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

            <div className = "suggest-box">
            <ul>
        {suggestions && suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion)}>{suggestion}</li>
        ))}
      </ul>
      </div>

        </form> 
        </div> 
    ); 
}; 

export default SearchBar;