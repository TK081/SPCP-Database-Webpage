// app.use(express.json());
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000
app.use(express.static('public'));

/* 
*-----------------------*
* Packages              *
*                       *
* npm install axios     *
* npm install xlsx      *
* npm install cors      *
*-----------------------*
*/


// Enable CORS for all routes
app.use(cors());

// Code to read in excel data file using XLSX & SheetJS
const path = require('path');
const XLSX = require('xlsx');
const filePath = path.join(__dirname, 'excelfiles', 'praythisworksv2.xlsx');

app.get('/api/sheetNames', (req, res) => {
  const workbook = XLSX.readFile(filePath);
  const sheetNames = workbook.SheetNames;
  res.json({ sheetNames });
});

// Check endpoint in both server.js & Dropdown.js
// http://localhost:8000/api/sheet/Canada%20Statistics
// http://localhost:8000/api/sheet/Peel%20Region%20Statistics
app.get('/api/sheet/:sheetName',(req, res) => {

  const workbook = XLSX.readFile(filePath);
  const sheetName = decodeURIComponent(req.params.sheetName);
  const sheet = workbook.Sheets[sheetName];
  console.log('Sheet Object:', sheet);
  const jsonData = XLSX.utils.sheet_to_json(sheet);
  res.json({ sheetData: jsonData });

  // const sheetName = workbook.SheetNames;
  // res.json({sheetName});
  //const worksheet = workbook.Sheets[sheetnames];
  //const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetnames]);

});

// http://localhost:8000/api/search?query=helloworld

app.get('/api/search', (req, res) => {

  //res.send('Hello from the search endpoint');
  console.log('Received request at /api/search');
  const query = req.query.query;
  // Implement our own search logic 
  console.log('Query:',query);
  res.json(query)

});

app.listen(port, () => {
  console.log('Server is running on port 8000');
});

// app.post('/search', (req, res) => {
//     const { searchQuery } = req.body;
//     // Perform any necessary actions with the search query
//     console.log(searchQuery);
//     // Send a response back to the client
//     res.send('Search results');
//   });