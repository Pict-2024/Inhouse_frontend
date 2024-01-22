import { IconButton, Modal, Box } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Card,
  Input,
  Textarea,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import moment from "moment";
var arr = new Array();
export default function TDashboard() {
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    userProfile: {
      username: currentUser?.Name,
      email: currentUser?.Username,
    },
  });

  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString().split("T")[0];
  };

  const [notifications, setNotifications] = useState([]);
  const [notificationData, setNotificationData] = useState({
    Username: currentUser?.Username,
    Title: "",
    Description: "",
    Role: currentUser?.Role,
    date: getCurrentDate(),
  });

  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
  const [isSendModalOpen, setSendModalOpen] = useState(false);

  const handleUserProfileChange = (e) => {
    setFormData({
      ...formData,
      userProfile: {
        ...formData.userProfile,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleNotificationChange = (e) => {
    setNotificationData({
      ...notificationData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchNotifications = async () => {
    try {
      console.log(currentUser?.Role);
      const apiUrl = "http://localhost:5000/api/v1/general/get-notices";
      const response = await axios.post(apiUrl, { Role: currentUser?.Role });
      console.log("Notifications:", response.data.data);
      setNotifications(response.data.data);
    } catch (error) {
      console.error("Error fetching notifications:", error.message);
    }
  };

  const handleSubmitNotification = async () => {
    try {
      const apiUrl = "http://localhost:5000/api/v1/general/send-notice";
      await axios.post(apiUrl, notificationData);
      // console.log(response);
      fetchNotifications();
      setNotificationData({
        Username: currentUser?.Username,
        Title: "",
        Description: "",
        Role: currentUser?.Role,
        date: getCurrentDate(),
      });

      // Close the modal
      handleCloseSendModal();
    } catch (error) {
      console.error("Error sending notification:", error.message);
    }
    setSendModalOpen(false);
  };

  const handleOpenNotificationModal = () => {
    setNotificationModalOpen(true);
    fetchNotifications();
  };

  const handleCloseNotificationModal = () => {
    setNotificationModalOpen(false);
  };

  const handleOpenSendModal = () => {
    setSendModalOpen(true);
  };

  const handleCloseSendModal = () => {
    setSendModalOpen(false);
  };

  const [userCounts, setUserCounts] = useState([]);

  const fetchData = async () => {
    try {
      const apiUrl = "http://localhost:5000/api/v1/general/get-count-user";
      console.log(currentUser?.Username);
      const response = await axios.post(apiUrl, {
        username: currentUser?.Username,
      });
      arr = response.data.data.Tables;
      const formattedStudentData = arr.map((table) => {
        const tableName = Object.keys(table)[0];
        const count = table[tableName];
        return { label: tableName, value: count };
      });

      console.log("User counts:", arr);
      setUserCounts(formattedStudentData);
      console.log(userCounts); // Assuming the API response is an array of user counts
    } catch (error) {
      console.error("Error fetching data from the API:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* User Profile Card */}
      <Card
        color="transparent"
        shadow={false}
        className="border border-gray-300 w-full p-3 my-2 rounded-md overflow-x-hidden"
      >
        <div className="flex">
          <Typography
            variant="h4"
            color="blue-gray"
            className="mx-auto underline underline-offset- text-center "
          >
            User Profile
          </Typography>
          <div
            className="mr-3 "
            style={{ position: "absolute", top: "0", right: "0" }}
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
        </div>

        {/* User Profile Form */}
        <form
          className="mt-8 mb-2 w-full flex flex-col"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="mb-2 flex flex-col sm:flex-row">
                <div className="w-full px-2">
                  <Typography variant="h6" color="blue-gray" className="mb-3">
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
                  <Typography variant="h6" color="blue-gray" className="mb-3">
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

      <div className="flex justify-around gap-2 flex-wrap -mx-4">
        {userCounts?.map((userCount, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 py-1 my-2 transition duration-300 relative group"
          >
            {/* User Counts Display Content */}
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
                {userCount.label}
              </Typography>
              <Typography variant="h5" color="dark" className="text-center">
                {userCount.value}
              </Typography>
            </div>
          </div>
        ))}
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

          {notifications?.map((notice, index) => (
            <Card
              key={index}
              color="light-blue"
              shadow={false}
              className="border border-gray-300 p-2 my-2 rounded-md bg-blue-300"
            >
              <div>
                <Typography
                  variant="body1"
                  color="black"
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
}
