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

import { addRecordsResearch, uploadRecordsResearch } from "./API_Routes";

export default function Research() {
  const { currentUser } = useSelector((state) => state.user);
  const [isFinancialSupport, setIsFinancialSupport] = useState(false);
  const [isAchievement, setIsAchievement] = useState("No");
  const [uploadedFilePaths, setUploadedFilePaths] = useState({});

  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1999 },
    (_, index) => currentYear - index
  );

  const [formData, setFormData] = useState({
    T_ID: null,
    Name: currentUser?.Name,
    Username: currentUser?.Username,
    Department: "",
    Title_of_Research_Article: "",
    Type_Research_Review: "",
    Level_International_National_State_University: "",
    Indexed_SCI_Scopus_Web_of_Science_UGC_Others: "",
    Date: null,
    Author: "",
    Affiliation_at_the_Time_of_Publication: "",
    Role_First_Author_Second_Author_Third_Author: "",
    Publisher: "",
    Co_Authors: "",
    Journal_Name: "",
    ISSN: "",
    Volume: "",
    Page_Numbers: "",
    Issue: "",
    Year: "",
    DOI: "",
    Financial_support_from_institute_in_INR: "",
    Upload_Evidence: null,
    Link_To_Paper: "",
    Upload_Paper: null,
    Achievements_if_any: "",
    Upload_DOA: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "file" ? (files && files.length > 0 ? files[0] : null) : value,
    });
  };

  const handleFileUpload = async (files) => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("username", currentUser?.Username);
      queryParams.append("role", currentUser?.Role);
      queryParams.append("tableName", "research_publication");
      // queryParams.append("columnNames", "Upload_Evidence,Upload_Paper,Upload_DOA");

      let formDataForUpload = new FormData();
      const columnNames = [];
      // Append files under the 'files' field name as expected by the server
      if (formData.Upload_Evidence) {
        formDataForUpload.append("files", formData.Upload_Evidence);
        columnNames.push("Upload_Evidence");
      }
      if (formData.Upload_Paper) {
        formDataForUpload.append("files", formData.Upload_Paper);
        columnNames.push("Upload_Paper");
      }
      if (formData.Upload_DOA) {
        formDataForUpload.append("files", formData.Upload_DOA);
        columnNames.push("Upload_DOA");
      }

      // Append column names to the query parameters
      queryParams.append("columnNames", columnNames.join(","));
      console.log('query: ', queryParams);
      const url = `${uploadRecordsResearch}?${queryParams.toString()}`;
      console.log("formdata", formDataForUpload)
      const response = await axios.post(url, formDataForUpload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response?.data?.uploadResults);
      return response?.data?.uploadResults;
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error as needed
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



  //Add Records
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (formData.Upload_Paper === null) {
      // Display an error toast
      toast.error("Select file for upload", {
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
    // Check if evidence upload is required
    if (isFinancialSupport && formData.Upload_Evidence === null) {
      alert("Upload Evidence document");
      return;
    }
    if (isAchievement === "Yes" && formData.Upload_DOA === null) {
      alert("Upload Achievement document");
      return;
    }

    try {

      // Collect all files that need to be uploaded
      const filesToUpload = [];
      if (isFinancialSupport && formData.Upload_Evidence) {
        filesToUpload.push(formData.Upload_Evidence);
      }
      if (isAchievement === "Yes" && formData.Upload_DOA) {
        filesToUpload.push(formData.Upload_DOA);
      }
      if (formData.Upload_Paper) {
        filesToUpload.push(formData.Upload_Paper);
      }

      // If file upload is successful, continue with the form submission
      const uploadResults = await handleFileUpload(filesToUpload);

      // Store the paths of uploaded files in the uploadedFilePaths object
      const updatedUploadedFilePaths = { ...uploadedFilePaths };
      uploadResults.forEach((result) => {
        updatedUploadedFilePaths[result.columnName] = result.filePath;
      });
      setUploadedFilePaths(updatedUploadedFilePaths);

      // Merge uploaded file paths with existing formData
      const formDataWithFilePath = {
        ...formData,
        ...updatedUploadedFilePaths,
      };


      console.log("Final data:", formDataWithFilePath);

      // Send a POST request to the addRecordsBook API endpoint
      await axios.post(addRecordsResearch, formDataWithFilePath);

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
      navigate("/t/data");
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
        className="border border-gray-300 w-85 mx-auto p-2 my-2 rounded-md overflow-x-hidden"
      >
        <Typography
          variant="h4"
          color="blue-gray"
          className="mx-auto underline underline-offset-2"
        >
          Research Publication
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Select
                name="Department"
                size="lg"
                label="Department"
                value={formData.Department}
                onChange={(value) =>
                  handleChange({
                    target: { name: "Department", value },
                  })
                }
              // onChange={handleOnChange}
              >
                <Option value="CS">CS</Option>
                <Option value="IT">IT</Option>
                <Option value="EnTC">EnTC</Option>
                <Option value="FE">FE</Option>
              </Select>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Title of Research Article
              </Typography>
              <Input
                size="lg"
                label="Title of Research Article"
                type="text"
                name="Title_of_Research_Article"
                value={formData.Title_of_Research_Article}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Type
              </Typography>
              <Input
                size="lg"
                label="Type (Research/Review)"
                type="text"
                name="Type_Research_Review"
                value={formData.Type_Research_Review}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Level
              </Typography>
              <Select
                size="lg"
                label="Level"
                name="Level_International_National_State_University"
                value={formData.Level_International_National_State_University}
                onChange={(value) =>
                  handleChange({
                    target: {
                      name: "Level_International_National_State_University",
                      value,
                    },
                  })
                }
              >
                <Option value="International">International</Option>
                <Option value="National">National</Option>
                <Option value="State University">State University</Option>
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
                name="Indexed_SCI_Scopus_Web_of_Science_UGC_Others"
                value={formData.indexed}
                onChange={(value) =>
                  handleChange({
                    target: {
                      name: "Indexed_SCI_Scopus_Web_of_Science_UGC_Others",
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
                name="Date"
                value={formData.Date}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Author
              </Typography>
              <Input
                size="lg"
                label="Author"
                type="text"
                name="Author"
                value={formData.Author}
                onChange={handleChange}
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
                name="Affiliation_at_the_Time_of_Publication"
                value={formData.Affiliation_at_the_Time_of_Publication}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Role
              </Typography>
              <Select
                size="lg"
                label="Select Role"
                color="light-gray"
                name="Role_First_Author_Second_Author_Third_Author"
                value={formData.Role_First_Author_Second_Author_Third_Author}
                onChange={(value) =>
                  handleChange({
                    target: {
                      name: "Role_First_Author_Second_Author_Third_Author",
                      value,
                    },
                  })
                }
              >
                <Option value="First Author">First Author</Option>
                <Option value="Second Author">Second Author</Option>
                <Option value="Third Author">Third Author</Option>
                <Option value="Fourth Author">Fourth Author</Option>
                <Option value="Fifth Author">Fifth Author</Option>
                <Option value="Sixth Author">Sixth Author</Option>
              </Select>
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
                type="text"
                name="Publisher"
                value={formData.Publisher}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Co-Author(s)
              </Typography>
              <Input
                size="lg"
                label="Co-Author"
                type="text"
                name="Co_Authors"
                value={formData.Co_Authors}
                onChange={handleChange}
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
                type="text"
                name="Journal_Name"
                value={formData.Journal_Name}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                ISSN
              </Typography>
              <Input
                size="lg"
                label="ISSN"
                type="text"
                name="ISSN"
                value={formData.ISSN}
                onChange={handleChange}
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
                type="number"
                name="Volume"
                value={formData.Volume}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Page Numbers
              </Typography>
              <Input
                size="lg"
                label="Page Numbers"
                type="text"
                name="Page_Numbers"
                value={formData.Page_Numbers}
                onChange={handleChange}
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
                type="number"
                name="Issue"
                value={formData.Issue}
                onChange={handleChange}
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
                name="Year"
                value={formData.Year}
                // onChange={handleChange}
                onChange={(value) =>
                  handleChange({ target: { name: "Year", value } })
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

          <div className="mb-4 flex flex-wrap -mx-4 ">
            <div className="w-full">
              <div className="px-4 mb-4 flex gap-40 ">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Financial support from institute in INR
                </Typography>
                <div className="flex gap-3 ">
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
              <div className="flex justify-between">
                <div className="w-full md:w-1/2 px-4 mb-4">
                  <Input
                    size="lg"
                    label="Amount in INR"
                    name="Financial_support_from_institute_in_INR"
                    type="number"
                    value={formData.Financial_support_from_institute_in_INR}
                    onChange={handleChange}
                    disabled={!isFinancialSupport}
                  />
                </div>
                <div className="w-full md:w-1/2 px-4 mb-4 flex gap-4">
                  <Input
                    size="lg"
                    label="Evidence Document"
                    name="Upload_Evidence"
                    type="file"
                    onChange={handleChange}
                    disabled={!isFinancialSupport}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full  px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                DOI
              </Typography>
              <Input
                size="lg"
                label="DOI"
                type="text"
                name="DOI"
                value={formData.DOI}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Link to article / paper / abstract of the article
              </Typography>
              <Input
                size="lg"
                label="Link to article / paper / abstract of the article"

                name="Link_To_Paper"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4 ">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload the Paper (Pdf Only)
              </Typography>
              <Input
                size="lg"
                type="file"
                label="Upload the Paper"
                className="border-t-blue-gray-200 focus:border-t-gray-900"
                name="Upload_Paper"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Any Achievements
              </Typography>
              <Select
                size="lg"
                label="Achievements if any"
                className="border-t-blue-gray-200 focus:border-t-gray-900"
                name="Achievements_if_any"
                value={isAchievement}
                onChange={(value) => setIsAchievement(value)}
              >
                <Option value="Yes">Yes</Option>
                <Option value="No">No</Option>
              </Select>
            </div>
            {isAchievement === "Yes" && (
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Upload Document of Achievement (Pdf Only)
                </Typography>
                <Input
                  size="lg"
                  type="file"
                  label=" Upload Document of Achievement"
                  className="border-t-blue-gray-200 focus:border-t-gray-900"
                  name="Upload_DOA"
                  onChange={handleChange}
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
