const express = require('express');
const app = express();
const port = 5000;



// Code to read in excel data file using XLSX & SheetJS
// const path = require('path');
const XLSX = require('xlsx');
// const filePath = path.join(__dirname, 'excelfiles', '2016_Statistics_Updated.xlsx');
// const workbook = XLSX.readFile(filePath);
// const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
// // const secondSheet = workbook.Sheets[workbook.SheetNames[1]];
// console.log(firstSheet);
// console.log();
// console.log(secondSheet);

app.post('/search', (req, res) => {
    const { searchQuery } = req.body;
    // Perform any necessary actions with the search query
    console.log(searchQuery);
    // Send a response back to the client
    res.send('Search results');
  });
  


app.get('/', (req, res) => {
    res.send('Hello, World!'); // Send a simple message as a response
  });
  

app.get('/sheets/:sheetName', (req, res) => {
    const workbook = XLSX.readFile('excelfiles/2016_Statistics_Updated.xlsx');
    const sheetName = req.params.sheetName;
    const sheet = workbook.Sheets[sheetName];
    
    if (!sheet) {
      res.status(404).send('Sheet not found');
      return;
    }
    
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    
    console.log(jsonData); // Output the sheet data to the console
    
    res.json(jsonData); // Send the sheet data as a response
    
  });
  
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });


// app.get('/', (req, res) => {
//   res.send('Hello from Express!');
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
