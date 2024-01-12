import Box from "@mui/material/Box";
import Header from "../../components/AModule/Header";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";

const Report = () => {
  let tablename = "";
  let columnnames = [];

  const [tableData, setTableData] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [tableNames, setTableNames] = useState([]);

  const [columnNames, setColumnNames] = useState([]);

  const [formFilters, setFormFilters] = useState({});
  const [apiUrl, setApiUrl] = useState(
    "http://localhost:5000/api/v1/general/allcolumns"
  );

  const getAllTables = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/general/alltables"
      );
      setTableNames(response.data.data);
      // console.log("table names are : ", response.data.data);
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

  const columnAPI = "http://localhost:5000/api/v1/general/allcolumns";

  const getAllColumns = async () => {
    try {
      const response = await axios.post(`${columnAPI}?tablename=${tablename}`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          tablename,
        },
      });
      // console.log("columns are: ", response.data);
      return response.data; // Returning the data for further processing
    } catch (error) {
      console.log("Error:", error.message);
      throw error; // Rethrowing the error for the calling code to handle
    }
  };

  // Usage example
  const fetchData = async () => {
    try {
      const columnsData = await getAllColumns(selectedTable);
      console.log("Table is:", tablename);
      console.log("Column Names are :", columnsData.data);
      columnnames = columnsData.data;
      console.log("Return value of columns columnnames : ", columnnames);
      setColumnNames(columnsData.data);
      console.log("columnNames : ", columnNames);
      if (columnsData.data.length === 0) {
        setColumnNames(columnsData.data);
        console.log("Column names are : ", columnNames);
      }
      console.log("Table name is : ", selectedTable);
    } catch (error) {
      console.error("Error fetching columns data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tablename]); // Trigger fetchData whenever tablename changes

  const handleInputChange = (fieldName, value) => {
    setFormFilters((prevData) => ({ ...prevData, [fieldName]: value }));
  };

  const updateApiUrl = () => {
    const queryParameters = Object.entries(formFilters)
      .filter(([key, value]) => value !== undefined && value !== "")
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    setApiUrl(
      `http://localhost:5000/api/v1/teacher/${tablename}/filter?${queryParameters}`
    );
  };

  // Update API URL whenever the form data changes
  useEffect(() => {
    updateApiUrl();
  }, [formFilters]);

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableRows = [];

    // Add custom headings
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("PUNE INSTITUTE OF COMPUTER TECHNOLOGY", 20, 20);

    // Add table name
    doc.setFontSize(14);
    doc.text(`Report on ${selectedTable}`, 20, 30);

    // Add table header
    const tableHeader = columnNames;
    tableRows.push(tableHeader);

    // Add table data
    tableData.forEach((row) => {
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
    doc.save("report.pdf");
  };

  const setTable = async (e) => {
    console.log("Value is : ", e.target.value);

    tablename = e.target.value;
    console.log("Table is : ", tablename);
    setSelectedTable(e.target.value); // Update selectedTable state
    // fetchData(); // Remove this line as useEffect will handle it
  };

  const handleSubmit = () => {
    // Send data to the backend using the generated API URL
    // Example using fetch:
    fetch(apiUrl, {
      method: "GET", // Adjust the method accordingly
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log("Data retrieved successfully", data))
      .catch((error) => console.error("Error retrieving data", error));
  };

  const renderInputField = (Field, Type) => {
    console.log("Rendering component called");
    // const { Field, Type } = column;
    console.log("====================================");
    console.log("Field is : ", Field);
    console.log("Type is : ", Type);
    console.log("====================================");

    if (Type.includes("varchar")) {
      return (
        <input
          type="text"
          value={formFilters[Field] || ""}
          onChange={(e) => handleInputChange(Field, e.target.value)}
        />
      );
    } else if (Type.includes("int")) {
      return (
        <input
          type="number"
          value={formFilters[Field] || ""}
          onChange={(e) => handleInputChange(Field, e.target.value)}
        />
      );
    } else if (Type === "date") {
      // Assuming you have a DatePicker component
      return (
        <>
          <input
            type="date"
            value={formFilters[`${Field}_start`] || ""}
            onChange={(e) =>
              handleInputChange(`${Field}_start`, e.target.value)
            }
          />
          <input
            type="date"
            value={formFilters[`${Field}_end`] || ""}
            onChange={(e) => handleInputChange(`${Field}_end`, e.target.value)}
          />
        </>
      );
    }

    return null;
  };

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

        <div className="flex flex-col justify-center items-center gap-4">
          <label>Select Table:</label>
          {/* {console.log("Rendering dropdown with table names:", tableNames)} */}
          <select onChange={(e) => setTable(e)} style={{ width: "200px" }}>
            {tableNames.map((table, index) => (
              <option
                className="px-4 py-2"
                key={index}
                value={table.Tables_in_inhouse}
              >
                {table.Tables_in_inhouse}
              </option>
            ))}
          </select>
          <label>Select Filters:</label>
          <div>
            {/* Render input fields based on column data */}
            {columnNames.length > 0 &&
              columnnames.map(
                (column, index) => (
                  console.log("Column is : ", column),
                  (
                    <div key={index}>
                      <label>{column.Field}</label>
                      {renderInputField(column.Field, column.Type)}
                    </div>
                  )
                )
              )}

            {/* Submit button */}
            <button onClick={handleSubmit}>Submit</button>
          </div>
          {/* Checkbox for selecting filters */}
          {/* Use columnNames fetched from the backend API */}
          {/* <div>
            {columnNames.map((column) => (
              <label key={column}>
                <input
                  type="checkbox"
                  value={column.Field}
                  checked={selectedFilters.includes(column.Field)}
                  onChange={() => setSelectedFilters(prevFilters => (
                    prevFilters.includes(column.Field) ? prevFilters.filter(f => f !== column.Field) : [...prevFilters, column.Field]
                  ))}
                />
                {column}
              </label>
            ))}
          </div> */}
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
