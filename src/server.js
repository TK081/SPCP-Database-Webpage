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
// const XLSX = require('xlsx');
const ExcelJS = require('exceljs');
const filePath = path.join(__dirname, 'excelfiles', 'praythisworksv2.xlsx');

// Load the workbook
// const workbook = await ExcelJS.readFile(filePath, {cellStyles:true});
// const sheetName = 'Peel Region Statistics'; // Replace with the actual sheet name
// const worksheet = workbook.Sheets[sheetName];
// const columnLetter = 'A';
// const boldedCells = [];

// const workbook = new ExcelJS.Workbook();
// const workbook = await workbook.xlsx.readFile(filePath);
// const sheetNames = workbook.SheetNames;
// const worksheet = workbook.getWorksheet(sheetNames); // Replace 'Sheet1' with the actual sheet name

// const ExcelJS = require('exceljs');

const readExcel = async () => {
  // Code to loop through the first column and extract all bolded indicators
  // const workbook = new ExcelJS.Workbook();
  // await workbook.xlsx.readFile(filePath);
  // const worksheet = workbook.getWorksheet('Canada Statistics'); // Replace 'Sheet1' with the name of your sheet

  // const boldedText = [];

  // worksheet.getColumn('A').eachCell((cell, rowNumber) => {
  //   if (cell.font && cell.font.bold) {
  //     boldedText.push(cell.value);
  //   }
  // });

  // console.log(boldedText);

  const readExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Canada Statistics'); // Replace 'Sheet1' with the name of your sheet
  
    const boldedText = [];
  
    const startRow = 1; // Start from row 2 (excluding header)
    const endRow = 225; // End at row 10
  
    for (let rowNumber = startRow; rowNumber <= endRow; rowNumber++) {
      const cell = worksheet.getCell(`A${rowNumber}`); // Assuming you're searching in the first column
      if (cell.font && cell.font.bold) {
        boldedText.push({
          text: cell.value,
          position: {
            row: rowNumber,
            column: 1, // Assuming you're searching in the first column
          },
        });
      }
    }
  
    console.log(boldedText);
  };
  
  readExcel();

};

// readExcel();

// function PrintAndReturn(value, label){
//   console.log(`${label}: ${value}`);
//   return value;
// }

// for (let row = 1; worksheet[`${columnLetter}${row}`] || worksheet[`${columnLetter}${row + 1}`]; row++) {
//   const cell = worksheet[`${columnLetter}${row}`];
//   console.log(cell);
//   if (!cell){
//     continue;
//   }

//   if (cell.s && cell.s.bold) {
//     boldedCells.push(cell.v); // Append the cell value to the array
//     // console.log(cell.s);
//     // console.log(cell.s.bold);
//   }
// }

// console.log(boldedCells);

// for (let cellAddress in sheet) {
//   if (sheet.hasOwnProperty(cellAddress)) {
//     // Get the cell value and style
//     const cell = sheet[cellAddress];
//     const value = cell.v;
//     const style = cell.s;
//     // console.log(cell);
//     // console.log(value);
//     // console.log(style);

//     // Check if the cell is in the first column and has bold formatting
//     if (cellAddress.match(/^  A\d+$/) && style && style.font && style.font.bold) {
//       // Add the cell value to the boldedCells array
//       // console.log(value);
//       // console.log(style);
//       boldedCells.push(value);
//     }
//   }
// }

// app.get('/api/sheetNames', (req, res) => {
//   const workbook = XLSX.readFile(filePath);
//   const sheetNames = workbook.SheetNames;
//   res.json({ sheetNames });
// });

// Check endpoint in both server.js & Dropdown.js
// http://localhost:8000/api/sheet/Canada%20Statistics
// http://localhost:8000/api/sheet/Peel%20Region%20Statistics
// app.get('/api/sheet/:sheetName',(req, res) => {

//   const workbook = XLSX.readFile(filePath);
//   const sheetName = decodeURIComponent(req.params.sheetName);
//   const sheet = workbook.Sheets[sheetName];
//   console.log('Sheet Object:', sheet);
//   const jsonData = XLSX.utils.sheet_to_json(sheet);
//   res.json({ sheetData: jsonData });

//   // const sheetName = workbook.SheetNames;
//   // res.json({sheetName});
//   //const worksheet = workbook.Sheets[sheetnames];
//   //const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetnames]);

// });

// http://localhost:8000/api/search?query=helloworld
// app.get('/api/search', (req, res) => {

//   //res.send('Hello from the search endpoint');
//   console.log('Received request at /api/search');
//   const query = req.query.query;
//   // Implement our own search logic 
//   console.log('Query:',query);
//   res.json(query)

// });

app.listen(port, () => {
  console.log('Server is running on port 8000');
});