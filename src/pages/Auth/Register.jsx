import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    gmail: "",
    password: "",
    newPassword: "",
  });
  // const [name, setName] = useState("");
  // const [gmail, setGmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);
  const [register, setRegister] = useState(false);

  const handleVerify = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/verify", {
        // eslint-disable-next-line no-undef
        // gmail,
        // password
        gmail: formData.gmail,
        password: formData.password


      });

      if (response.data === "Email and Password verified") {
        setVerified(true);
        setError(null);
      } else {
        setError("Invalid Credentials");
      }

      console.log(response.data);
    } catch (error) {
      setError("Invalid Credentials");
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
      // Check if the user is already registered and verified
      if (verified) {
        // Proceed with registration
        const registerResponse = await axios.post(
          "http://localhost:5000/api/v1/auth/register",
          { name: formData.name, 
            gmail: formData.gmail, 
            password: formData.newPassword 
          }
        );
        console.log(registerResponse?.data);

        setError(null);
        setRegister(true);
      } else {
        setError("Please verify your email and password first.");
      }
    } catch (error) {
      setError("Registration failed");
      console.error(error.response.data);
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Card
        color="transparent"
        shadow={true}
        className="border bg-white border-gray-300 w-1/3 h-3/5 p-6 rounded-md"
      >
        <Typography
          variant="h4"
          color="blue-gray"
          className="mb-4 text-center w-full text-bold"
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
              // onChange={(e) => setName(e.target.value)}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray">
              Gmail
            </Typography>
            <Input
              size="lg"
              name="gmail"
              value={formData.gmail}
              placeholder="gmail"
              className="border-t-blue-gray-200 focus-border-t-gray-900"
              // onChange={(e) => setGmail(e.target.value)}
              onChange={handleInputChange}
            />
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
              // onChange={(e) => setPassword(e.target.value)}
              onChange={handleInputChange}
            />
          </div>
          <Button
            type="button"
            className="mt-4"
            fullWidth
            onClick={handleVerify}
          >
            Verify
          </Button>

          {verified && (
            <>
              <div className="mb-4">
                <Typography variant="h6" color="blue-gray">
                  New Password
                </Typography>
                <Input
                  size="lg"
                  name="newPassword"
                  value={formData.newPassword}
                  type="password"
                  placeholder="New Password"
                  className="border-t-blue-gray-200 focus-border-t-gray-900"
                  // onChange={(e) => setNewPassword(e.target.value)}
                  onChange={handleInputChange}
                />
              </div>
              <Button type="submit" className="mt-4" fullWidth>
                Register
              </Button>
            </>
          )}
        </form>

        <div className="text-center mt-2">
            <span className="text-gray-700 mt-2 text-sm">
              Have an account ?
              <Link to={"/auth/login"} className="text-blue-500 mx-2">
                login
              </Link>
            </span>
        </div>

        {verified && (
          <p className="text-green-500 mt-2">
            Email and Password verified! You can now set your new password.
          </p>
        )}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        {register && (
          <p className="text-green-500 mt-2">Registered Successfully!</p>
        )}
      </Card>
    </div>
  );
}
