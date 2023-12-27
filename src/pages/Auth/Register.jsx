import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";

export default function Register() {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   gmail: "",
  //   password: "",
  //   newPassword: "",
  // });
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);
  const [register, setRegister] = useState(false);

  const handleVerify = async () => {
    try {
      const response = await axios.post("http://localhost:5000/verify", {
        // eslint-disable-next-line no-undef
        gmail,
        password,
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

  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: value,
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if the user is already registered and verified
      if (verified) {
        // Proceed with registration
        const registerResponse = await axios.post(
          "http://localhost:5000/register",
          { name, gmail, password: newPassword }
        );
        console.log(registerResponse.data);
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
    <div className="flex justify-center items-center h-screen">
      <Card
        color="transparent"
        shadow={true}
        className="border border-gray-300 w-100 p-6 rounded-md"
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
              value={name}
              placeholder="Name"
              className="border-t-blue-gray-200 focus-border-t-gray-900"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray">
              Gmail
            </Typography>
            <Input
              size="lg"
              name="gmail"
              value={gmail}
              placeholder="gmail"
              className="border-t-blue-gray-200 focus-border-t-gray-900"
              onChange={(e) => setGmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Typography variant="h6" color="blue-gray">
              Password
            </Typography>
            <Input
              size="lg"
              name="password"
              value={password}
              type="password"
              placeholder="Password"
              className="border-t-blue-gray-200 focus-border-t-gray-900"
              onChange={(e) => setPassword(e.target.value)}
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
                  name="password"
                  value={newPassword}
                  type="password"
                  placeholder="New Password"
                  className="border-t-blue-gray-200 focus-border-t-gray-900"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="mt-4" fullWidth>
                Register
              </Button>
            </>
          )}
        </form>

        {verified && (
          <p className="text-green-500 mt-2">
            Email and Password verified! You can now set your new password.
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
