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
  const options = Array.from({ length: 11 }, (_, index) => index + 1);
  const [formData, setFormData] = useState({
    S_ID: null,
    Username: currentUser?.Username,
    Academic_Year: "",
    Student_Name: currentUser?.Name,
    Roll_No: "",
    Division: "",
    Department: "",
    Mobile_No: "",
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

  const handleFileUpload = async (file) => {
    try {
      console.log("file as:", file);

      const formDataForFile = new FormData();
      formDataForFile.append("file", file);
      formDataForFile.append("username", currentUser?.Username);
      formDataForFile.append("role", currentUser?.Role);
      formDataForFile.append("tableName", "student_higher_education");
      formDataForFile.append("columnName", [
        "Upload_Proof_of_Qualifying_Exam",
        "Upload_Score_Card_as_Evidence",
        "Upload_ID_card_or_Proof_of_Admission",
      ]);

      const response = await axios.post(
        uploadRecordsHigherEdu,
        formDataForFile
      );
      console.log(response);
      // console.log("file response:", response.data.filePath);

      return response.data.filePath;
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error as needed
    }
  };

  // const handleQualifyingExamChange = (value) => {
  //   setFormData((prevFormData) => {
  //     return {
  //       ...prevFormData,
  //       Qualifying_Exam_Attempted: value,
  //     };
  //   });
  // };

  //add new record
  const handleSubmit = async (e) => {
    console.log("handle submit api hit");
    console.log("Form data is : ", formData);
    e.preventDefault();

    var completionPath, internshipPath, uploadId;

    try {
      if (
        formData.Upload_Proof_of_Qualifying_Exam !== null &&
        formData.Upload_Score_Card_as_Evidence !== null &&
        formData.Upload_ID_card_or_Proof_of_Admission
      ) {
        completionPath = await handleFileUpload(
          formData.Upload_Proof_of_Qualifying_Exam
        );
        internshipPath = await handleFileUpload(
          formData.Upload_Score_Card_as_Evidence
        );
        uploadId = await handleFileUpload(
          formData.Upload_ID_card_or_Proof_of_Admission
        );
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

      const formDataWithFilePath = {
        ...formData,

        Upload_Proof_of_Qualifying_Exam: completionPath,
        Upload_Score_Card_as_Evidence: internshipPath,
        Upload_ID_card_or_Proof_of_Admission: uploadId,
      };
      if (completionPath === "" || internshipPath === "" || uploadId === "") {
        // If file is null, display a toast alert
        toast.error("Some error occurred while uploading file", {
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
      toast.error("File upload failed. Please try again.", {
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
