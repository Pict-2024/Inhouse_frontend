import { useState } from "react";
import EventIcon from "@mui/icons-material/Event";
import DescriptionIcon from "@mui/icons-material/Description";

const CoCurricular = () => {
  const [formData, setFormData] = useState({
    activity: "",
    date: "",
    description: "",
    certificate: null,
  });

  const [certificateName, setCertificateName] = useState("");

  const handleOnChange = (e) => {
    if (e.target.id === "certificate") {
      setCertificateName(e.target.files[0].name);
      setFormData({
        ...formData,
        [e.target.id]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };
  return (
    <div>
      <div className="p-4">
        <div className="w-full md:w-lg bg-white rounded-lg shadow-md p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Co-curricular Activities
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-3 py-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus-border-blue-500"
                  placeholder="Activity"
                  id="activity"
                  value={formData.activity}
                  onChange={handleOnChange}
                />
                <span className="absolute left-3 top-2 text-gray-400">
                  <EventIcon />
                </span>
              </div>
              <div className="relative">
                <input
                  type="date"
                  className="w-full px-3 py-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus-border-blue-500"
                  placeholder="Date"
                  id="date"
                  value={formData.date}
                  onChange={handleOnChange}
                />
                <span className="absolute left-3 top-2 text-gray-400">
                  <EventIcon />
                </span>
              </div>
              <div className="relative">
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus-border-blue-500"
                  placeholder="Description"
                  id="description"
                  value={formData.description}
                  onChange={handleOnChange}
                />
                <span className="absolute left-3 top-2 text-gray-400">
                  <DescriptionIcon />
                </span>
              </div>
              <div className="relative">
                <label className="bg-blue-500 text-white rounded-md p-2 px-4 cursor-pointer hover:bg-blue-600 focus:outline-none">
                  {certificateName ? certificateName : "Upload Certificate"}
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="certificate"
                    onChange={handleOnChange}
                  />
                </label>
              </div>
            </div>
            <div className="mt-6">
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CoCurricular;
