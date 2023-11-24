import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);
  const [register, setRegister] = useState(false);

  const handleVerify = async () => {
    try {
      const response = await axios.post("http://localhost:5000/verify", {
        // eslint-disable-next-line no-undef
        email,
      });

      if (response.data === "Email verified") {
        setVerified(true);
        setError(null);
      } else {
        setError("Invalid email");
      }

      console.log(response.data);
    } catch (error) {
      setError("Invalid email");
      console.error(error.response.data);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if the user is already registered
      const response = await axios.get(
        `http://localhost:5000/checkRegistration/${formData.email}`
      );

      if (response.data && response.data.registered) {
        setError("User already registered");
      } else {
        // Proceed with registration
        const registerResponse = await axios.post(
          "http://localhost:5000/register",
          formData
        );
        console.log(registerResponse.data);
        setError(null); // Clear any previous errors
        setRegister(true);
      }
    } catch (error) {
      setError("Registration failed");
      console.error(error.response.data);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card
        color="transparent"
        shadow={true}
        className="border border-gray-300 w-85 p-6 rounded-md"
      >
        <Typography
          variant="h4"
          color="blue-gray"
          className="mb-4 text-center text-bold"
        >
          Register
        </Typography>

        <form className="mt-2" onSubmit={handleSubmit}>
          <div className="mb-4">
            <Typography variant="h6" color="blue-gray">
              Name
            </Typography>
            <Input
              size="lg"
              name="name"
              value={formData.name}
              placeholder="Name"
              className="border-t-blue-gray-200 focus-border-t-gray-900"
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray">
              Email
            </Typography>
            <Input
              size="lg"
              name="email"
              value={formData.email}
              placeholder="Email"
              className="border-t-blue-gray-200 focus-border-t-gray-900"
              onChange={handleInputChange}
            />
          </div>

          {verified && (
            <>
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
                Register
              </Button>
            </>
          )}

          {!verified && (
            <Button
              type="button"
              onClick={handleVerify}
              className="mt-4"
              fullWidth
            >
              Verify Email
            </Button>
          )}
        </form>

        {verified && (
          <p className="text-green-500 mt-2">
            Email verified! You can now set your password.
          </p>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {register && (
          <p className="text-green-500 mt-2">Registered Successfully!</p>
        )}
      </Card>
    </div>
  );
}