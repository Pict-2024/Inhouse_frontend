import { useState } from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [login, setLogin] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        formData
      );
      console.log(response.data);
      setLogin(true);
    } catch (error) {
      setError("Invalid credentials");
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
          Login
        </Typography>

        <form className="mt-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex justify-between items-center">
            <div>
              <div className="flex justify-between">
                <Typography variant="h6" color="blue-gray">
                  Email
                </Typography>
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

          <Button type="submit" className="mt-4 mb-2" fullWidth>
            Log In
          </Button>

          {error && <p className="error">{error}</p>}
          {login && <p className="success">Login successful!</p>}

          <div className="text-center">
            <span className="text-gray-700 mt-2 text-sm">
              New user ?
              <Link to={"/auth/register"} className="text-blue-500 mx-2">
                register
              </Link>
            </span>
          </div>
        </form>
      </Card>
    </div>
  );
}
