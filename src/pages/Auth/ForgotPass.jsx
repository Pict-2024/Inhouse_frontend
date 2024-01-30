import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forgotPasswordAPI } from "./AuthApis";

export default function ForgotPass() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [error, setError] = useState(null);
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true while making the request

    try {
      const resetResponse = await axios.post(forgotPasswordAPI, {email: formData.email,});

      if (resetResponse.data.success === true) {
        setEmailSent(true);
        setError(null);
        toast.success("Password reset email sent successfully", {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setError("Failed to send password reset email");
      }
    } catch (error) {
      setError("Failed to send password reset email");
      console.error(error.response.data);
    } finally {
      setLoading(false); // Set loading back to false, regardless of success or failure
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
          Forgot Password
        </Typography>

        <form className="mt-2" onSubmit={handleResetPassword}>
          <div className="mb-4">
            <Input
              size="lg"
              name="email"
              value={formData.email}
              label="email"
              className="border-t-blue-gray-200 focus-border-t-gray-900"
              onChange={handleInputChange}
            />
          </div>

          <Button type="submit" className="mt-4" fullWidth>
            {loading ? "Sending..." : "Send Reset Email"}
          </Button>
        </form>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        {emailSent && (
          <p className="text-green-500 text-center mt-2">
            Password reset email sent successfully!
          </p>
        )}
      </Card>
    </div>
  );
}
