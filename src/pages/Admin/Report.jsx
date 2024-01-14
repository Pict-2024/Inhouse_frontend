// Import necessary dependencies
import Box from "@mui/material/Box";
import Header from "../../components/AModule/Header";
import  { useState, useEffect } from "react";
import moment from "moment";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  TablePagination,
} from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import {
  getAllRecordsAchievements,
  getAllRecordsAttended,
  getAllRecordsBook,
  getAllRecordsCertificate,
  getAllRecordsConference,
  getAllRecordsConsultancy,
  getAllRecordsContribution,
  getAllRecordsExtension,
  getAllRecordsFaculty,
  getAllRecordsGrants,
  getAllRecordsIndustrial,
  getAllRecordsMous,
  getAllRecordsPatent,
  getAllRecordsProfessional,
  getAllRecordsResearch,
  getAllRecordsResource,
  getAllRecordsTechnical,
  getAllRecordsWebinar,
} from "../../components/TModule/API_Routes";
import { Option, Select } from "@material-tailwind/react";

// Define the Report component
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
    "1_student__internship_details": "",
    "1_research_publication": "research-pb",
    "2_student__research_publication": "",
    "2_book_publication": "book-pb",
    "3_student__conference_publication": "",
    "3_faculty_conference_publication": "faculty-pb",
    "4_student__certificate_course_attended": "",
    "4_grants": "grants",
    "5_students__sports_data": "",
    "5_consultancy_report": "cons-rep",
    "6_students__event_participated": "",
    "6_patent_publication": "patent-pb",
    "7_students__event_organized": "",
    "7_confsemworkshops": "con-sem",
    "8_students__technical_events": "",
    "8_sttp_fdp_conf_attended": "sf-ws",
    "9_student__higher_education": "",
    "9_webinarguestlec": "web-guest",
    login_details: "",
    register: "",
  };

  const tableRoutesMapping = (table) => {
    const tableRoute = {
      "1_research_publication": getAllRecordsResearch,
      "2_book_publication": getAllRecordsBook,
      "3_faculty_conference_publication": getAllRecordsFaculty,
      "4_grants": getAllRecordsGrants,
      "5_consultancy_report": getAllRecordsConsultancy,
      "6_patent_publication": getAllRecordsPatent,
      "7_confsemworkshops": getAllRecordsConference,
      "8_sttp_fdp_conf_attended": getAllRecordsAttended,
      "9_webinarguestlec": getAllRecordsWebinar,
      "10_mous": getAllRecordsMous,
      "11_certcourses": getAllRecordsCertificate,
      "12_prof_affiliation": getAllRecordsProfessional,
      "13_resource_person": getAllRecordsResource,
      "14_extension_activity": getAllRecordsExtension,
      "15_tech_comp_fest": getAllRecordsTechnical,
      "16_faculty_achievements": getAllRecordsAchievements,
      "17_indusvisitstoursfieldtrip": getAllRecordsIndustrial,
      "18_contribution_to_bos": getAllRecordsContribution,
    };
    console.log("Returned table:", tableRoute[table]);
    return tableRoute[table];
  };

  const [tableData, setTableData] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [tableNames, setTableNames] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [formFilters, setFormFilters] = useState({});
  const [apiUrl, setApiUrl] = useState(
    "http://localhost:5000/api/v1/general/allcolumns"
  );
  const [tableRows, setTableRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1999 },
    (_, index) => currentYear - index
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //get all records
  const getAllRecords = async () => {
    try {
      const apiurl = tableRoutesMapping(selectedTable);
      console.log("Table Name: ", selectedTable);
      console.log("apiRoute in getAllRecords:", apiurl);

      const response = await axios.get(apiurl, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data.data);
      setTableRows(response.data.data);
    } catch (error) {
      console.error("Error fetching records:", error.message);
    }
  };

  useEffect(() => {
    if (selectedTable) {
      getAllRecords();
    }
  }, [selectedTable]);

  // Function to fetch all tables
  const getAllTables = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/general/alltables"
      );
      const fetchedTableNames = response.data.data;
      setTableNames(fetchedTableNames);
      // console.log("table names are : ", fetchedTableNames);
    } catch (error) {
      console.log("error is : \n", error.message);
    }
  };

  useEffect(() => {
    getAllTables();
  }, []);

  const getAllColumns = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/general/allcolumns?tablename=${tablename}`
      );
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
      .filter(([key, value]) => value !== undefined && value !== "")
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    setApiUrl(
      `http://localhost:5000/api/v1/teacher/${tableMapping[selectedTable]}/filter?${queryParameters}`
    );
  };

  useEffect(() => {
    updateApiUrl();
  }, [formFilters]);

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableRow = [];
    let headersAdded = false;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("PUNE INSTITUTE OF COMPUTER TECHNOLOGY", 20, 20);

    doc.setFontSize(14);
    doc.text(`Report on ${selectedTable}`, 20, 30);

    // Add table rows
    tableRows.forEach((row) => {
      const rowData = columnNames.map((columnName) => row[columnName.Field]);
      tableRow.push(rowData);

      // Add headers only once
      if (!headersAdded) {
        const tableHeader = columnNames.map((header) => header.Field);
        tableRow.unshift(tableHeader);
        headersAdded = true;
      }
    });

    doc.autoTable({
      head: [tableRow[0]], // Use the first element as headers
      body: tableRow.slice(1), // Exclude the headers from the body
      startY: 40,
    });

    console.log("Table name is : ", selectedTable);
    doc.save("report.pdf");
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data retrieved successfully", data);
        // Update the table rows state with the fetched data
        setTableRows(data.data);
      })
      .catch((error) => console.error("Error retrieving data", error));
  };

  const renderInputFields = () => {
    return columnNames.map((column) => (
      <div key={column.Field}>
      {!column.Field.includes("Upload") && !column.Field.includes("Link") && (
        <>
          <label>{column.Field}</label>
          {renderInputField(column)}
        </>
      )}
      </div>
    ));
  };

  const renderInputField = (column) => {
    const { Field, Type } = column;

    if (Type.includes("varchar") && Field.includes("Year")) {
      const startYear = formFilters['Start_Year'] || currentYear;
      const endYear = formFilters['End_Year'] || currentYear;
      const startYearOptions = years.map((year) => (
        <Option key={year} value={year}>
          {year}
        </Option>
      ));
      const endYearOptions = years
        .filter((year) => year >= startYear)
        .map((year) => (
          <Option key={year} value={year}>
            {year}
          </Option>
        ));
    
      return (
        <div key={Field}>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <Select
              size="lg"
              label="Start Year"
              color="light-gray"
              name="Start_Year"
              value={startYear}
              onChange={(value) => {
                handleInputChange("Start_Year", value);
              }}
            >
              {startYearOptions}
            </Select>
          </div>
    
          <div className="w-full md:w-1/2 px-4 mb-4">
            <Select
              size="lg"
              label="End Year"
              color="light-gray"
              name="End_Year"
              value={endYear}
              onChange={(value) => {
                handleInputChange("End_Year", value);
              }}
            >
              {endYearOptions}
            </Select>
          </div>
        </div>
      );
    }
    
    else if (Type.includes("varchar") && Field.includes("Upload") == false && Field.includes("Link") == false) {
      return (
        <div key={Field} className="mb-4 py-3 bg-white rounded-lg">
          {/* <label className="block mb-2">{Enter ${Field}}</label> */}
          <input
            type="text"
            placeholder={`Enter ${Field}`}
            value={formFilters[Field] || ""}
            onChange={(e) => handleInputChange(Field, e.target.value)}
            className="w-full  py-2 border border-black rounded-md "
          />
        </div>
      );
    } else if (Type.includes("int")) {
      return (
        <div key={Field} className="mb-4 py-3 bg-white rounded-lg">
          {/* <label className="block mb-2">{Enter ${Field}}</label> */}
          <input
            type="number"
            value={formFilters[Field] || ""}
            onChange={(e) => handleInputChange(Field, e.target.value)}
            className="w-full py-2 border border-black rounded-md "
          />
        </div>
      );
    } else if (Type === "date") {
      //  setApiUrlapi + dateColumn=${Field}
      return (
        <div key={Field} className="mb-4 py-3 bg-white rounded-lg">
          {/* <label className="block mb-2">{${Field} Start Date}</label> */}
          <input
            type="date"
            value={formFilters[`startDate`] || ""}
            onChange={(e) => handleInputChange(`startDate`, e.target.value)}
            className="w-full mb-2  py-2 border border-black rounded-md "
          />
          {/* <label className="block mb-2">{${Field} End Date}</label> */}
          <input
            type="date"
            value={formFilters[`endDate`] || ""}
            onChange={(e) => handleInputChange(`endDate`, e.target.value)}
            className="w-full  py-2 border border-black rounded-md "
          />
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <Box sx={{}}>
        {/* <div><Header/></div> */}

        <div className="flex flex-col justify-center items-center gap-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Table:
          </label>
          <select
            onChange={(e) => setTable(e)}
            className="border border-gray-300 rounded-md p-2 w-200 focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300 ease-in-out"
          >
            {tableNames.map((table, index) => (
              <option
                className="py-2 hover:bg-blue-100"
                key={index}
                value={table.Tables_in_inhouse}
              >
                {table.Tables_in_inhouse}
              </option>
            ))}
          </select>

          <label>Select Filters:</label>

          <div className="flex flex-col justify-end align-items-center m-2 p-4">
            <div className="flex flex-row  gap-4 flex-wrap">
              {renderInputFields()}
            </div>
            <Button variant="contained" className="w-20" onClick={handleSubmit}>
              Submit
            </Button>
          </div>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {columnNames.map((column) => (
                    <TableCell key={column.Field}>{column.Field}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableRows &&
                  tableRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {columnNames.map((column) => (
                          <TableCell key={column.Field}>
                            {column.Type === "date"
                              ? moment(row[column.Field]).format("DD-MM-YYYY")
                              : row[column.Field]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={tableRows ? tableRows.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

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