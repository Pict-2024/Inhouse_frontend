import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

export default function TDashboard({ teacherId }) {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const teacherIds = searchParams.get("teacherId");

  console.log("Teacher id is : ", teacherIds);
  
  const [formData, setFormData] = useState({
    userProfile: {
      username: currentUser?.Name,
      email: currentUser?.Username,
    },
  });

  const tableData = [
    {
      name: "Table 1",
      data: [
        {
          id: 1,
          name: "John Doe",
          age: 25,
          city: "New York",
          type: "Jane Smith",
          doi: 30,
          no: "Los Angeles",
          you: 25,
          menubar: "New York",
          header: "Jane Smith",
          she: 30,
          it: "Los Angeles",
          a: "Jane Smith",
          b: 30,
          c: "Los Angeles",
          d: "Jane Smith",
          e: 30,
          f: "Los Angeles",
          k: "Jane Smith",
          l: 30,
          m: "Los Angeles",
        },
        {
          id: 1,
          name: "John Doe",
          age: 25,
          city: "New York",
          type: "Jane Smith",
          doi: 30,
          no: "Los Angeles",
          you: 25,
          menubar: "New York",
          header: "Jane Smith",
          she: 30,
          it: "Los Angeles",
          a: "Jane Smith",
          b: 30,
          c: "Los Angeles",
          d: "Jane Smith",
          e: 30,
          f: "Los Angeles",
        },
        {
          id: 1,
          name: "John Doe",
          age: 25,
          city: "New York",
          type: "Jane Smith",
          doi: 30,
          no: "Los Angeles",
          you: 25,
          menubar: "New York",
          header: "Jane Smith",
          she: 30,
          it: "Los Angeles",
          a: "Jane Smith",
          b: 30,
          c: "Los Angeles",
          d: "Jane Smith",
          e: 30,
          f: "Los Angeles",
        },
        {
          id: 1,
          name: "John Doe",
          age: 25,
          city: "New York",
          type: "Jane Smith",
          doi: 30,
          no: "Los Angeles",
          you: 25,
          menubar: "New York",
          header: "Jane Smith",
          she: 30,
          it: "Los Angeles",
          a: "Jane Smith",
          b: 30,
          c: "Los Angeles",
          d: "Jane Smith",
          e: 30,
          f: "Los Angeles",
        },
        {
          id: 1,
          name: "John Doe",
          age: 25,
          city: "New York",
          type: "Jane Smith",
          doi: 30,
          no: "Los Angeles",
          you: 25,
          menubar: "New York",
          header: "Jane Smith",
          she: 30,
          it: "Los Angeles",
          a: "Jane Smith",
          b: 30,
          c: "Los Angeles",
          d: "Jane Smith",
          e: 30,
          f: "Los Angeles",
        },
      ],
    },
    {
      name: "Table 2",
      data: [
        { id: 1, name: "Alice Johnson", age: 28, city: "Chicago" },
        { id: 2, name: "Bob Brown", age: 35, city: "San Francisco" },
        { id: 3, name: "Bob Brown", age: 35, city: "San Francisco" },
        { id: 4, name: "Bob Brown", age: 35, city: "San Francisco" },
        { id: 5, name: "Bob Brown", age: 35, city: "San Francisco" },
        { id: 6, name: "Bob Brown", age: 35, city: "San Francisco" },
        { id: 7, name: "Bob Brown", age: 35, city: "San Francisco" },
        { id: 8, name: "Bob Brown", age: 35, city: "San Francisco" },
        { id: 9, name: "Bob Brown", age: 35, city: "San Francisco" },
        { id: 10, name: "Bob Brown", age: 35, city: "San Francisco" },
      ],
    },
    {
      name: "Table 3",
      data: [
        { id: 1, name: "Alice Johnson", age: 28, city: "Chicago" },
        { id: 2, name: "Bob Brown", age: 35, city: "San Francisco" },
        { id: 3, name: "Bob Brown", age: 35, city: "San Francisco" },
        { id: 4, name: "Bob Brown", age: 35, city: "San Francisco" },
        { id: 5, name: "Bob Brown", age: 35, city: "San Francisco" },
        { id: 6, name: "Bob Brown", age: 35, city: "San Francisco" },
        { id: 7, name: "Bob Brown", age: 35, city: "San Francisco" },
        { id: 8, name: "Bob Brown", age: 35, city: "San Francisco" },
        { id: 9, name: "Bob Brown", age: 35, city: "San Francisco" },
      ],
    },
    {
      name: "Table 4",
      data: [
        { id: 1, name: "Alice Johnson", age: 28, city: "Chicago" },
        { id: 2, name: "Bob Brown", age: 35, city: "San Francisco" },
      ],
    },
    // Add more tables as needed
  ];

  const TableComponent = ({ tableName, tableData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 3;

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = tableData.slice(
      indexOfFirstRecord,
      indexOfLastRecord
    );

    const totalPages = Math.ceil(tableData.length / recordsPerPage);

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };

    const renderTableHeader = () => {
      // Use the first record to dynamically generate the headers
      const headers = Object.keys(tableData[0]);
      return (
        <tr className="bg-blue-500 text-white">
          {headers.map((header, index) => (
            <th key={index} className="py-2 px-4 border-r">
              {header}
            </th>
          ))}
        </tr>
      );
    };

    const renderTableRows = (record) => {
      return (
        <tr key={record.id} className="text-center border-t">
          {Object.values(record).map((value, index) => (
            <td key={index} className="py-2 px-4 border-r">
              {value}
            </td>
          ))}
        </tr>
      );
    };

    return (
      <Card
        color="transparent"
        shadow={false}
        className="border border-gray-300 w-full p-2 my-2 rounded-md overflow-x-auto"
      >
        <Typography tag="h2" className="text-xl font-bold mb-2 text-center">
          {tableName}
        </Typography>
        <div>
          <table className="w-full table-auto border-collapse">
            <thead>{renderTableHeader()}</thead>
            <tbody>
              {currentRecords.map((record) => renderTableRows(record))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500"
                }`}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        )}
      </Card>
    );
  };
  // const publications = [
  //   { type: "Book Publication", count: 20 },
  //   { type: "Research Publication", count: 3 },
  //   { type: "Research Publication", count: 3 },
  //   { type: "Research Publication", count: 3 },
  //   { type: "Research Publication", count: 3 },
  //   { type: "Research Publication", count: 3 },
  //   { type: "Research Publication", count: 3 },
  //   { type: "Research Publication", count: 3 },
  //   { type: "Research Publication", count: 3 },
  //   { type: "Research Publication", count: 3 },
  //   { type: "Research Publication", count: 3 },
  //   { type: "Research Publication", count: 3 },
  //   // Add more publications here
  // ];

  const handleUserProfileChange = (e) => {
    setFormData({
      ...formData,
      userProfile: {
        ...formData.userProfile,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <>
      {teacherIds === null  && (
        <>
          <Card
            color="transparent"
            shadow={false}
            className="border border-gray-300 w-full p-2 my-2 rounded-md "
          >
            <Typography
              variant="h4"
              color="blue-gray"
              className="mx-auto underline underline-offset-2"
            >
              User Profile
            </Typography>

            <form
              className="mt-8 mb-2 w-full flex flex-col"
              onSubmit={handleSubmit}
            >
              <div className="mb-4 flex flex-wrap -mx-4">
                <div className="w-full px-4">
                  <div className="mb-2 flex flex-col sm:flex-row">
                    <div className="w-full px-2">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="mb-3"
                      >
                        Username
                      </Typography>
                      <Input
                        size="lg"
                        name="username"
                        value={formData.userProfile.username}
                        label="Username"
                        onChange={handleUserProfileChange}
                      />
                    </div>
                    <div className="w-full px-2">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="mb-3"
                      >
                        Email
                      </Typography>
                      <Input
                        size="lg"
                        name="email"
                        value={formData.userProfile.email}
                        label="Email"
                        onChange={handleUserProfileChange}
                      />
                    </div>
                  </div>
                  {/* Add more profile fields here */}
                </div>
              </div>

              <Button type="submit" className="mt-4" fullWidth>
                Save Changes
              </Button>
            </form>
          </Card>
        </>
      )}

      {/* <div className="flex justify-around gap-2 flex-wrap -mx-4">
        {publications.map((publication, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 py-1 my-2 transition duration-300 relative group"
          >
            <div
              className="w-full h-full rounded-lg p-4"
              style={{
                backgroundColor: index % 2 !== 0 ? "#F0F0F0" : "#D6EAF8",
                transition: "transform 0.3s ease-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <Typography
                variant="h6"
                color="dark"
                className="text-center mb-3 text-wrap"
              >
                {publication.type}
              </Typography>
              <Typography variant="h5" color="dark" className="text-center">
                {publication.count}
              </Typography>
            </div>
          </div>
        ))}
      </div> */}

      {/* All table data */}
     
    </>
  );
}
