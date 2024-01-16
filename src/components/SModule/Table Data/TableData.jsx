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
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  deleteRecordsCertificate,
  deleteRecordsConference,
  deleteRecordsHigherEdu,
  deleteRecordsInternship,
  deleteRecordsOrganized,
  deleteRecordsParticipation,
  deleteRecordsResearch,
  deleteRecordsSport,
  deleteRecordsTechnical,
  getOneRecordsCertificate,
  getOneRecordsConference,
  getOneRecordsHigherEdu,
  getOneRecordsInternship,
  getOneRecordsOrganized,
  getOneRecordsParticipation,
  getOneRecordsResearch,
  getOneRecordsSport,
  getOneRecordsTechnical,
  updateRecordsCertificate,
  updateRecordsConference,
  updateRecordsHigherEdu,
  updateRecordsInternship,
  updateRecordsOrganized,
  updateRecordsParticipation,
  updateRecordsResearch,
  updateRecordsSport,
  updateRecordsTechnical,
} from "../API_Routes";

export default function TableData({ tableName }) {
  const { currentUser } = useSelector((state) => state.user);
  const [tableHead, setTableHead] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [editableFields, setEditableFields] = useState({});

  // getRecords by username apis
  const getApiRoute = (tableName) => {
    // Define your API routes based on the table names
    const apiRoutes = {
      Internship: (username) => getOneRecordsInternship(username),
      Research: (username) => getOneRecordsResearch(username),
      "Conference Publication": (username) => getOneRecordsConference(username),
      "Certificate Courses": (username) => getOneRecordsCertificate(username),
      "Sport Data": (username) => getOneRecordsSport(username),
      "Event Participated": (username) => getOneRecordsParticipation(username),
      "Event Organized": (username) => getOneRecordsOrganized(username),
      "Technical Events": (username) => getOneRecordsTechnical(username),
      "Higher Education": (username) => getOneRecordsHigherEdu(username),
    };

    const apiRoute = apiRoutes[tableName];
    console.log("apiRoute:", apiRoute);
    return apiRoute;
  };

  //delete apis
  const deleteAPIRoute = (tableName) => {
    const deleteRoutes = {
      Internship: (username, T_ID) =>
        `${deleteRecordsInternship}?username=${username}&T_ID=${T_ID}`,
      Research: (username, T_ID) =>
        `${deleteRecordsResearch}?username=${username}&T_ID=${T_ID}`,
      "Conference Publication": (username, T_ID) =>
        `${deleteRecordsConference}?username=${username}&T_ID=${T_ID}`,
      "Certificate Courses": (username, T_ID) =>
        `${deleteRecordsCertificate}?username=${username}&T_ID=${T_ID}`,
      "Sport Data": (username, T_ID) =>
        `${deleteRecordsSport}?username=${username}&T_ID=${T_ID}`,

      "Event Participated": (username, T_ID) =>
        `${deleteRecordsParticipation}?username=${username}&T_ID=${T_ID}`,
      "Event Organized": (username, T_ID) =>
        `${deleteRecordsOrganized}?username=${username}&T_ID=${T_ID}`,
      "Technical Events": (username, T_ID) =>
        `${deleteRecordsTechnical}?username=${username}&T_ID=${T_ID}`,
      "Higher Education": (username, T_ID) =>
        `${deleteRecordsHigherEdu}?username=${username}&T_ID=${T_ID}`,
    };

    return deleteRoutes[tableName];
  };

  //update  apis
  const updateAPIRoute = (tableName) => {
    const updateRoutes = {
      Internship: (username, T_ID) =>
        `${updateRecordsInternship}?username=${username}&T_ID=${T_ID}`,
      Research: (username, T_ID) =>
        `${updateRecordsResearch}?username=${username}&T_ID=${T_ID}`,
      "Conference Publication": (username, T_ID) =>
        `${updateRecordsConference}?username=${username}&T_ID=${T_ID}`,
      "Certificate Courses": (username, T_ID) =>
        `${updateRecordsCertificate}?username=${username}&T_ID=${T_ID}`,
      "Sport Data": (username, T_ID) =>
        `${updateRecordsSport}?username=${username}&T_ID=${T_ID}`,

      "Event Participated": (username, T_ID) =>
        `${updateRecordsParticipation}?username=${username}&T_ID=${T_ID}`,
      "Event Organized": (username, T_ID) =>
        `${updateRecordsOrganized}?username=${username}&T_ID=${T_ID}`,
      "Technical Events": (username, T_ID) =>
        `${updateRecordsTechnical}?username=${username}&T_ID=${T_ID}`,
      "Higher Education": (username, T_ID) =>
        `${updateRecordsHigherEdu}?username=${username}&T_ID=${T_ID}`,
    };

    return updateRoutes[tableName];
  };

  //get all records
  const getAllRecords = async () => {
    const user = await currentUser.Email;
    try {
      const apiurl = getApiRoute(tableName)(user);
      console.log("Table name:", tableName);
      console.log("apiRoute in getAllRecords:", apiurl);
      const response = await axios.get(apiurl, {
        headers: {
          "Content-Type": "application/json", // Make sure this header is defined
        },
      });
      // console.log("Rows : ", response.data.data);
      const columnHeaders = Object.keys(response.data.data[0]);
      // console.log("Columns:", columnHeaders);

      setTableHead(columnHeaders);

      // Filter records based on currentUser's name
      const userRecords = response.data.data.filter(
        (record) => record.Username === currentUser.Email
      );
      // console.log("UserRecords:", userRecords);
      setTableRows(userRecords);
      // setTableRows(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Handle delete records
  const onDelete = async (record) => {
    try {
      const apiurl = deleteAPIRoute(tableName)(currentUser.Email, record.T_ID);
      // console.log("Deleting record with:", currentUser.Email, record.T_ID);
      // console.log("Table:", tableName);

      await axios.delete(apiurl, {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          username: currentUser.Email,
          T_ID: record.T_ID,
        },
      });

      const updatedRows = tableRows.filter((r) => r.T_ID !== record.T_ID);
      setTableRows(updatedRows);
    } catch (error) {
      console.error("Error deleting record:", error.response.data.message);
      // Handle error gracefully, e.g., show a user-friendly message
    }
  };

  // Handle edit action
  const handleEdit = (record) => {
    setEditableFields({
      ...editableFields,
      [record.T_ID]: { ...record },
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
      // console.log("Updated:", updatedRecord);
      // Send a PUT request to update the record in the backend
      const apiurl = updateAPIRoute(tableName)(currentUser.Email, tId);
      // console.log("updating record with:", currentUser.Email, tId);
      // console.log("Table:", tableName);
      await axios.put(apiurl, updatedRecord, {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          username: currentUser.Email,
          T_ID: tId,
        },
      });

      // Update tableRows state
      const updatedRows = tableRows.map((r) =>
        r.T_ID === tId ? { ...r, ...updatedRecord } : r
      );
      setTableRows(updatedRows);

      // Clear editable fields
      setEditableFields({
        ...editableFields,
        [tId]: undefined,
      });
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
    window.open(link, "_blank");
  };

  return (
    <Card className="h-full w-full">
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
                    className={`${
                      index === 0 ? "hidden" : ""
                    } cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50`}
                  >
                    <Typography
                      variant="small"
                      color="blue"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70 font-bold text-blue-700"
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
                  className={`border-b border-solid border-blue-gray-200 ${
                    index % 2 === 0 ? "bg-blue-gray-50" : "bg-white"
                  }`}
                >
                  {tableHead.map((head, colIndex) => (
                    <td
                      key={head}
                      className={`${
                        colIndex === 0 ? "hidden" : ""
                      } p-4 whitespace-normal border-r ${
                        colIndex === tableHead.length - 1
                          ? ""
                          : "border-solid border-blue-gray-200"
                      }`}
                    >
                      {editableFields[record.T_ID] &&
                      editableFields[record.T_ID][head] !== undefined ? (
                        <Input
                          value={editableFields[record.T_ID][head]}
                          label={[head]}
                          onChange={(e) =>
                            handleEditField(record.T_ID, head, e.target.value)
                          }
                        />
                      ) : head.startsWith("Upload") ||
                        head.startsWith("Link") ? (
                        <DocumentIcon
                          onClick={() => handleLink(record[head])}
                          className="cursor-pointer w-6 h-6"
                        />
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
                    {editableFields[record.T_ID] ? (
                      <Tooltip content="Save Changes">
                        <IconButton
                          onClick={() => handleSave(record.T_ID)}
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
                            onClick={() => onDelete(record)}
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
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

// Add PropTypes validation
TableData.propTypes = {
  tableName: PropTypes.string.isRequired,
};
