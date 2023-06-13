import React, { useState } from 'react';
import axios from 'axios';

const Data = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/api/data')
          .then((response) => response.json())
          .then((jsonData) => setData(jsonData))
          .catch((error) => {
            // Handle any errors
          });
      }, []);
    

    return (
        <div>
        <table>
          <thead>
            <tr>
              <th>Indicators</th>
              <th>Areas</th>
              {/* Add more column headers if needed */}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.column1}</td>
                <td>{item.column2}</td>
                {/* Render more columns if needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

};

export default Data;