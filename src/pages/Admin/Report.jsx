import Box from "@mui/material/Box";
import Header from '../../components/AModule/Header';
import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

const Report = () => {

  let tablename = "";

  const [tableData, setTableData] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [tableNames, setTableNames] = useState([]);
  const [columnNames, setColumnNames] = useState([]);

  const getAllTables = async () => {

    try {
      const response = await axios.get('http://localhost:5000/api/v1/general/alltables');
      setTableNames(response.data.data);
      console.log("table names are : ", tableNames)
      
    } catch (error) {
      console.log("error is : \n", error.message);
    }
  };

  // const getAllColumns = async () => {
  //   try {
  //       const response = await axios.get(`http://localhost:5000/api/v1/general/allcolumns?tablename=${selectedTable}`);
  //       console.log("columns  is : ", response);
  //   } catch (error) {
  //     console.log("Error is : ", error.message);
  //   }
  // };

  useEffect(() => {
    getAllTables();
  }, []);

  const getAllColumns = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/general/allcolumns?tablename=${tablename}`);
      console.log("columns are: ", response.data);
      return response.data; // Returning the data for further processing
    } catch (error) {
      console.log("Error:", error.message);
      throw error; // Rethrowing the error for the calling code to handle
    }
  };
  
  // Usage example
  const fetchData = async () => {

      try {
        const columnsData = await getAllColumns();
        console.log("Column Names are :", columnsData.data);
        
      } catch (error) {
        console.error("Error fetching columns data:", error.message);
      }
  };

  const setTableName = async (e) => {
    setSelectedTable(e.target.value);
    tablename = e.target.value;
    console.log("Table is : ", tablename)

  }

  // useEffect(() => {
  //     fetchData();
    
  // }, [selectedTable]);

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableRows = [];

    // Add custom headings
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('PUNE INSTITUTE OF COMPUTER TECHNOLOGY', 20, 20);

    // Add table name
    doc.setFontSize(14);
    doc.text(`Report on ${selectedTable}`, 20, 30);

    // Add table header
    const tableHeader = columnNames;
    tableRows.push(tableHeader);

    // Add table data
    tableData.forEach(row => {
      const rowData = Object.values(row);
      tableRows.push(rowData);
    });

    // AutoTable plugin to generate PDF table
    doc.autoTable({
      head: [tableHeader],
      body: tableRows,
      startY: 40, // Set the Y position for the table
    });

    console.log("Table name is : ", selectedTable);
    // Save the PDF
    doc.save('report.pdf');
  };

  const setTable = async (e) => {
    console.log("Value is : ", e.target.value);


    tablename = e.target.value;
    console.log("Table is : ", tablename)
    fetchData();

    
    // setSelectedTable(e.target.value);
    // console.log("Selected table is : ", selectedTable)
  }

  return (
    <>
      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <div>
          <Header category="Page" title="Report" />
        </div>

        <div>
          <label>Select Table:</label>
          <select onChange={(e) => setTable(e)}>
            {tableNames.map((table, index) => (
              <option className="px-4 py-2" key={index} value={table.Tables_in_inhouse_hod}>{table.Tables_in_inhouse_hod}</option>
            ))}
          </select>

          <label>Select Filters:</label>
          {/* Checkbox for selecting filters */}
          {/* Use columnNames fetched from the backend API */}
          <div>
            {columnNames.map((column) => (
              <label key={column}>
                <input
                  type="checkbox"
                  value={column}
                  checked={selectedFilters.includes(column)}
                  onChange={() => setSelectedFilters(prevFilters => (
                    prevFilters.includes(column) ? prevFilters.filter(f => f !== column) : [...prevFilters, column]
                  ))}
                />
                {column}
              </label>
            ))}
          </div>

          {/* Display the generated report */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {columnNames.map((header) => (
                    <TableCell key={header}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columnNames.map((columnName) => (
                      <TableCell key={columnName}>{row[columnName]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Button to generate PDF */}
          <Button variant="contained" onClick={generatePDF}>
            Generate PDF
          </Button>
        </div>
      </Box>
    </>
  );
};

export default Report;
