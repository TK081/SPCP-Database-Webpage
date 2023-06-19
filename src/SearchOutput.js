import React, { useEffect,useState , useRef } from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import {BarElement, CategoryScale, Chart, LinearScale} from 'chart.js';
import { Bar } from 'react-chartjs-2'

const SearchOutput = ({query, sheet}) => {

    const [data, setData] = useState([]);
    const chartRef = useRef(null);

    Chart.register(
      CategoryScale,
      LinearScale,
      BarElement
    )
    
    useEffect(() => {
        console.log(query);
        if (query.length === 0 || sheet.length === 0) {
            return;
        } 

        if (chartRef.current !== null) {
          chartRef.current.destroy();
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

      const renderBarChart = () => {
        if (Object.keys(data).length === 0) {
          return null;
        }
    
        const chartData = {
          labels: categories,
          datasets: [{
            label: `${indicator}/${area}`,
            data: areasValues,
            borderWidth: 1
          }]
        };
    
        const options = {
          maintainAspectRatio: false,
          plugins: {
            title: {
                display: true,
                text:`${indicator}/${area}`,
                fontSize: 16,
                padding: {
                  top: 10,
                  bottom: 10
                }
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          },
          legend: {
            labels: {
              fontSize: 26
            }
          }
        };
    
        return (
          <div>
            <Bar 
              data={chartData}
              height={200}
              options={options}
            />
          </div>
        );
      };

      return (
      <div className='render'>

        <div class="table">
          {renderTable()}
        </div>

        <div class="graph">
          {renderBarChart()}
        </div>
          
      </div>

      );
};

export default SearchOutput;