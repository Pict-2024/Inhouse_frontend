import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    verifyEmail: false,
  });

  const handleInputChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card
        color="transparent"
        shadow={true}
        className="border border-gray-300 w-85 p-6 rounded-md"
      >
        <Typography variant="h4" color="blue-gray" className="mb-4 text-center">
          Login
        </Typography>

        <form className="mt-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex justify-between items-center">
            <div>
              <div className="flex justify-between">
                <Typography variant="h6" color="blue-gray">
                  Email
                </Typography>
                <div>
                  <label className="flex">
                    <input
                      type="checkbox"
                      name="verifyEmail"
                      checked={formData.verifyEmail}
                      onChange={handleInputChange}
                      className="form-checkbox text-blue-gray-500"
                    />
                    <span className="ml-2 text-blue-gray-500">Verify</span>
                  </label>
                </div>
              </div>
              <Input
                size="lg"
                name="email"
                value={formData.email}
                placeholder="Email"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray">
              Password
            </Typography>
            <Input
              size="lg"
              name="password"
              value={formData.password}
              type="password"
              placeholder="Password"
              className="border-t-blue-gray-200 focus-border-t-gray-900"
              onChange={handleInputChange}
            />
          </div>

          <Button type="submit" className="mt-4" fullWidth>
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}
