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

import { addRecordsHigherEdu, uploadRecordsHigherEdu } from "./API_Routes";

export default function HigherEdu() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [errors, setErrors] = useState({});

  const [uploadedFilePaths, setUploadedFilePaths] = useState({});

  const options = Array.from({ length: 11 }, (_, index) => index + 1);
  const [formData, setFormData] = useState({
    S_ID: null,
    Username: currentUser?.Username,
    Academic_Year: "",
    Student_Name: currentUser?.Name,
    Roll_No: null,
    Division: null,
    Department: "",
    Mobile_No: null,
    Email_ID: currentUser?.Username,
    Parent_Mobile_No: "",
    Passing_Year: "",
    Qualifying_Exam_Attempted: "",
    Upload_Proof_of_Qualifying_Exam: null,
    Upload_Score_Card_as_Evidence: null,
    Name_of_university_admitted_for_higher_studies: "",
    Name_of_enrolled_Branch_Specialization: "",
    Upload_ID_card_or_Proof_of_Admission: null,
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

    setFormData({
      ...formData,
      [id]:
        type === "file" ? (files && files.length > 0 ? files[0] : null) : value,
    });
  };

  const handleFileUpload = async (files) => {

    console.log("file as:", files);
    try {

      const queryParams = new URLSearchParams();
      // formDataForFile.append("file", file);
      queryParams.append("username", currentUser?.Username);
      queryParams.append("role", currentUser?.Role);
      queryParams.append("tableName", "student_higher_education");

      const formDataForFile = new FormData();

      const columnNames = [];
      if (formData.Upload_Proof_of_Qualifying_Exam) {
        formDataForFile.append("files", formData.Upload_Proof_of_Qualifying_Exam);
        columnNames.push("Upload_Proof_of_Qualifying_Exam");
      }
      if (formData.Upload_Score_Card_as_Evidence) {
        formDataForFile.append("files", formData.Upload_Score_Card_as_Evidence);
        columnNames.push("Upload_Score_Card_as_Evidence");
      }
      if (formData.Upload_ID_card_or_Proof_of_Admission) {
        formDataForFile.append("files", formData.Upload_ID_card_or_Proof_of_Admission);
        columnNames.push("Upload_ID_card_or_Proof_of_Admission");
      }

      queryParams.append("columnNames", columnNames.join(","));
      console.log("query = ", queryParams);

      const url = `${uploadRecordsHigherEdu}?${queryParams.toString()}`;

      const response = await axios.post(url, formDataForFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response?.data);
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

    console.log("Form data is : ", formData);
    e.preventDefault();

    const requiredFields = ["Academic_Year", "Department", "Student_Name", "Roll_No"];

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

    try {
      const filesToUpload = [];
      if (
        formData.Upload_Proof_of_Qualifying_Exam !== null &&
        formData.Upload_Score_Card_as_Evidence !== null &&
        formData.Upload_ID_card_or_Proof_of_Admission !== null
      ) {
        filesToUpload.push(formData.Upload_Proof_of_Qualifying_Exam);
        filesToUpload.push(formData.Upload_Score_Card_as_Evidence);
        filesToUpload.push(formData.Upload_ID_card_or_Proof_of_Admission);
      } else {
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

      const uploadResults = await handleFileUpload(filesToUpload);

      const updatedUploadedFilePaths = { ...uploadedFilePaths };

      uploadResults.forEach((result) => {
        updatedUploadedFilePaths[result.columnName] = result.filePath;
      });

      setUploadedFilePaths(updatedUploadedFilePaths);

      const formDataWithFilePath = {
        ...formData,
        ...updatedUploadedFilePaths,
      };

      console.log("Final data:", formDataWithFilePath);

      // Send a POST request to the addRecordsBook API endpoint
      const res = await axios.post(addRecordsHigherEdu, formDataWithFilePath);
      console.log("Response = ", res);

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

      navigate("/s/data");
    } catch (error) {
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
          Higher Education
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit} >
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
                Academic Year of Higher Education
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
                Roll No (Final Year)
              </Typography>
              <Input
                id="Roll_No"
                size="lg"
                label="Roll No"
                type="number"
                value={formData.Roll_No}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Mobile No
              </Typography>
              <Input
                id="Mobile_No"
                size="lg"
                label="Mobile No"
                value={formData.Mobile_No}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Div
              </Typography>
              <Select
                id="Division"
                label="Eg.11"
                size="lg"
                value={formData.Division}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Division", value },
                  })
                }
              >
                {options.map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Parent Mobile No
              </Typography>
              <Input
                id="Parent_Mobile_No"
                size="lg"
                label="Parent Mobile No"
                value={formData.Parent_Mobile_No}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Passing Year
              </Typography>
              <Input
                id="Passing_Year"
                size="lg"
                label="Passing Year"
                value={formData.Passing_Year}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4 ">
            <div className="w-full md:w-1/2 px-4 mb-4 flex flex-col gap-1">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Qualifying Exam Attempted
              </Typography>
              <Select
                id="Qualifying_Exam_Attempted"
                size="lg"
                label="Qualifying Exam Attempted"
                value={formData.Qualifying_Exam_Attempted}
                onChange={(value) =>
                  handleOnChange({
                    target: { id: "Qualifying_Exam_Attempted", value },
                  })
                }
              >
                <Option value="GRE">GRE</Option>
                <Option value="GATE">GATE</Option>
                <Option value="CAT">CAT</Option>
                <Option value="TOEFL">TOEFL</Option>
                <Option value="IELTS">IELTS</Option>
                <Option value="SAT">SAT</Option>
                <Option value="CMAT">CMAT</Option>
                <Option value="MAT">MAT</Option>
                <Option value="UPSC">UPSC</Option>
                <Option value="MPSC">MPSC</Option>
              </Select>
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload Proof of Qualifying Exam (Only Pdf)
              </Typography>
              <Input
                id="Upload_Proof_of_Qualifying_Exam"
                size="lg"
                type="file"
                label=""
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of university admitted for higher studies
              </Typography>
              <Input
                id="Name_of_university_admitted_for_higher_studies"
                size="lg"
                type="text"
                label="Name of university admitted for higher studies"
                value={formData.Name_of_university_admitted_for_higher_studies}
                onChange={handleOnChange}
              />
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of enrolled Branch Specialization in Months
              </Typography>
              <Input
                id="Name_of_enrolled_Branch_Specialization"
                size="lg"
                label="Name of enrolled Branch Specialization"
                value={formData.Name_of_enrolled_Branch_Specialization}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload ID card or Proof of Admission (Only Pdf)
              </Typography>
              <Input
                id="Upload_ID_card_or_Proof_of_Admission"
                size="lg"
                label=""
                type="file"
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload Score Card as Evidence (Only Pdf)
              </Typography>
              <Input
                id="Upload_Score_Card_as_Evidence"
                size="lg"
                type="file"
                label=""
                onChange={handleOnChange}
              />
            </div>
          </div>

          <Button type="submit" className="mt-4" fullWidth>
            Submit
          </Button>
        </form>
      </Card>
    </>
  );
}
