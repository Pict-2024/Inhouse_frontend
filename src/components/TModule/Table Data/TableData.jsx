import { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
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
  getAllRecordsAttended,
  getAllRecordsBook,
  getAllRecordsConference,
  getAllRecordsConsultancy,
  getAllRecordsFaculty,
} from "../API_Routes";
import { useSelector } from "react-redux";

export default function TableData({ tableName }) {
  const { currentUser } = useSelector((state) => state.user);
  const [tableHead, setTableHead] = useState([]);
  const [tableRows, setTableRows] = useState([]);

  // Generate API route based on tableName
  const getApiRoute = (tableName) => {
    // Define your API routes based on the table names
    const apiRoutes = {
      "Book Publication": getAllRecordsBook,
      "Faculty Conference Publication": getAllRecordsFaculty,
      "Consultancy Report": getAllRecordsConsultancy,
      "Conference Seminars": getAllRecordsConference,
      "SSTP_FDP_Workshop Attended": getAllRecordsAttended,
    };

    return apiRoutes[tableName];
  };

  //get all records
  const getAllRecords = async () => {
    try {
      const response = await axios.get(getApiRoute(tableName));
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


  return (
    <Card className="h-full w-full" >
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex items-center justify-between gap-8 mt-2">
          <div>
            <Typography variant="h5" color="blue-gray">
              {tableName}
            </Typography>
          </div>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-0" >
        <div className="overflow-x-auto max-w-screen-xl mx-auto" >
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {tableHead.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
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
                      className={`p-4 whitespace-normal border-r ${
                        colIndex === tableHead.length - 1
                          ? ""
                          : "border-solid border-blue-gray-200"
                      }`}
                    >
                      <Typography
                        variant="body"
                        color="black"
                        className="text-dark" // Add text-dark class here
                      >
                        {record[head]}
                      </Typography>
                    </td>
                  ))}
                  <td className="p-4 border-r border-solid border-blue-gray-200">
                    <Tooltip content="Edit data">
                      <IconButton variant="text">
                        <PencilIcon className="h-4 w-4" />
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
