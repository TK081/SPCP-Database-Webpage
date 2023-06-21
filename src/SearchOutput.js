import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const SearchOutput = ({query, sheet}) => {

    const [data, setData] = useState([]);
    // const chartRef = useRef(null);

    // Chart.register(
    //   CategoryScale,
    //   LinearScale,
    //   BarElement
    // )
    
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

    const { indicator, area, categories, areasValues } = data;

    const renderTable = () => {
        if (Object.keys(data).length === 0) {
          return;
        }
    
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

      const renderChart = () => {
        if (Object.keys(data).length === 0 || !areasValues || areasValues.length === 0) {
          return null;
        }

        const isPercentage = areasValues.every((value) => {
          if (typeof value !== 'string') {
            return false; // Not a string, not a percentage
          }
          return value.endsWith('%');
        });

        const chartData = {
          labels: categories,
          datasets: [
            {
              label: `${indicator}/${area}`,
              data: areasValues.map((value) => {
                if (typeof value === 'string') {
                  return parseFloat(value.replace('%', ''));
                }
                return value;
              }),
              backgroundColor: generateColors(categories.length),
              borderWidth: 1,
            },
          ],
        };
      

        if (isPercentage) {
      
          const options = {
            maintainAspectRatio: true,
            plugins: {
              title: {
                display: true,
                text: `${indicator}/${area}`,
                fontSize: 16,
                padding: {
                  top: 10,
                  bottom: 10,
                },
              },
            },
            responsive: true,
          };
      
          return (
            <div>
              <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                <Pie data={chartData} options={options} />
              </div>
            </div>
          );


        }

        else{
      
          const options = {
            maintainAspectRatio: true,
            plugins: {
              title: {
                display: true,
                text: `${indicator}/${area}`,
                fontSize: 16,
                padding: {
                  top: 10,
                  bottom: 10,
                },
              },
            },
            scales: {
              x: {
                display: false,  // Set display to false to hide the x-axis labels
              },
              y: {
                beginAtZero: true,
              },
            },
            responsive: true,
            interaction: {
              mode: 'index',
              intersect: false,
            },
          };
  
          const chartContainerStyle = {
            width: '100%',
            minWidth: '950px',
            maxWidth: '1500px', // Adjust the maximum width based on your preference
            margin: '0 auto', // Center the chart horizontally
          };
  
          return (
            <div style={chartContainerStyle}>
              <Bar data={chartData} options={options} />
            </div>
          );

        }
    
       
      };

      const generateColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
          const color = `rgba(${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, 0.6)`;
          colors.push(color);
        }
        return colors;
      };
      
      // Function to generate a random number between min and max (inclusive)
      const getRandomValue = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };

      return (
      <div className='render'>

        <div class="table">
          {renderTable()}
        </div>

        <div className="graph">
          {renderChart()}
          </div>
          
      </div>

      );
};

export default SearchOutput;