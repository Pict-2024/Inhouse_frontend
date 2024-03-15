import { useEffect, useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../api";
import Spinner from './../../components/Spinner';

var arr = new Array();
export default function SDashboard() {
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    userProfile: {
      username: currentUser?.Name,
      email: currentUser?.Username,
    },
  });

  const [userCounts, setUserCounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const studentMapping = {
    student_internship_details: "Student Internship Details",
    student_research_publication: "Student Research Publication",
    student_conference_publication: "Student Conference Publication",
    student_certificate_course: "Student Certificate Course",
    student_sports_data: "Student Sports Data",
    student_event_participated: "Student Event Participated",
    student_event_organized: "Student Event Organized",
    student_technical_events: "Student Technical Events",
    student_higher_education: "Student Higher Education",
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
      const formattedStudentData = arr.map((table) => {
        const tableName = Object.keys(table)[0];
        const count = table[tableName];
        const formattedLabel = studentMapping[tableName] || tableName;
        return { label: formattedLabel, value: count };
      });

      console.log("User counts:", arr);
      setUserCounts(formattedStudentData);
      setLoading(false);
      console.log(userCounts); // Assuming the API response is an array of user counts
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data from the API:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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
      {loading ? <Spinner /> :
        <>
          <Card
            color="transparent"
            shadow={false}
            className="w-full p-2 my-2 rounded-md "
          >

            <form
              className="mt-8 mb-2 w-full flex flex-col"
              onSubmit={handleSubmit}
            >
              <div className="mb-4 flex flex-wrap ">
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
          </Button>*/}
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
