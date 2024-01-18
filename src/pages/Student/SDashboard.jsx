import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";

export default function SDashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    userProfile: {
      username: currentUser?.Name,
      email: currentUser?.Username,
    },
  });

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
    </>
  );
}
