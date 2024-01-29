import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPass() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gmail: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [resetSuccessful, setResetSuccessful] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const resetResponse = await axios.post(
        "http://localhost:5000/api/v1/auth/reset-password",
        {
          gmail: formData.gmail,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        }
      );

      if (resetResponse.data.success === true) {
        setResetSuccessful(true);
        setError(null);
        toast.success("Password Reset Successful", {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // Redirect to login page after successful password reset
        navigate("/auth/login");
      } else {
        setError("Password Reset failed");
      }
    } catch (error) {
      setError("Password Reset failed");
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
          Reset Password
        </Typography>

        <form className="mt-2" onSubmit={handleResetPassword}>
          <div className="mb-4">
            <Input
              size="lg"
              name="gmail"
              value={formData.gmail}
              label="Gmail"
              className="border-t-blue-gray-200 focus-border-t-gray-900"
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <Input
              size="lg"
              name="newPassword"
              value={formData.newPassword}
              type="password"
              label="New Password"
              className="border-t-blue-gray-200 focus-border-t-gray-900"
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <Input
              size="lg"
              name="confirmPassword"
              value={formData.confirmPassword}
              type="password"
              label="Confirm Password"
              className="border-t-blue-gray-200 focus-border-t-gray-900"
              onChange={handleInputChange}
            />
          </div>

          <Button type="submit" className="mt-4" fullWidth>
            Reset Password
          </Button>
        </form>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        {resetSuccessful && (
          <p className="text-green-500 text-center mt-2">
            Password reset successful!
          </p>
        )}
      </Card>
    </div>
  );
}
