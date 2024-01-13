// Import necessary dependencies
import Box from "@mui/material/Box";
import Header from "../../components/AModule/Header";
import { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";

// Define the Report component
const Report = () => {
  // Define initial state variables
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

  // Function to fetch all tables
  const getAllTables = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/general/alltables"
      );
      setTableNames(response.data.data);
      console.log("table selected:", selectedTable);
    } catch (error) {
      console.log("error is : \n", error.message);
    }
  };

  // useEffect hook to fetch all tables on component mount
  useEffect(() => {
    getAllTables();
  }, []);

  // API endpoint for fetching columns
  const columnAPI = "http://localhost:5000/api/v1/general/allcolumns";

  // Function to fetch all columns for a given table
  const getAllColumns = async (table) => {
    try {
      const response = await axios.post(`${columnAPI}?tablename=${table}`);
      setColumnNames(response.data.data);
      return response.data; // Returning the data for further processing
    } catch (error) {
      console.log("Error:", error.message);
      throw error; // Rethrowing the error for the calling code to handle
    }
  };

  // Function to set the selected table and fetch columns
  const setTable = async (e) => {
    const selectedTableName = e.target.value;
    setSelectedTable(selectedTableName); // Update selectedTable state
    const columnsData = await getAllColumns(selectedTableName);
    setColumnNames(columnsData.data);
  };

  // useEffect hook to fetch columns when the tablename changes
  useEffect(() => {
    fetchData();
  }, [selectedTable]); // Trigger fetchData whenever tablename changes

  // Function to fetch data based on the selected filters
  const fetchData = async () => {
    try {
      const columnsData = await getAllColumns(selectedTable);
      columnnames = columnsData.data;
      setColumnNames(columnsData.data);
      console.log("columnnames", columnnames);
      if (columnsData.data.length === 0) {
        setColumnNames(columnsData.data);
      }
    } catch (error) {
      console.error("Error fetching columns data:", error.message);
    }
  };
  // useEffect hook to update API URL whenever formFilters change
  useEffect(() => {
    updateApiUrl();
  }, [formFilters]);

  // Function to update API URL based on formFilters
  const updateApiUrl = () => {
    const queryParameters = Object.entries(formFilters)
      .filter(([key, value]) => value !== undefined && value !== "")
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    setApiUrl(
      `http://localhost:5000/api/v1/teacher/${tablename}/filter?${queryParameters}`
    );
  };

  // Function to generate PDF
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

  // Function to handle form input changes
  const handleInputChange = (fieldName, value) => {
    setFormFilters((prevData) => ({ ...prevData, [fieldName]: value }));
  };

  // Function to handle form submission
  const handleSubmit = () => {
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log("Data retrieved successfully", data))
      .catch((error) => console.error("Error retrieving data", error));
  };

  // Function to render input field based on column type

  const renderInputFields = () => {
    return columnNames.map((column, index) => (
      <div key={index}>
        {column.Type.includes("varchar") && (
          <TextField
            label={column.Field}
            value={formFilters[column.Field] || ""}
            onChange={(e) => handleInputChange(column.Field, e.target.value)}
            fullWidth
            margin="normal"
          />
        )}
  
        {column.Type.includes("int") && (
          <TextField
            label={column.Field}
            type="number"
            value={formFilters[column.Field] || ""}
            onChange={(e) => handleInputChange(column.Field, e.target.value)}
            fullWidth
            margin="normal"
          />
        )}
  
        {column.Type === "date" && (
          <div>
            <TextField
              label={`${column.Field} Start`}
              type="date"
              value={formFilters[`${column.Field}_start`] || ""}
              onChange={(e) => handleInputChange(`${column.Field}_start`, e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label={`${column.Field} End`}
              type="date"
              value={formFilters[`${column.Field}_end`] || ""}
              onChange={(e) => handleInputChange(`${column.Field}_end`, e.target.value)}
              fullWidth
              margin="normal"
            />
          </div>
        )}
      </div>
    ));
  };



  // JSX structure for rendering the component
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
            {renderInputFields()}
            <button onClick={handleSubmit}>Submit</button>
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
