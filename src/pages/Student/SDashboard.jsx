import { useState, useEffect } from "react";
import { Badge, Button } from "@material-tailwind/react";

export const SDashboard = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    mobileNumber: "",
    email: "",
    city: "",
    address: "",
  });

  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
  };

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const initializeFormData = () => {
    setFormData({
      ...formData,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  };

  useEffect(() => {
    initializeFormData();
  }, []);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <>
      {/* <div className="profile-container">
        <div className="profile-form">
          <h2 className="profile-title">Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="First Name"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleOnChange}
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Last Name"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleOnChange}
                />

              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Username"
                  id="username"
                  value={formData.username}
                  onChange={handleOnChange}
                />
           
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={formData.password}
                  onChange={handleOnChange}
                />

              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  id="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleOnChange}
                />

              </div>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  value={formData.email}
                  onChange={handleOnChange}
                />

              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="City"
                  id="city"
                  value={formData.city}
                  onChange={handleOnChange}
                />
 
              </div>
              <div className="input-group">
                <textarea
                  rows={4}
                  placeholder="Address"
                  id="address"
                  value={formData.address}
                  onChange={handleOnChange}
                />
    
              </div>
            </div>
            <div className="form-group">
              <button className="save-button">Save Changes</button>
            </div>
          </form>
        </div>
      </div> */}

    </>
  );
};
