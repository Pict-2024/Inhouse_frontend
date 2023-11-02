import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

export default function TDashboard() {
  const [formData, setFormData] = useState({
    userProfile: {
      username: "pict",
      email: "pict@ms.pict.edu",
    },
  });

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
        className="border border-gray-300 w-85 mx-auto p-2 my-2 rounded-md"
      >
        <Typography
          variant="h4"
          color="blue-gray"
          className="mx-auto underline underline-offset-2"
        >
          User Profile
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="mb-2 flex flex-wrap -mx-2">
                <div className="w-1/2 px-2">
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Username
                  </Typography>
                  <Input
                    size="lg"
                    name="username"
                    value={formData.userProfile.username}
                    placeholder="Username"
                    className="border-t-blue-gray-200 focus-border-t-gray-900"
                    onChange={handleUserProfileChange}
                  />
                </div>
                <div className="w-1/2 px-2">
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Email
                  </Typography>
                  <Input
                    size="lg"
                    name="email"
                    value={formData.userProfile.email}
                    placeholder="Email"
                    className="border-t-blue-gray-200 focus-border-t-gray-900"
                    onChange={handleUserProfileChange}
                  />
                </div>
              </div>
              {/* Add more profile fields here */}
            </div>
          </div>

          <Button type="submit" className="mt-4" fullWidth>
            Add Changes
          </Button>
        </form>
      </Card>
    </>
  );
}
