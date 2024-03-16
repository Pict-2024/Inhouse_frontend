import { useState } from "react";
import {
  Card,
  Select,
  Option,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  addRecordsConferenceStud,
  uploadRecordsConferenceStud,
} from "./API_Routes";

export default function Conference() {
  const { currentUser } = useSelector((state) => state.user);

  const [isFinancialSupport, setIsFinancialSupport] = useState(false);
  const [uploadedFilePaths, setUploadedFilePaths] = useState({});

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    S_ID: null,
    Username: currentUser?.Username,
    Academic_Year: "",
    Student_Name: currentUser?.Name,
    Department: "",
    Class: "",
    Title_of_Paper: "",
    Title_of_proceedings_of_conference: "",
    Conference_Name: "",
    Level: "",
    Date_of_Conference: "",
    Conference_Venue_and_Organizer: "",
    Publication_Year: "",
    ISSN: "",
    Affiliating_Institute: "",
    Paper_Link: "",
    Upload_Paper: null,
    Financial_support_given_by_institute_in_INR: "",
    Upload_Evidence: null,
    DOI: "",
    Presented: "",
    Achievements: "",
    Upload_Achievement_Document: null,
  });

  const currentYear = new Date().getFullYear();
  const [isAchievements, setIsAchievements] = useState("No");

  const years = Array.from(
    { length: currentYear - 1999 },
    (_, index) => currentYear - index
  );

  const generateAcademicYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const Options = [];

    for (let year = 2023; year <= currentYear; year++) {
      const academicYearStart = `${year}-${year + 1}`;
      Options.push(
        <Option key={academicYearStart} value={academicYearStart}>
          {academicYearStart}
        </Option>
      );
    }

    return Options;
  };

  const handleOnChange = (e) => {
    const { id, value, type, files } = e.target;

    setFormData({
      ...formData,
      [id]:
        type === "file" ? (files && files.length > 0 ? files[0] : null) : value,
    });
  };

  const handleFileUpload = async (files) => {
    try {
      console.log("file as:", files);

      const queryParams = new URLSearchParams();
      queryParams.append("username", currentUser?.Username);
      queryParams.append("role", currentUser?.Role);
      queryParams.append("tableName", "student_conference_publication");

      let formDataForUpload = new FormData();
      const columnNames = [];

      if (formData.Upload_Paper) {
        formDataForUpload.append("files", formData.Upload_Paper);
        columnNames.push("Upload_Paper")
      }
      if (formData.Upload_Evidence) {
        formDataForUpload.append("files", formData.Upload_Evidence);
        columnNames.push("Upload_Evidence");
      }

      if (formData.Upload_Achievement_Document) {
        formDataForUpload.append("files", formData.Upload_Achievement_Document);
        columnNames.push("Upload_Achievement_Document");
      }

      queryParams.append("columnNames", columnNames.join(","));
      console.log("query = ", queryParams);
      const url = `${uploadRecordsConferenceStud}?${queryParams.toString()}`;
      console.log("formdata", formDataForUpload);

      const response = await axios.post(url, formDataForUpload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      console.log(response?.data?.uploadResults);
      return response?.data?.uploadResults;

    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error as needed
      toast.error(error?.response?.data?.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  //Add records
  const handleSubmit = async (e) => {

    e.preventDefault();

    const requiredFields = ["Academic_Year", "Department", "Class", "Title_of_Paper", "Title_of_proceedings_of_conference", "Conference_Name", "Level", "Date_of_Conference", "Conference_Venue_and_Organizer", "Publication_Year", "ISSN", "Affiliating_Institute", "Paper_Link", "DOI"];

    const emptyFields = requiredFields.filter(field => !formData[field]);

    if (emptyFields.length > 0) {
      const emptyFieldNames = emptyFields.join(", ");
      alert(`Please fill in all required fields: ${emptyFieldNames}`);
      return;
    }

    // Check if evidence upload is required
    if (isFinancialSupport && formData.Upload_Evidence === null) {
      alert("Upload Evidence document");
      return;
    }
    if (isAchievements === "Yes" && formData.Upload_Achievement_Document === null) {
      alert("Upload Achievement document");
      return;
    }

    try {

      if (formData.Upload_Paper === null) {
        toast.error("Please select a file for upload", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      const filesToUpload = [];

      if (formData.Upload_Paper) {
        filesToUpload.push(formData.Upload_Paper);
      }
      if (formData.Upload_Evidence) {
        filesToUpload.push(formData.Upload_Evidence);
      }
      if (formData.Upload_Achievement_Document) {
        filesToUpload.push(formData.Upload_Achievement_Document);
      }

      const uploadResults = await handleFileUpload(filesToUpload);

      // Store the paths of uploaded files in the uploadedFilePaths object
      const updatedUploadedFilePaths = { ...uploadedFilePaths };
      uploadResults.forEach((result) => {
        updatedUploadedFilePaths[result.columnName] = result.filePath;
      });
      setUploadedFilePaths(updatedUploadedFilePaths);

      // console.log("Upload_Evidence path:",pathUpload_Evidence);
      const formDataWithFilePath = {
        ...formData,
        ...updatedUploadedFilePaths,
      };

      console.log("Final data:", formDataWithFilePath);

      // Send a POST request to the addRecordsBook API endpoint
      await axios.post(addRecordsConferenceStud, formDataWithFilePath);

      // Display a success toast
      toast.success("Record Added Successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Navigate to "/t/data" after successful submission
      navigate("/s/data");
    } catch (error) {
      // Handle file upload error
      console.error("File upload error:", error);

      // Display an error toast
      toast.error(error?.response?.data?.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <Card
        color="transparent"
        shadow={false}
        className="border border-gray-300 w-85 mx-auto p-2 my-2 rounded-md"
      >
        <Typography
          variant="h4"
          color="blue-gray"
          className="mx-auto underline underline-offset-2"
        >
          Student Conference Publication
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Select
                id="Department"
                size="lg"
                label="Department"
                value={formData.Department}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Department", value },
                  })
                }
              >
                <Option value="CS">CS</Option>
                <Option value="IT">IT</Option>
                <Option value="EnTC">EnTC</Option>
                <Option value="FE">FE</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Academic Year
              </Typography>
              <Select
                size="lg"
                id="Academic_Year"
                value={formData.Academic_Year}
                label="Academic Year"
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Academic_Year", value },
                  })
                }
              >
                {generateAcademicYearOptions()}
              </Select>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Year of Study
              </Typography>
              <Select
                id="Year"
                size="lg"
                label="Class"
                value={formData.Class}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Class", value },
                  })
                }
              >
                <Option value="FE">FE</Option>
                <Option value="SE">SE</Option>
                <Option value="TE">TE</Option>
                <Option value="BE">BE</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                DOI
              </Typography>
              <Input
                id="DOI"
                size="lg"
                type="date"
                value={formData.DOI}
                label="DOI"
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Title of Paper
              </Typography>
              <Input
                id="Title_of_Paper"
                size="lg"
                label="Title of Paper"
                value={formData.Title_of_Paper}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Title of proceedings of conference
              </Typography>
              <Input
                id="Title_of_proceedings_of_conference"
                size="lg"
                label="Title of proceedings of conference"
                value={formData.Title_of_proceedings_of_conference}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Level
              </Typography>
              <Select
                id="Level"
                size="lg"
                label="Select"
                value={formData.Level}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Level", value },
                  })
                }
              // onChange={handleOnChange}
              >
                <Option value="International">International</Option>
                <Option value="National">National</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Conference Name
              </Typography>
              <Input
                id="Conference_Name"
                size="lg"
                label="Conference Name"
                value={formData.Conference_Name}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                ISSN
              </Typography>
              <Input
                id="ISSN"
                size="lg"
                label="ISSN"
                value={formData.ISSN}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Affiliating Institute
              </Typography>
              <Input
                id="Affiliating_Institute"
                size="lg"
                label="Affiliating Institute"
                value={formData.Affiliating_Institute}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Year_of_Publication
              </Typography>
              <Select
                id="Publication_Year"
                size="lg"
                label="Select Year_of_Publication"
                color="light-gray"
                value={formData.Publication_Year}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Publication_Year", value },
                  })
                }
              // onChange={handleOnChange}
              >
                {years.map((year) => (
                  <Option key={year} value={year}>
                    {year}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Conference Venue and Organizer
              </Typography>
              <Input
                id="Conference_Venue_and_Organizer"
                size="lg"
                label="Conference Venue and Organizer"
                value={formData.Conference_Venue_and_Organizer}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Paper Link
              </Typography>
              <Input
                id="Paper_Link"
                size="lg"
                label="Paper Link"
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload_Paper (Pdf Only)
              </Typography>
              <Input
                id="Upload_Paper"
                size="lg"
                type="file"
                label=""
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full">
              <div className="px-4 mb-4 flex justify-start items-center gap-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Financial support from institute in INR
                </Typography>
                <div className="flex gap-3">
                  <label className="mx-2">
                    <input
                      type="radio"
                      name="financialSupport"
                      value="yes"
                      checked={isFinancialSupport}
                      onChange={() => setIsFinancialSupport(true)}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="financialSupport"
                      value="no"
                      checked={!isFinancialSupport}
                      onChange={() => setIsFinancialSupport(false)}
                    />
                    No
                  </label>
                </div>
              </div>
              <div className="flex justify-between  flex-col md:flex-row">
                <div className="w-full md:w-1/2 px-4 mb-4">
                  <Input
                    size="lg"
                    label="Amount in INR"
                    id="Financial_support_given_by_institute_in_INR"
                    type="number"
                    value={formData.Financial_support_given_by_institute_in_INR}
                    onChange={handleOnChange}
                    disabled={!isFinancialSupport}
                  />
                </div>
                <div className="w-full md:w-1/2 px-4 mb-4">
                  <Input
                    size="lg"
                    label="Evidence Document"
                    id="Upload_Evidence"
                    type="file"
                    onChange={handleOnChange}
                    disabled={!isFinancialSupport}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Date_of_Conference
              </Typography>
              <Input
                id="Date_of_Conference"
                size="lg"
                type="date"
                value={formData.Date_of_Conference}
                label="Date_of_Conference"
                onChange={handleOnChange}
              />
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Presented
              </Typography>
              <Input
                id="Presented"
                size="lg"
                value={formData.Presented}
                label="Presented"
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Achievements
              </Typography>
              <Select
                id="Achievements"
                size="lg"
                value={isAchievements}
                label="Achievements"
                onChange={(value) => setIsAchievements(value)}
              >
                <Option value="Yes">Yes</Option>
                <Option value="No">No</Option>
              </Select>
            </div>
            {isAchievements === "Yes" && (
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Upload Achievement Document (Pdf Only)
                </Typography>
                <Input
                  id="Upload_Achievement_Document"
                  size="lg"
                  type="file"
                  label=""
                  onChange={handleOnChange}
                />
              </div>
            )}
          </div>

          <Button type="submit" className="mt-4" fullWidth>
            Submit
          </Button>
        </form>
      </Card>
    </>
  );
}
