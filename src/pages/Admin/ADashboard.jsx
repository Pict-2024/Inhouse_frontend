import { IconButton, Modal, Box } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  Input,
  Textarea,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";

// ... (imports)

export const ADashBoard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [notices, setNotices] = useState([]);
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
  const [isSendModalOpen, setSendModalOpen] = useState(false);
  const [tableData, setTableData] = useState({
    students: [],
    teachers: [],
  });
  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString().split("T")[0];
  };
  const [notificationData, setNotificationData] = useState({
    Username: currentUser?.Username,
    Title: "",
    Description: "",
    Role: currentUser?.Role,
    date: getCurrentDate(),
  });

  const fetchNotices = async () => {
    try {
      console.log(currentUser?.Role);
      const apiUrl = "http://localhost:5000/api/v1/general/get-notices";
      const response = await axios.post(apiUrl, { Role: currentUser?.Role });
      console.log("Notices:", response.data.data);

      // Update the state with fetched notices
      setNotices(response.data.data);
    } catch (error) {
      console.error("Error fetching notices:", error.message);
    }
  };

  const handleOpenNotificationModal = () => {
    setNotificationModalOpen(true);
    fetchNotices();
  };

  const handleCloseNotificationModal = () => {
    setNotificationModalOpen(false);
  };

  const handleOpenSendModal = () => {
    setSendModalOpen(true);
    // Close the notification modal when opening the send modal
    handleCloseNotificationModal();
  };

  const handleCloseSendModal = () => {
    setSendModalOpen(false);
  };

  const handleNotificationChange = (e) => {
    setNotificationData({
      ...notificationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitNotification = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = "http://localhost:5000/api/v1/general/send-notice";
      await axios.post(apiUrl, {
        ...notificationData,
        Username: currentUser?.Username,
      });

      // console.log(response);

      // Fetch notices again after sending a new notification
      fetchNotices();

      // Clear the form data
      setNotificationData({
        Title: "",
        Description: "",
      });

      // Close the modal
      handleCloseSendModal();
    } catch (error) {
      console.error("Error sending notification:", error);
      // Handle error as needed
    }
  };

  const fetchAllTablesData = async () => {
    try {
      const apiUrl = "http://localhost:5000/api/v1/general/get-count-tables";
      const response = await axios.get(apiUrl);
      // console.log("Tables response", response.data.data);
      // Update the state with fetched table data
      const studentTablesData = response?.data?.data?.Student_Tables || [];
      const teacherTablesData = response?.data?.data?.Teacher_Tables || [];

      const formattedStudentData = studentTablesData.map((table) => {
        const tableName = Object.keys(table)[0];
        const count = table[tableName];
        return { label: tableName, value: count };
      });

      const formattedTeacherData = teacherTablesData.map((table) => {
        const tableName = Object.keys(table)[0];
        const count = table[tableName];
        return { label: tableName, value: count };
      });

      setTableData({
        students: formattedStudentData,
        teachers: formattedTeacherData,
        // Add other roles as needed
      });
      console.log("Table data:", tableData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllTablesData();
  }, []);

  return (
    <>
      <div
        className="mr-3"
        style={{ position: "absolute", top: "80px", right: "10px" }}
      >
        <Tooltip
          content="Notifications"
          placement="left"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 0 },
          }}
        >
          <IconButton color="primary" onClick={handleOpenNotificationModal}>
            <NotificationsActiveIcon color="warning" />
          </IconButton>
        </Tooltip>
      </div>

      {/* Card data */}
      <div className="flex flex-col m-1">
        {/* Teacher Records Section */}
        <div className="mb-4 ">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Teacher Records
          </Typography>
          <div className="flex flex-wrap gap-4 m-2" style={{ width: "90%" }}>
            {tableData?.teachers?.map((table, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4"
              >
                <Card className="border-2 shadow-md p-4">
                  <CardBody>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="mb-2 break-words"
                    >
                      {table.label}
                    </Typography>
                    <Typography variant="body2">{table.value}</Typography>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Student Records Section */}
        <div>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Student Records
          </Typography>
          <div className="flex flex-wrap gap-4 m-2" style={{ width: "90%" }}>
            {tableData?.students?.map((table, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4"
              >
                <Card className="border-2 shadow-md p-4">
                  <CardBody>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="mb-2 break-words"
                    >
                      {table.label}
                    </Typography>
                    <Typography variant="body2">{table.value}</Typography>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notification Modal */}
      <Modal
        open={isNotificationModalOpen}
        onClose={handleCloseNotificationModal}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 900,
            maxWidth: "80vw",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
          className="flex flex-col gap-2 rounded-md shadow-md overflow-y-auto"
        >
          <div className="flex justify-between relative">
            <div>
              <Tooltip
                content="Send Notifications"
                placement="top"
                style={{ position: "absolute" }}
                className="z-50"
              >
                <IconButton onClick={handleOpenSendModal}>
                  <NotificationsActiveIcon color="warning" />
                </IconButton>
              </Tooltip>
            </div>
            <div>
              <Typography
                variant="h4"
                color="black"
                className="mb-2 text-center"
              >
                Notices
              </Typography>
            </div>
            <div>
              <IconButton onClick={handleCloseNotificationModal}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>

          {/* Icon to open Send Notice Modal */}

          {notices?.map((notice, index) => (
            <Card
              key={index}
              shadow={false}
              className="border border-gray-300 p-2 my-2 rounded-md bg-blue-300"
            >
              <div>
                <Typography
                  variant="body1"
                  color="blue-gray"
                  className="mb-2 underline"
                  style={{ fontWeight: "600", letterSpacing: "0.5px" }}
                >
                  {notice.Title}
                </Typography>
                <Typography variant="body2" color="blue-gray">
                  {notice.Description}
                </Typography>
              </div>
              <div className="flex items-center justify-end p-2">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="mb-2 text-sm"
                >
                  {notice.Username} -{" "}
                  {moment(notice.DateTime).format("YYYY-MM-DD")}
                </Typography>
              </div>
            </Card>
          ))}
        </Box>
      </Modal>

      {/* Send Modal */}
      <Modal open={isSendModalOpen} onClose={handleCloseNotificationModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "background.paper",
            boxShadow: 24,
            height: 300,
            p: 4,
          }}
          className="flex flex-col gap-2 rounded-md shadow-md"
        >
          <Typography
            variant="h5"
            color="primary"
            style={{ textAlign: "center" }}
          >
            Send Notification
          </Typography>
          <div className="flex flex-col gap-4">
            <Input
              size="large"
              name="Title"
              value={notificationData.Title}
              label="Title"
              onChange={handleNotificationChange}
            />
            <Textarea
              size="large"
              name="Description"
              value={notificationData.Description}
              label="Description"
              onChange={handleNotificationChange}
            />
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <Button
              onClick={handleCloseSendModal}
              color="red"
              variant="text"
              // className="rounded-full"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitNotification}
              color="green"
              variant="filled"
              // className="rounded-full"
            >
              Send
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};
