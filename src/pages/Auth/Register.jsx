import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerAPI, verifyAPI } from "./AuthApis";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    gmail: "",
    password: "",
    newPassword: "",
    pro_email: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [register, setRegister] = useState(false);
  const [role, setRole] = useState(null);

  const handleVerify = async () => {
    try {
      const response = await axios.post(verifyAPI, {
        gmail: formData.gmail,
        password: formData.password,
      });

      if (response.data.success === true) {
        setRole(response.data.role);
        console.log("Role = ", role);
        setVerified(true);
        toast.success("Verification Successful", {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setError(null);
      } else {
        // setError("Invalid Credentials");
        toast.error("Invalid Credentials", {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      console.log(response.data);
    } catch (error) {
      // setError("Invalid Credentials");
      toast.error("Invalid Credentials", {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
      if (!formData.gmail && !formData.password) {
        toast.warning("Please enter your email and password", {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      else if (!formData.gmail) {
        toast.warning("Please enter your email", {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      } else if (!formData.password) {
        toast.warning("Please enter your password", {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      // Check if the user is already registered and verified
      if (verified) {
        // Proceed with registration
        const registerResponse = await axios.post(registerAPI, {
          name: formData.name,
          pro_email: formData.pro_email,
          password: formData.newPassword,
          gmail: formData.gmail,
        });
        console.log(registerResponse?.data);

        setError(null);
        setRegister(true);
        toast.success("Registration Successful", {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/auth/login");
      } else {
        // setError("Please verify your email and password first.");
        toast.warning("Please verify your email and password first.", {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      // setError("Registration failed");
      toast.error("Registration failed", {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error(error.response.data);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-[100vh]"
      style={{
        backgroundImage: `url('../../src/assets/loginbg.jpg')`,
        backgroundSize: "cover",
        opacity: "0.9",
      }}
    >
      <Card
        color="transparent"
        shadow={true}
        className="border bg-white border-gray-300 w-5/6 sm:w-1/2 md:w-1/2 lg:w-1/4 mb-20 h-150 p-6 rounded-md"
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
            <Input
              size="lg"
              name="name"
              value={formData.name}
              label="Full Name"
              className="border-t-blue-gray-200 focus-border-t-gray-900"
              // onChange={(e) => setName(e.target.value)}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <Input
              size="lg"
              name="gmail"
              value={formData.gmail}
              label="College Email"
              className="border-t-blue-gray-200 focus-border-t-gray-900"
              // onChange={(e) => setGmail(e.target.value)}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4 relative">
            <Input
              size="lg"
              name="password"
              value={formData.password}
              type={showPassword ? "text" : "password"}
              label="Password"
              className="border-t-blue-gray-200 focus-border-t-gray-900"
              // onChange={(e) => setPassword(e.target.value)}
              onChange={handleInputChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {showPassword ? (
                <FaEye className="text-gray-400 cursor-pointer" onClick={togglePasswordVisibility} />
              ) : (
                <FaEyeSlash className="text-gray-400 cursor-pointer" onClick={togglePasswordVisibility} />
              )}
            </div>
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
              {role === 2 && (
                <div className="mb-4 mt-4">
                  <Input
                    size="lg"
                    name="pro_email"
                    value={formData.pro_email}
                    label="Personal Email"
                    className="border-t-blue-gray-200 focus-border-t-gray-900"
                    // onChange={(e) => setGmail(e.target.value)}
                    onChange={handleInputChange}
                  />
                </div>
              )}

              <div className="mb-4 mt-4 relative">
                {/* <Typography variant="h6" color="blue-gray">
                  New Password
                </Typography> */}
                <Input
                  size="lg"
                  name="newPassword"
                  value={formData.newPassword}
                  type={showPassword ? "text" : "password"}
                  label="New Password"
                  className="border-t-blue-gray-200 focus-border-t-gray-900"
                  // onChange={(e) => setNewPassword(e.target.value)}
                  onChange={handleInputChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {showPassword ? (
                    <FaEye className="text-gray-400 cursor-pointer" onClick={togglePasswordVisibility} />
                  ) : (
                    <FaEyeSlash className="text-gray-400 cursor-pointer" onClick={togglePasswordVisibility} />
                  )}
                </div>
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

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </Card>
    </div>
  );
}
