import { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  ChevronUpDownIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { DocumentIcon, PencilIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Button,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import moment from "moment";
import ExcelJS from "exceljs";
import {
  deleteRecordsCertificateStud,
  deleteRecordsConferenceStud,
  deleteRecordsHigherEdu,
  deleteRecordsInternship,
  deleteRecordsOrganized,
  deleteRecordsParticipation,
  deleteRecordsResearchStud,
  deleteRecordsSport,
  deleteRecordsTechnicalStud,
  getOneRecordsCertificateStud,
  getOneRecordsConferenceStud,
  getOneRecordsHigherEdu,
  getOneRecordsInternship,
  getOneRecordsOrganized,
  getOneRecordsParticipation,
  getOneRecordsResearchStud,
  getOneRecordsSport,
  getOneRecordsTechnicalStud,
  updateRecordsCertificateStud,
  updateRecordsConferenceStud,
  updateRecordsHigherEdu,
  updateRecordsInternship,
  updateRecordsOrganized,
  updateRecordsParticipation,
  updateRecordsResearchStud,
  updateRecordsSport,
  updateRecordsTechnicalStud,
} from "../API_Routes";

export default function TableData({ tableName }) {
  const { currentUser } = useSelector((state) => state.user);
  const [tableHead, setTableHead] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [editableFields, setEditableFields] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

  // getRecords by username apis
  const getApiRoute = (tableName) => {
    // Define your API routes based on the table names
    console.log("table name is getapiroute: ", tableName);
    const apiRoutes = {
      Internship: (username) => getOneRecordsInternship(username),
      Research: (username) => getOneRecordsResearchStud(username),
      "Conference publication": (username) =>
        getOneRecordsConferenceStud(username),
      "Certificate Course Attended": (username) =>
        getOneRecordsCertificateStud(username),
      "Sport Data": (username) => getOneRecordsSport(username),
      "Event Participated": (username) => getOneRecordsParticipation(username),
      "Event Organized": (username) => getOneRecordsOrganized(username),
      "Technical Events": (username) => getOneRecordsTechnicalStud(username),
      "Higher Education": (username) => getOneRecordsHigherEdu(username),
    };

    console.log("returned table :", tableName);
    const apiRoute = apiRoutes[tableName];
    console.log("apiRoute:", apiRoute);
    return apiRoute;
  };

  //delete apis
  const deleteAPIRoute = (tableName) => {
    const deleteRoutes = {
      Internship: (username, S_ID) =>
        `${deleteRecordsInternship}?username=${username}&S_ID=${S_ID}`,
      Research: (username, S_ID) =>
        `${deleteRecordsResearchStud}?username=${username}&S_ID=${S_ID}`,
      "Conference publication": (username, S_ID) =>
        `${deleteRecordsConferenceStud}?username=${username}&S_ID=${S_ID}`,
      "Certificate Course Attended": (username, S_ID) =>
        `${deleteRecordsCertificateStud}?username=${username}&S_ID=${S_ID}`,
      "Sport Data": (username, S_ID) =>
        `${deleteRecordsSport}?username=${username}&S_ID=${S_ID}`,

      "Event Participated": (username, S_ID) =>
        `${deleteRecordsParticipation}?username=${username}&S_ID=${S_ID}`,
      "Event Organized": (username, S_ID) =>
        `${deleteRecordsOrganized}?username=${username}&S_ID=${S_ID}`,
      "Technical Events": (username, S_ID) =>
        `${deleteRecordsTechnicalStud}?username=${username}&S_ID=${S_ID}`,
      "Higher Education": (username, S_ID) =>
        `${deleteRecordsHigherEdu}?username=${username}&S_ID=${S_ID}`,
    };

    return deleteRoutes[tableName];
  };

  //update  apis
  const updateAPIRoute = (tableName) => {
    const updateRoutes = {
      Internship: (username, S_ID) =>
        `${updateRecordsInternship}?username=${username}&S_ID=${S_ID}`,
      Research: (username, S_ID) =>
        `${updateRecordsResearchStud}?username=${username}&S_ID=${S_ID}`,
      "Conference publication": (username, S_ID) =>
        `${updateRecordsConferenceStud}?username=${username}&S_ID=${S_ID}`,
      "Certificate Course Attended": (username, S_ID) =>
        `${updateRecordsCertificateStud}?username=${username}&S_ID=${S_ID}`,
      "Sport Data": (username, S_ID) =>
        `${updateRecordsSport}?username=${username}&S_ID=${S_ID}`,

      "Event Participated": (username, S_ID) =>
        `${updateRecordsParticipation}?username=${username}&S_ID=${S_ID}`,
      "Event Organized": (username, S_ID) =>
        `${updateRecordsOrganized}?username=${username}&S_ID=${S_ID}`,
      "Technical Events": (username, S_ID) =>
        `${updateRecordsTechnicalStud}?username=${username}&S_ID=${S_ID}`,
      "Higher Education": (username, S_ID) =>
        `${updateRecordsHigherEdu}?username=${username}&S_ID=${S_ID}`,
    };

    return updateRoutes[tableName];
  };

  //get all records
  const getAllRecords = async () => {
    const user = currentUser?.Username;
    console.log("User is : ", user);
    console.log("table name is : ", tableName);
    try {
      const apiurl = getApiRoute(tableName)(user);

      console.log("Table name:", tableName);
      console.log("apiRoute in getAllRecords:", apiurl);
      const response = await axios.get(apiurl, {
        headers: {
          "Content-Type": "application/json", // Make sure this header is defined
        },
      });
      console.log("Response : ", response);
      console.log("Response is : ", response?.data?.data);
      const columnHeaders = Object.keys(response?.data?.data[0]);
      console.log("Columns:", columnHeaders);

      setTableHead(columnHeaders);

      // Filter records based on currentUser's name
      const userRecords = response.data.data.filter(
        (record) => record.Username === currentUser.Username
      );
      // console.log("UserRecords:", userRecords);
      setTableRows(userRecords);
      // setTableRows(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenDialog = (record) => {
    setRecordToDelete(record);
    setShowDialog(true);
  };

  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setShowDialog(false);
    setRecordToDelete(null);
  };

  //Handle delete records
  const onDelete = async (record) => {
    try {
      const apiurl = deleteAPIRoute(tableName)(
        currentUser.Username,
        record.S_ID
      );

      const response = await axios.delete(apiurl, {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          username: currentUser.Username,
          S_ID: record.S_ID,
        },
      });
      console.log('delete', response);
      if (response?.status === 200) {
        toast.success("Record Deleted Successfully!", {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      const updatedRows = tableRows.filter((r) => r.S_ID !== record.S_ID);
      setTableRows(updatedRows);
    } catch (error) {
      toast.error("Failed to delete Record!", {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error("Error deleting record:", error.response.data.message);
      // Handle error gracefully, e.g., show a user-friendly message
    }
  };

  // Handle edit action
  const handleEdit = (record) => {
    setEditableFields({
      ...editableFields,
      [record.S_ID]: { ...record },
    });
  };

  // Handle editable field changes
  const handleEditField = (tId, field, value) => {
    setEditableFields({
      ...editableFields,
      [tId]: {
        ...editableFields[tId],
        [field]: value,
      },
    });
  };

  // Update modified changes
  const handleSave = async (tId) => {
    try {
      const updatedRecord = editableFields[tId];
      console.log("Updated:", updatedRecord);
      // Send a PUT request to update the record in the backend
      const apiurl = updateAPIRoute(tableName)(currentUser.Username, tId);
      console.log(apiurl);
      console.log("updating record with:", currentUser.Username, tId);
      console.log("Table:", tableName);
      const response = await axios.put(apiurl, updatedRecord, {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          username: currentUser.Username,
          S_ID: tId,
        },
      });
      console.log("ipdate: ", response);

      // Update tableRows state
      const updatedRows = tableRows.map((r) =>
        r.S_ID === tId ? { ...r, ...updatedRecord } : r
      );
      setTableRows(updatedRows);

      // Clear editable fields
      setEditableFields({
        ...editableFields,
        [tId]: undefined,
      });
      if (response?.status === 200) {
        toast.success("Record Updated Successfully!", {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error updating record:", error.response.data.message);
      // Handle error gracefully, e.g., show a user-friendly message
    }
  };

  //render all records
  useEffect(() => {
    getAllRecords();
  }, [tableName]);

  //link to uploaded document
  const handleLink = (link) => {
    console.log("Link of document is : ", link);
    const IP = "http://10.10.15.150";
    const PORT = 8081;
    const pathParts = link.split('\\Uploads');
    const newPath = `${IP}:${PORT}/Uploads${pathParts[1]}`;

    console.log("New URL is : ", newPath);

    window.open(newPath, "_blank");
  };

  const generateExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Report");

    // Add headers
    const headerRow = worksheet.addRow(tableHead.map((head) => head));

    // Add data rows
    tableRows.forEach((row) => {
      const dataRow = tableHead.map((head) => row[head]);
      worksheet.addRow(dataRow);
    });

    // Save the workbook
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "report.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };

  // Add this function to handle the "Generate Excel" button click
  const handleGenerateExcel = () => {
    generateExcel();
  };

  return (
    <>
      <Card className="h-full w-full p-3">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex items-center justify-between gap-8 mt-2">
            <div>
              <Typography variant="h5" color="blue-gray">
                {tableName}
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-0">
          <div className="overflow-x-auto mx-4">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {tableHead.map((head, index) => (
                    <th
                      key={head}
                      className={`${index === 0 ? "hidden" : ""
                        } cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50`}
                    >
                      <Typography
                        variant="small"
                        color="blue"
                        className="flex items-center justify-between gap-2 leading-none opacity-70 font-bold text-blue-700"
                      >
                        {head}{" "}
                        {index !== tableHead.length - 1 && (
                          <ChevronUpDownIcon
                            strokeWidth={2}
                            className="h-4 w-4"
                          />
                        )}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((record, index) => (
                  <tr
                    key={index}
                    className={`border-b border-solid border-blue-gray-200 ${index % 2 === 0 ? "bg-blue-gray-50" : "bg-white"
                      }`}
                  >
                    {tableHead.map((head, colIndex) => (
                      <td
                        key={head}
                        className={`${colIndex === 0 ? "hidden" : ""
                          } p-4 whitespace-normal border-r ${colIndex === tableHead.length - 1
                            ? ""
                            : "border-solid border-blue-gray-200"
                          }`}
                      >
                        {editableFields[record.S_ID] &&
                          editableFields[record.S_ID][head] !== undefined ? (
                          <Input
                            value={editableFields[record.S_ID][head]}
                            label={[head]}
                            onChange={(e) =>
                              handleEditField(record.S_ID, head, e.target.value)
                            }
                            disabled={head.startsWith("Upload")}
                          />
                        ) : head.includes("Upload") ? (
                          <DocumentIcon
                            onClick={() => handleLink(record[head])}
                            className="cursor-pointer w-6 h-6"
                          />
                        ) : head.includes("Date") ? (
                          <Typography
                            variant="body"
                            color="black"
                            className="text-dark font-bold"
                          >
                            <p>{moment(record[head]).format("YYYY-MM-DD")}</p>
                          </Typography>
                        ) : (
                          <Typography
                            variant="body"
                            color="black"
                            className="text-dark font-bold"
                          >
                            <p>{record[head]}</p>
                          </Typography>
                        )}
                      </td>
                    ))}
                    <td className="p-4 border-r border-solid border-blue-gray-200">
                      {editableFields[record.S_ID] ? (
                        <Tooltip content="Save Changes">
                          <IconButton
                            onClick={() => handleSave(record.S_ID)}
                            variant="text"
                          >
                            <CheckCircleIcon className="h-4 w-4 text-green-500" />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <>
                          <Tooltip content="Edit data">
                            <IconButton
                              onClick={() => handleEdit(record)}
                              variant="text"
                            >
                              <PencilIcon className="h-4 w-4 text-blue-500" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Delete data">
                            <IconButton
                              onClick={() => handleOpenDialog(record)}
                              variant="text"
                            >
                              <TrashIcon className="h-4 w-4 text-red-500" />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
        <div className="mt-4 text-right">
          <Button
            onClick={handleGenerateExcel}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Generate Excel
          </Button>
        </div>
      </Card>
      <Dialog open={showDialog} size="sm" handler={handleCloseDialog}>
        <DialogHeader>Warning</DialogHeader>
        <DialogBody>Are you sure you want to delete this record?</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleCloseDialog}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              onDelete(recordToDelete);
              handleCloseDialog();
            }}
          >
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

// Add PropTypes validation
TableData.propTypes = {
  tableName: PropTypes.string.isRequired,
};
