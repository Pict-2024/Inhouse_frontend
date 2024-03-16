import { useState } from "react";
import {
  Card,
  Select,
  Option,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  addRecordsResearchStud,
  uploadRecordsResearchStud,
} from "./API_Routes";

export default function Research() {
  const navigate = useNavigate();

  const [isFinancialSupport, setIsFinancialSupport] = useState(false);
  const [isAchievements, setIsAchievements] = useState("No");
  const [errors, setErrors] = useState({});

  //  TODO : extra useState added for use
  const [uploadedFilePaths, setUploadedFilePaths] = useState({});

  const { currentUser } = useSelector((state) => state.user);
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1999 },
    (_, index) => currentYear - index
  );
  const [formData, setFormData] = useState({
    S_ID: null,
    Username: currentUser?.Username,
    Academic_Year: "",
    Student_Name: currentUser?.Name,
    Roll_No: null,
    Department: "",
    Class: "",
    Research_Article_Title: "",
    Research_Type: "",
    Level: "",
    Indexed: "",
    Date: "",
    Author: "",
    Affiliation: "",
    Role_of_Authors: "",
    Publisher: "",
    Co_Author: "",
    Journal_Name: "",
    ISSN: "",
    Volume: "",
    Page_Numbers: "",
    Issue: "",
    Year: "",
    DOI: "",
    Financial_support_from_institute_in_INR: "",
    Article_Link: "",
    Upload_Paper: null,
    Achievements: "",
    Upload_Document_of_Achievement: null,
    Upload_Evidence: null,
  });

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

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: ""
    }));

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

      // formDataForFile.append("file", files);
      queryParams.append("username", currentUser?.Username);
      queryParams.append("role", currentUser?.Role);
      queryParams.append("tableName", "student_research_publication");

      // formDataForFile.append("columnName", [
      //   "Upload_Paper",
      //   "Upload_Document_of_Achievement",
      //   "Upload_Evidence",
      // ]);
      
      let formDataForUpload = new FormData();

      const columnNames = [];

      if(formData.Upload_Evidence)
      {
        formDataForUpload.append("files", formData.Upload_Evidence);
        columnNames.push("Upload_Evidence")
      }

      if(formData.Upload_Document_of_Achievement)
      {
        formDataForUpload.append("files", formData.Upload_Document_of_Achievement);
        columnNames.push("Upload_Document_of_Achievement");
      }

      if(formData.Upload_Paper)
      {
        formDataForUpload.append("files", formData.Upload_Paper);
        columnNames.push("Upload_Paper");
      }

      queryParams.append("columnNames", columnNames.join(","));
      console.log("query = ", queryParams);

      const url = `${uploadRecordsResearchStud}?${queryParams.toString()}`;
      console.log("Formdata = ", formDataForUpload);

      const response = await axios.post( url, formDataForUpload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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

  //add new record
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty required fields
    const requiredFields = ["Academic_Year", "Department", "Class", "Research_Article_Title", "Research_Type", "Level", "Indexed", "Date", "Author", "Affiliation", "Role_of_Authors", "Publisher", "Co_Author", "Journal_Name", "ISSN", "DOI","Article_Link"];

    const emptyFields = requiredFields.filter(field => !formData[field]);

    if (emptyFields.length > 0) {
      const emptyFieldNames = emptyFields.join(", ");
      alert(`Please fill in all required fields: ${emptyFieldNames}`);
      return;
    }

    // Validate Roll No
    if (!(/^\d{5}$/.test(formData.Roll_No))) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        Roll_No: "Roll No must be a 5-digit number."
      }));
      return;
    }



    console.log(formData);

    // Check if evidence upload is required
    if (isFinancialSupport && formData.Upload_Evidence === null) {
      alert("Upload Evidence document");
      return;
    }
    if (isAchievements === "Yes" && formData.Upload_Document_of_Achievement === null) {
      alert("Upload Achievement document");
      return;
    }

    try {

      const filesToUpload = [];

      if (isFinancialSupport && formData.Upload_Evidence) {

        filesToUpload.push(formData.Upload_Evidence);
        // pathEvidence = await handleFileUpload(formData.Upload_Evidence);
      }
      if (isAchievements === "Yes") {

        filesToUpload.push(formData.Upload_Document_of_Achievement);
        // pathStudent = await handleFileUpload(
        //   formData.Upload_Document_of_Achievement
        // );
      }
      if (formData.Upload_Paper !== null) {

        filesToUpload.push(formData.Upload_Paper);
        // pathReport = await handleFileUpload(formData.Upload_Paper);
      }

      const uploadedResults = await handleFileUpload(filesToUpload);

      const updatedUploadedFilePaths = { ...uploadedFilePaths };
      uploadedResults.forEach((result) => {
        updatedUploadedFilePaths[result.columnName] = result.filePath;
      });
      setUploadedFilePaths(setUploadedFilePaths);

      const formDataWithFilePath = {
        ...formData,
        ...updatedUploadedFilePaths,
      };

      console.log("Final data = ", formDataWithFilePath);

      // Send a POST request to the addRecordsBook API endpoint
      await axios.post(addRecordsResearchStud, formDataWithFilePath);

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
          Student Research Publication
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
                Student Name
              </Typography>
              <Input
                id="Student_Name"
                size="lg"
                label="Student Name"
                value={formData.Student_Name}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Roll No
              </Typography>
              <Input
                id="Roll_No"
                size="lg"
                type="number"
                label="Roll No"
                value={formData.Roll_No}
                onChange={handleOnChange}
              />
              {errors.Roll_No && <p className="text-red-500 text-sm">{errors.Roll_No}</p>}
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Year of Study
              </Typography>
              <Select
                id="Class"
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
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Research Article Title
              </Typography>
              <Input
                id="Research_Article_Title"
                size="lg"
                label="Research Article Title"
                value={formData.Research_Article_Title}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Research Type
              </Typography>
              <Input
                id="Research_Type"
                size="lg"
                label="Research Type"
                value={formData.Research_Type}
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
                label="Level"
                value={formData.Level}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Level", value },
                  })
                }
              >
                <Option value="National">National</Option>
                <Option value="International">International</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Indexed
              </Typography>
              <Select
                size="lg"
                label="Select Selection"
                color="light-gray"
                id="Indexed"
                value={formData.indexed}
                onChange={(value) =>
                  handleOnChange({
                    target: {
                      id: "Indexed",
                      value,
                    },
                  })
                }
              >
                <Option value="SCI">SCI</Option>
                <Option value="Scopus">Scopus</Option>
                <Option value="Web of Science">Web of Science</Option>
                <Option value="UGC">UGC</Option>
                <Option value="Others">Others</Option>
              </Select>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Date
              </Typography>
              <Input
                size="lg"
                label="Date"
                type="date"
                id="Date"
                value={formData.Date}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Author
              </Typography>
              <Input
                size="lg"
                label="Author"
                id="Author"
                value={formData.Author}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Affiliation at the Time of Publication
              </Typography>
              <Input
                size="lg"
                label="Affiliation at the Time of Publication"
                id="Affiliation"
                value={formData.Affiliation}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Role of Authors
              </Typography>
              <Input
                size="lg"
                label="Select Role"
                id="Role_of_Authors"
                value={formData.Role_of_Authors}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Publisher
              </Typography>
              <Input
                size="lg"
                label="Publisher"
                id="Publisher"
                value={formData.Publisher}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Co-Authors
              </Typography>
              <Input
                size="lg"
                label="Co-Authors"
                id="Co_Author"
                value={formData.Co_Author}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Journal Name
              </Typography>
              <Input
                size="lg"
                label="Journal Name"
                id="Journal_Name"
                value={formData.Journal_Name}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                ISSN
              </Typography>
              <Input
                size="lg"
                label="ISSN"
                id="ISSN"
                value={formData.ISSN}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Volume
              </Typography>
              <Input
                size="lg"
                label="Volume"
                id="Volume"
                value={formData.Volume}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Page Numbers
              </Typography>
              <Input
                size="lg"
                label="Page Numbers"
                id="Page_Numbers"
                value={formData.Page_Numbers}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Issue
              </Typography>
              <Input
                size="lg"
                label="Issue"
                id="Issue"
                value={formData.Issue}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Year
              </Typography>
              <Select
                size="lg"
                label="Select Year"
                color="light-gray"
                id="Year"
                value={formData.Year}
                // onChange={handleOnChange}
                onChange={(value) =>
                  handleOnChange({ target: { id: "Year", value } })
                }
              >
                {years.map((year) => (
                  <Option key={year} value={year}>
                    {year}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="w-full  mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              DOI
            </Typography>
            <Input
              size="lg"
              label="DOI"
              id="DOI"
              value={formData.DOI}
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full">
              <div className="px-4 mb-4 flex justify-start items-center gap-4">
                <Typography variant="h6" color="blue-gray" className="">
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
                    id="Financial_support_from_institute_in_INR"
                    type="number"
                    value={formData.Financial_support_from_institute_in_INR}
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
                Link to article / paper / abstract of the article
              </Typography>
              <Input
                size="lg"
                label="Article Link"
                id="Article_Link"
                value={formData.Article_Link}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload the Paper (Pdf Only)
              </Typography>
              <Input
                size="lg"
                type="file"
                label=""

                id="Upload_Paper"
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
                size="lg"
                label="Achievements"

                id="Achievements"
                value={isAchievements}
                onChange={(value) => setIsAchievements(value)}
              >
                <Option value="Yes">Yes</Option>
                <Option value="No">No</Option>
              </Select>
            </div>
            {isAchievements === "Yes" && (
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Upload Document of Achievement (Pdf Only)
                </Typography>
                <Input
                  size="lg"
                  type="file"
                  label=""

                  id="Upload_Document_of_Achievement"
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
