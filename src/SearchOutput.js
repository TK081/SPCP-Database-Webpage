import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
// import { Chart } from 'chart.js';

const SearchOutput = ({query, sheet}) => {

    const [data, setData] = useState([]);
    
    useEffect(() => {
        console.log(query);
        if (query.length === 0 || sheet.length === 0) {
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

    const renderTable = () => {
        if (Object.keys(data).length === 0) {
          return;
        }

        const { indicator, area, categories, areasValues } = data;
    
        return (
          <table class="content-table">
            <thead>
              <tr>
                <th>{indicator}</th>
                <th>{area}</th>
              </tr>
            </thead>
            <tbody>
            {categories.map((category, index) => (
          <tr key={index}>
            <td>{category}</td>
            <td>{areasValues[index]}</td>
          </tr>
          ))}
            </tbody>
          </table>
        );
      };

      return (
        <div class="table">
          {renderTable()}
        </div>
      );
};

export default SearchOutput;