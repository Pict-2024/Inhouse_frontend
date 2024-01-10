import { useEffect, useState } from "react";
import {
  // MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { DocumentIcon, PencilIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  // Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import axios from "axios";
import PropTypes from "prop-types";
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
} from "../API_Routes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function TableData({ tableName }) {
  const { currentUser } = useSelector((state) => state.user);
  const [tableHead, setTableHead] = useState([]);
  const [tableRows, setTableRows] = useState([]);

  // Generate API route based on tableName
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

    const apiRoute = apiRoutes[tableName];
    // console.log("apiRoute:", apiRoute); // Add this line
    return apiRoute;
  };

  //get all records
  const getAllRecords = async () => {
    const user = await currentUser.Email;
    try {
      const apiurl = getApiRoute(tableName)(user);
      // console.log("apiRoute in getAllRecords:", apiurl);
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

  useEffect(() => {
    getAllRecords();
  }, [tableName]);

  const navigate = useNavigate();

  const handleUpdate = (record) => {

    console.log("record id is : ", record.T_ID)
    const updateValue = true;
    const queryString = `?update=${updateValue}&tablename=${tableName}&rowid=${record.T_ID}`;
    // console.log("query string is : ", queryString);
    navigate(`/t/general${queryString}`);

  }

  const handleLink = (link) => {

    console.log("Link of document is : ", link);
    window.open(link, '_blank');
  }

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex items-center justify-between gap-8 mt-2">
          <div>
            <Typography variant="h5" color="blue-gray">
              {tableName}
            </Typography>
          </div>

          {/** 
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
          */}
        </div>
      </CardHeader>
      <CardBody className="px-0">
        <div className="overflow-x-auto  mx-4">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {tableHead.map((head, index) => (
                  <th
                    key={head}
                    className={`${
                      index === 0 ? "hidden" : "" // Hide the first column
                    } cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50`}
                  >
                    <Typography
                      variant="small"
                      color="blue"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
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
                        colIndex === 0 ? "hidden" : "" // Hide the first column
                      } p-4 whitespace-normal border-r ${
                        colIndex === tableHead.length - 1
                          ? ""
                          : "border-solid border-blue-gray-200"
                      }`}
                    >
                    {head.startsWith("Upload") || head.startsWith("Link") ? (

                      <DocumentIcon onClick={() => handleLink(record[head])} className="cursor-pointer w-6 h-6" />
                      ) : (
                        // Render the text content when head doesn't start with "Upload"
                        <Typography
                          variant="body"
                          color="black"
                          className="text-dark"
                        >
                        <p>
                        {record[head]}
                        </p>
                        </Typography>
                      )}
                    </td>
                  ))}
                  <td className="p-4 border-r border-solid border-blue-gray-200">
                    <Tooltip content="Edit data">
                      <IconButton onClick={() => handleUpdate(record)}  variant="text">
                        <PencilIcon  className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
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
