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
  getOneRecordsAchievements,
  getOneRecordsAttended,
  getOneRecordsBook,
  getOneRecordsCertificate,
  getOneRecordsConference,
  getOneRecordsConsultancy,
  getOneRecordsContribution,
  getOneRecordsExtension,
  getOneRecordsFaculty,
  getOneRecordsGrants,
  getOneRecordsIndustrial,
  getOneRecordsMous,
  getOneRecordsPatent,
  getOneRecordsProfessional,
  getOneRecordsResearch,
  getOneRecordsResource,
  getOneRecordsTechnical,
  getOneRecordsWebinar,
  deleteRecordsBook,
  deleteRecordsResearch,
  deleteRecordsFaculty,
  deleteRecordsConsultancy,
  deleteRecordsPatent,
  deleteRecordsAttended,
  deleteRecordsWebinar,
  deleteRecordsMous,
  deleteRecordsCertificate,
  deleteRecordsProfessional,
  deleteRecordsResource,
  deleteRecordsExtension,
  deleteRecordsTechnical,
  deleteRecordsAchievements,
  deleteRecordsIndustrial,
  deleteRecordsContribution,
  deleteRecordsConference,
  deleteRecordsGrants,
  updateRecordsBook,
  updateRecordsResearch,
  updateRecordsFaculty,
  updateRecordsGrants,
  updateRecordsConsultancy,
  updateRecordsPatent,
  updateRecordsConference,
  updateRecordsAttended,
  updateRecordsWebinar,
  updateRecordsMous,
  updateRecordsCertificate,
  updateRecordsProfessional,
  updateRecordsResource,
  updateRecordsExtension,
  updateRecordsTechnical,
  updateRecordsAchievements,
  updateRecordsIndustrial,
  updateRecordsContribution,
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
      Research: (username) => getOneRecordsResearch(username),
      "Book Publication": (username) => getOneRecordsBook(username),
      "Faculty Conference Publication": (username) =>
        getOneRecordsFaculty(username),
      Grants: (username) => getOneRecordsGrants(username),
      "Consultancy Report": (username) => getOneRecordsConsultancy(username),
      "Patent Publication": (username) => getOneRecordsPatent(username),
      "Conferences, Seminars, Workshops, FDP, STTP Organized /conducted": (
        username
      ) => getOneRecordsConference(username),
      "STTP/FDP/Workshop/Conference Attended": (username) =>
        getOneRecordsAttended(username),
      "Webinar/Guest-Expert Lecture / Video conference /Invited talks organized /conducted":
        (username) => getOneRecordsWebinar(username),
      "Number of MoUs, collaborations / linkages for Faculty exchange": (
        username
      ) => getOneRecordsMous(username),
      "Certificate Courses": (username) => getOneRecordsCertificate(username),
      "Professional Affiliations": (username) =>
        getOneRecordsProfessional(username),
      "Faculty as Resource Person you": (username) =>
        getOneRecordsResource(username),
      "Extension Activity": (username) => getOneRecordsExtension(username),
      "Technical Competitions / Tech Fest Organized/Extra & Co-curricular activities Organized":
        (username) => getOneRecordsTechnical(username),
      "Faculty Achievement": (username) => getOneRecordsAchievements(username),
      "Industrial Visits / Tours / Field Trip": (username) =>
        getOneRecordsIndustrial(username),
      "Contribution to BoS": (username) => getOneRecordsContribution(username),
    };

    console.log("returned table :", tableName);
    const apiRoute = apiRoutes[tableName];
    console.log("apiRoute:", apiRoute); // Add this line
    return apiRoute;
  };

  //delete apis
  const deleteAPIRoute = (tableName) => {
    const deleteRoutes = {
      "Book Publication": (username, T_ID) =>
        `${deleteRecordsBook}?username=${username}&T_ID=${T_ID}`,
      Research: (username, T_ID) =>
        `${deleteRecordsResearch}?username=${username}&T_ID=${T_ID}`,
      "Faculty Conference Publication": (username, T_ID) =>
        `${deleteRecordsFaculty}?username=${username}&T_ID=${T_ID}`,
      Grants: (username, T_ID) =>
        `${deleteRecordsGrants}?username=${username}&T_ID=${T_ID}`,
      "Consultancy Report": (username, T_ID) =>
        `${deleteRecordsConsultancy}?username=${username}&T_ID=${T_ID}`,
      "Patent Publication": (username, T_ID) =>
        `${deleteRecordsPatent}?username=${username}&T_ID=${T_ID}`,
      "Conferences, Seminars, Workshops, FDP, STTP Organized /conducted": (
        username,
        T_ID
      ) => `${deleteRecordsConference}?username=${username}&T_ID=${T_ID}`,
      "STTP/FDP/Workshop/Conference Attended": (username, T_ID) =>
        `${deleteRecordsAttended}?username=${username}&T_ID=${T_ID}`,
      "Webinar/Guest-Expert Lecture / Video conference /Invited talks organized /conducted":
        (username, T_ID) =>
          `${deleteRecordsWebinar}?username=${username}&T_ID=${T_ID}`,
      "Number of MoUs, collaborations / linkages for Faculty exchange": (
        username,
        T_ID
      ) => `${deleteRecordsMous}?username=${username}&T_ID=${T_ID}`,
      "Certificate Courses": (username, T_ID) =>
        `${deleteRecordsCertificate}?username=${username}&T_ID=${T_ID}`,
      "Professional Affiliations": (username, T_ID) =>
        `${deleteRecordsProfessional}?username=${username}&T_ID=${T_ID}`,
      "Faculty as Resource Person you": (username, T_ID) =>
        `${deleteRecordsResource}?username=${username}&T_ID=${T_ID}`,
      "Extension Activity": (username, T_ID) =>
        `${deleteRecordsExtension}?username=${username}&T_ID=${T_ID}`,
      "Technical Competitions / Tech Fest Organized/Extra & Co-curricular activities Organized":
        (username, T_ID) =>
          `${deleteRecordsTechnical}?username=${username}&T_ID=${T_ID}`,
      "Faculty Achievement": (username, T_ID) =>
        `${deleteRecordsAchievements}?username=${username}&T_ID=${T_ID}`,
      "Industrial Visits / Tours / Field Trip": (username, T_ID) =>
        `${deleteRecordsIndustrial}?username=${username}&T_ID=${T_ID}`,
      "Contribution to BoS": (username, T_ID) =>
        `${deleteRecordsContribution}?username=${username}&T_ID=${T_ID}`,
    };

    return deleteRoutes[tableName];
  };

  //update  apis
  const updateAPIRoute = (tableName) => {
    const updateRoutes = {
      "Book Publication": (username, T_ID) =>
        `${updateRecordsBook}?username=${username}&T_ID=${T_ID}`,
      Research: (username, T_ID) =>
        `${updateRecordsResearch}?username=${username}&T_ID=${T_ID}`,
      "Faculty Conference Publication": (username, T_ID) =>
        `${updateRecordsFaculty}?username=${username}&T_ID=${T_ID}`,
      Grants: (username, T_ID) =>
        `${updateRecordsGrants}?username=${username}&T_ID=${T_ID}`,
      "Consultancy Report": (username, T_ID) =>
        `${updateRecordsConsultancy}?username=${username}&T_ID=${T_ID}`,
      "Patent Publication": (username, T_ID) =>
        `${updateRecordsPatent}?username=${username}&T_ID=${T_ID}`,
      "Conferences, Seminars, Workshops, FDP, STTP Organized /conducted": (
        username,
        T_ID
      ) => `${updateRecordsConference}?username=${username}&T_ID=${T_ID}`,
      "STTP/FDP/Workshop/Conference Attended": (username, T_ID) =>
        `${updateRecordsAttended}?username=${username}&T_ID=${T_ID}`,
      "Webinar/Guest-Expert Lecture / Video conference /Invited talks organized /conducted":
        (username, T_ID) =>
          `${updateRecordsWebinar}?username=${username}&T_ID=${T_ID}`,
      "Number of MoUs, collaborations / linkages for Faculty exchange": (
        username,
        T_ID
      ) => `${updateRecordsMous}?username=${username}&T_ID=${T_ID}`,
      "Certificate Courses": (username, T_ID) =>
        `${updateRecordsCertificate}?username=${username}&T_ID=${T_ID}`,
      "Professional Affiliations": (username, T_ID) =>
        `${updateRecordsProfessional}?username=${username}&T_ID=${T_ID}`,
      "Faculty as Resource Person you": (username, T_ID) =>
        `${updateRecordsResource}?username=${username}&T_ID=${T_ID}`,
      "Extension Activity": (username, T_ID) =>
        `${updateRecordsExtension}?username=${username}&T_ID=${T_ID}`,
      "Technical Competitions / Tech Fest Organized/Extra & Co-curricular activities Organized":
        (username, T_ID) =>
          `${updateRecordsTechnical}?username=${username}&T_ID=${T_ID}`,
      "Faculty Achievement": (username, T_ID) =>
        `${updateRecordsAchievements}?username=${username}&T_ID=${T_ID}`,
      "Industrial Visits / Tours / Field Trip": (username, T_ID) =>
        `${updateRecordsIndustrial}?username=${username}&T_ID=${T_ID}`,
      "Contribution to BoS": (username, T_ID) =>
        `${updateRecordsContribution}?username=${username}&T_ID=${T_ID}`,
    };

    return updateRoutes[tableName];
  };

  //get all records
  const getAllRecords = async () => {
    const user = await currentUser.Username;
    try {
      const apiurl = getApiRoute(tableName)(user);
      console.log("apiRoute in getAllRecords teacher:", apiurl);
      const response = await axios.get(apiurl, {
        headers: {
          "Content-Type": "application/json", // Make sure this header is defined
        },
      });
      // console.log("Rows : ", response.data.data);
      const columnHeaders = Object.keys(response.data.data[0]);
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

  //Handle delete records
  const onDelete = async (record) => {
    try {
      const apiurl = deleteAPIRoute(tableName)(
        currentUser.Username,
        record.T_ID
      );
      // console.log("Deleting record with:", currentUser.Email, record.T_ID);
      // console.log("Table:", tableName);

      await axios.delete(apiurl, {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          username: currentUser.Username,
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
          username: currentUser.Username,
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
