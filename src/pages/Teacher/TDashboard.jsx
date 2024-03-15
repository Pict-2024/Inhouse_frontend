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
import { BASE_URL } from "../../api";
import Spinner from "../../components/Spinner";
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
      const apiUrl = `${BASE_URL}/general/get-notices`;
      const response = await axios.post(apiUrl, { Role: currentUser?.Role });
      console.log("Notifications:", response.data.data);
      setNotifications(response.data.data);
    } catch (error) {
      console.error("Error fetching notifications:", error.message);
    }
  };

  const handleSubmitNotification = async () => {
    try {
      const apiUrl = `${BASE_URL}/general/send-notice`;
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
  const [loading, setLoading] = useState(false);
  const teacherMapping = {
    research_publication: "Research Publications",
    book_publication: "Book Publications",
    faculty_conference_publication: "Faculty Conference Publications",
    grants: "Grants",
    consultancy_report: "Consultancy Reports",
    patent_publication: "Patent Publications",
    conference_seminar_workshops: "Conference Seminar Workshops",
    sttp_fdp_conference_attended: "STTP/FDP Conference Attended",
    webinar_guest_lectures: "Webinar Guest Lectures",
    mous: "Memorandums of Understanding (MoUs)",
    certificate_courses: "Certificate Courses",
    professional_affiliation: "Professional Affiliations",
    resource_person: "Resource Persons",
    extension_activity: "Extension Activities",
    technical_competition_fest: "Technical Competitions/Fests",
    faculty_achievements: "Faculty Achievements",
    industrial_fields_tour: "Industrial Fields Tours",
    contribution_to_bos: "Contribution to Board of Studies (BOS)",
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const apiUrl = `${BASE_URL}/general/get-count-user`;
      console.log(currentUser?.Username);
      const response = await axios.post(apiUrl, {
        username: currentUser?.Username,
      });
      arr = response.data.data.Tables;
      const formattedTeacherData = arr.map((table) => {
        const tableName = Object.keys(table)[0];
        const count = table[tableName];
        const formattedLabel = teacherMapping[tableName] || tableName;
        return { label: formattedLabel, value: count };
      });

      console.log("User counts:", arr);
      setUserCounts(formattedTeacherData);
      setLoading(false);
      // console.log("teacher: ", formattedTeacherData);
      console.log(userCounts); // Assuming the API response is an array of user counts
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data from the API:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? <Spinner /> :
        <>
          {/* User Profile Card */}
          <Card
            color="transparent"
            shadow={false}
            className=" w-full p-3 my-2 rounded-md "
          >
            {/* User Profile Form */}
            <form
              className="mt-8 mb-2 w-full flex flex-col"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="mb-4 flex flex-wrap">
                <div className="w-full px-4">
                  <div className="mb-2 flex flex-col gap-4 md:flex-row">
                    <div className="w-full px-2">
                      <Typography variant="h6" color="blue-gray" className="mb-3">
                        Username
                      </Typography>
                      <Input
                        size="lg"
                        name="username"
                        value={formData.userProfile.username}
                        label=""
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
                        label=""
                        onChange={handleUserProfileChange}
                      />
                    </div>
                  </div>
                  {/* Add more profile fields here */}
                </div>
              </div>

              {/** 
          <Button type="submit" className="mt-4" fullWidth>
            Save Changes
          </Button> */}
            </form>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 px-4">
            {userCounts?.map((userCount, index) => (
              <div
                key={index}
                className="w-full px-4 py-1 transition duration-300 relative group"
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
        </>}

    </>
  );
}