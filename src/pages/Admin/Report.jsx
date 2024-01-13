import Box from "@mui/material/Box";
import Header from '../../components/AModule/Header';
import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

const Report = () => {
  let tablename = "";


  const tableMapping = {

    "10_mous": "number-of_mous",
    "11_certcourses": "cert-courses",
    "12_prof_affiliation": "prof-aff",
    "13_resource_person": "facultyresource",
    "14_extension_activity": "extension-act",
    "15_tech_comp_fest": "techfest-org",
    "16_faculty_achievements": "faculty-achievement",
    "17_indusvisitstoursfieldtrip": "visit-tours",
    "18_contribution_to_bos": "contribution-bos",
    "1__student___internship_details": "",
    "1_research_publication": "research-pb",
    "2__student___research_publication": "",
    "2_book_publication": "book-pb",
    "3__student___conference_publication": "",
    "3_faculty_conference_publication": "faculty-pb",
    "4__student___certificate_course_attended": "",
    "4_grants": "grants",
    "5__students___sports_data": "",
    "5_consultancy_report": "cons-rep",
    "6__students___event_participated": "",
    "6_patent_publication": "patent-pb",
    "7__students___event_organized": "",
    "7_confsemworkshops": "con-sem",
    "8__students___technical_events": "",
    "8_sttp_fdp_conf_attended": "sf-ws",
    "9__student___higher_education": "",
    "9_webinarguestlec": "web-guest",
    "login_details": "",
    "register": ""
  }

  const [tableData, setTableData] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [tableNames, setTableNames] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [formFilters, setFormFilters] = useState({});
  const [apiUrl, setApiUrl] = useState("http://localhost:5000/api/v1/general/allcolumns");

  const getAllTables = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/general/alltables');
      const fetchedTableNames = response.data.data;
      setTableNames(fetchedTableNames);
      console.log("table names are : ", fetchedTableNames);
    } catch (error) {
      console.log("error is : \n", error.message);
    }
  };

  useEffect(() => {
    getAllTables();
  }, []);

  const getAllColumns = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/v1/general/allcolumns?tablename=${tablename}`);
      return response.data; // Returning the data for further processing
    } catch (error) {
      console.log("error is: ", error.message);
    }
  };

  const fetchData = async () => {
    try {
      const columnsData = await getAllColumns();
      console.log("Return value of columns: ", columnsData.data);
      setColumnNames(columnsData.data);
    } catch (error) {
      console.error("Error fetching columns data:", error.message);
    }
  };

  const handleInputChange = (Field, value) => {
    setFormFilters({
      ...formFilters,
      [Field]: value,
    });
  };

  const updateApiUrl = () => {
    const queryParameters = Object.entries(formFilters)
      .filter(([key, value]) => value !== undefined && value !== '')
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    setApiUrl(`http://localhost:5000/api/v1/teacher/${tableMapping[selectedTable]}/filter?${queryParameters}`);
  };

  useEffect(() => {
    updateApiUrl();
  }, [formFilters]);

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableRows = [];

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('PUNE INSTITUTE OF COMPUTER TECHNOLOGY', 20, 20);

    doc.setFontSize(14);
    doc.text(`Report on ${selectedTable}`, 20, 30);

    const tableHeader = columnNames.map((header) => header.Field);
    tableRows.push(tableHeader);

    tableData.forEach(row => {
      const rowData = columnNames.map(columnName => row[columnName.Field]);
      tableRows.push(rowData);
    });

    doc.autoTable({
      head: [tableHeader],
      body: tableRows,
      startY: 40,
    });

    console.log("Table name is : ", selectedTable);
    doc.save('report.pdf');
  };

  const setTable = async (e) => {
    const selectedTableName = e.target.value;
    console.log("Selected Table is: ", selectedTableName);
    tablename = selectedTableName;
    setSelectedTable(selectedTableName);
    fetchData();
  };

  const handleSubmit = () => {

    console.log("form filters are : ", formFilters);
    console.log("API URL is : ", apiUrl);

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => console.log('Data retrieved successfully', data))
      .catch(error => console.error('Error retrieving data', error));
  };

  const renderInputFields = () => {
    return columnNames.map((column) => (
      <div key={column.Field}>
        <label>{column.Field}</label>
        {renderInputField(column)}
      </div>
    ));
  };

  const renderInputField = (column) => {
    const { Field, Type } = column;

    if (Type.includes('varchar')) {
      return (
        <input
          key={Field}
          type="text"
          placeholder={`Enter ${Field}`}
          value={formFilters[Field] || ''}
          onChange={(e) => handleInputChange(Field, e.target.value)}
        />
      );
    } else if (Type.includes('int')) {
      return (
        <input
          key={Field}
          type="number"
          placeholder={`Enter ${Field}`}
          value={formFilters[Field] || ''}
          onChange={(e) => handleInputChange(Field, e.target.value)}
        />
      );
    } else if (Type === 'date') {
      return (
        <div key={Field}>
          <label>{`${Field} Start Date`}</label>
          <input
            type="date"
            value={formFilters[`${Field}_start`] || ''}
            onChange={(e) => handleInputChange(`${Field}_start`, e.target.value)}
          />
          <label>{`${Field} End Date`}</label>
          <input
            type="date"
            value={formFilters[`${Field}_end`] || ''}
            onChange={(e) => handleInputChange(`${Field}_end`, e.target.value)}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <Box sx={{}}>
        <div>
          {/* Header component */}
        </div>

        <div className="flex flex-col justify-center items-center gap-4">
          <label>Select Table:</label>
          <select onChange={(e) => setTable(e)}>
            {tableNames.map((table, index) => (
              <option className="px-4 py-2" key={index} value={table.Tables_in_inhouse_hod}>{table.Tables_in_inhouse_hod}</option>
            ))}
          </select>

          <label>Select Filters:</label>

          <div>
            {renderInputFields()}
            <button onClick={handleSubmit}>Submit</button>
          </div>

          <TableContainer component={Paper}>
            {/* Display the generated report */}
          </TableContainer>

          <Button variant="contained" onClick={generatePDF}>
            Generate PDF
          </Button>
        </div>
      </Box>
    </>
  );
};

export default Report;