import React, { useEffect,useState } from 'react';
import axios from 'axios';
// import { Chart } from 'chart.js';

const SearchOutput = ({query, sheet}) => {

    const [data, setData] = useState({});
    
    useEffect(() => {
        console.log(query);
        if (query.length == 0 || sheet.length == 0) {
            return;
        } 
        axios.get('http://localhost:8000/api/search', {params: {query, sheet}})
        .then((response) => response.data)
        .then((jsonData) => {
            return jsonData;
        })
        .then((jsonData) => setData(jsonData))
        .catch((error) => {
          // Handle any errors
          console.log(error);
        });
    }, [query, sheet]);

    return (
        <div>
            {JSON.stringify(data)}
            {/* {data} */}
        </div>
    );
};

export default SearchOutput;