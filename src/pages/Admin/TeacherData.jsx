import { useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { Card, Typography } from "@material-tailwind/react";

const TeacherData = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const teacherId = searchParams.get("teacherId");
  const studentId = searchParams.get("StudentId");
  console.log(studentId);
  console.log(teacherId);

  const [showModal, setShowModal] = useState(false);
  const [selectedTables, setSelectedTables] = useState({});
  const [userType, setUserType] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);

  const teacherTables = {
    "1_Research_Publication": "1_Research_Publication",
    "2_Book_Publication": "2_Book_Publication",
    "3_faculty_conference_publication": "3_faculty_conference_publication",
    "4_grants": "4_grants",
    "5_consultancy_report": "5_consultancy_report",
    "6_patent_publication": "6_patent_publication",
    "7_confsemworkshops": "7_confsemworkshops",
    "8_sttp_fdp_conf_attended": "8_sttp_fdp_conf_attended",
    "9_webinarguestlec": "9_webinarguestlec",
    "10_mous": "10_mous",
    "11_certcourses": "11_certcourses",
    "12_prof_affiliation": "12_prof_affiliation",
    "13_resource_person": "13_resource_person",
    "14_extension_activity": "14_extension_activity",
    "15_tech_comp_fest": "15_tech_comp_fest",
    "16_faculty_achievements": "16_faculty_achievements",
    "17_indusvisitstoursfiledtrip": "17_indusvisitstoursfiledtrip",
    "18_contribution_to_bos": "18_contribution_to_bos",
    // Add more teacher tables if needed
  };

  const studentTables = {
    "1__student___internship_details": "1__student___internship_details",
    "2__student___research_publication": "2__student___research_publication",
    "3__student___conference_publication":
      "3__student___conference_publication",
    "4__student___certificate_course_attended":
      "4__student___certificate_course_attended",
    "5__student___sports_data": "5__student___sports_data",
    "6__student___event_participated": "6__student___event_participated",
    "7__student___event_organized": "7__student___event_organized",
    "8__student___technical_events": "8__student___technical_events",
    "9__student___higher_education": "9__student___higher_education",
    // Add more student tables if needed
  };

  const openModal = (type) => {
    setShowModal(true);
    setUserType(type);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCheckboxChange = (tableName) => {
    setSelectedTables((prevSelectedTables) => {
      const newSelectedTables = { ...prevSelectedTables };

      if (newSelectedTables[tableName]) {
        // Remove table if it's already selected
        delete newSelectedTables[tableName];
      } else {
        // Add table if it's not selected
        newSelectedTables[tableName] = true;
      }

      return newSelectedTables;
    });
  };

  const applyChanges = async () => {
    console.log("Applying Changes:", selectedTables);

    const userId = userType === "teacher" ? teacherId : studentId;

    try {
      const apiUrl = `http://localhost:5000/api/v1/general/get-user-data?username=${userId}&selectedTables[]=${Object.keys(
        selectedTables
      ).join("&selectedTables[]=")}`;
      const response = await axios.post(apiUrl, {
        selectedTables,
        teacherId,
        studentId,
      });

      console.log("API Response:", response.data.data);

      setResponseData(response.data.data);
      // Set the selected table to the first one in the list
      setSelectedTable(Object.keys(response.data.data)[0]);
    } catch (error) {
      console.error("Error making API call:", error);
    }

    closeModal();
    // Do not reset selectedTables to display multiple tables
  };

  const renderTable = (tableName, tableData) => {
    console.log("Table name = ", tableName);
    console.log("Table data = ", tableData);

    if (tableData.length === 0) {
      return (
        <Card
          key={tableName}
          color="transparent"
          shadow={false}
          className="border border-gray-300 w-full p-2 my-10 rounded-md"
        >
          <Typography tag="h2" className="text-xl font-bold mb-2 text-center">
            {tableName}
          </Typography>
          <p className="text-center text-gray-600">
            No data available for this table.
          </p>
        </Card>
      );
    }

    return (
      <Card
        key={tableName}
        color="transparent"
        shadow={false}
        className="border border-gray-300 w-full p-2 my-10 rounded-md overflow-x-auto"
      >
        <Typography tag="h2" className="text-xl font-bold mb-2 text-center">
          {tableName}
        </Typography>
        <div>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                {Object?.keys(tableData[0])?.map((header, index) => (
                  <th key={index} className="py-2 px-4 border-r">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData?.map((record, recordIndex) => (
                <tr key={recordIndex} className="text-center border-t">
                  {Object.values(record)?.map((value, valueIndex) => (
                    <td key={valueIndex} className="py-2 px-4 border-r">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    );
  };

  const renderSelectedTables = () => {
    return (
      <div>
        {/* Render all selected tables */}
        {Object.keys(responseData).map((tableName) =>
          selectedTables[tableName]
            ? renderTable(tableName, responseData[tableName])
            : null
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-center w-full gap-2">
        {teacherId === null ? (
          <>
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
              onClick={() => openModal("student")}
            >
              Open Student Table Selection
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
              onClick={() => openModal("teacher")}
            >
              Open Teacher Table Selection
            </button>
          </>
        )}
      </div>
      {showModal && (
        <div className="fixed z-10 p-6 inset-0 w-full h-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="flex flex-col m-3 bg-white p-6 rounded-lg shadow-md w-full h-full max-w-lg overflow-y-auto">
            <h1 className="text-lg font-semibold mb-4">Select Tables</h1>
            {userType === "teacher"
              ? Object?.keys(teacherTables)?.map((tableName) => (
                  <div key={tableName} className="mb-4 flex items-center ">
                    <input
                      type="checkbox"
                      id={`checkbox-${tableName}`}
                      value={tableName}
                      className="mr-2 h-5 w-5"
                      onChange={() => handleCheckboxChange(tableName)}
                      checked={selectedTables[tableName]}
                    />
                    <label
                      htmlFor={`checkbox-${tableName}`}
                      className="block mb-2 cursor-pointer"
                    >
                      {teacherTables[tableName]}
                    </label>
                  </div>
                ))
              : userType === "student"
              ? Object.keys(studentTables)?.map((tableName) => (
                  <div key={tableName} className="mb-4 flex items-center">
                    <input
                      type="checkbox"
                      id={`checkbox-${tableName}`}
                      value={tableName}
                      className="mr-2 h-5 w-5"
                      onChange={() => handleCheckboxChange(tableName)}
                      checked={selectedTables[tableName]}
                    />
                    <label
                      htmlFor={`checkbox-${tableName}`}
                      className="block mb-2 cursor-pointer"
                    >
                      {studentTables[tableName]}
                    </label>
                  </div>
                ))
              : null}

            <div className="flex justify-end">
              <button
                className="bg-blue-600 rounded-md text-white px-4 py-2 mr-2"
                onClick={applyChanges}
              >
                Apply
              </button>
              <button
                className="bg-red-400 text-white rounded-md px-4 py-2"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {responseData && renderSelectedTables()}
    </div>
  );
};

export default TeacherData;
