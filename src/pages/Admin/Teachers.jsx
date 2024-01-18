import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/AModule/Header";
import { CheckCircleIcon, PencilIcon } from "@heroicons/react/24/outline";
import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [editingEmail, setEditingEmail] = useState(null);
  const [selectedTeacherAccess, setSelectedTeacherAccess] = useState([]);
  const [selectedStudentAccess, setSelectedStudentAccess] = useState([]);
  const [teacherTableAccess, setTeacherTableAccess] = useState([]);
  const [studentTableAccess, setStudentTableAccess] = useState([]);


  const getAllTeachers = async () => {
    try {
      const apiurl = "http://localhost:5000/api/v1/auth/getAllTeacher";
      const response = await axios.get(apiurl, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setTeachers(response.data.data);
      console.log("teachers are : ", teachers)
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const getAllTables = async () => {
    try {
      const tablesUrl = "http://localhost:5000/api/v1/teacher/gettables/tables-stud-fact";
      const response = await axios.get(tablesUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { Teacher_Tables, Student_Tables } = response.data.data;

      // Set the teacher and student table access arrays from the backend data
      setTeacherTableAccess(Teacher_Tables || []);
      setStudentTableAccess(Student_Tables || []);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  useEffect(() => {
    getAllTeachers();
    getAllTables();
  }, []);


  const handleEditClick = (Username) => {
    const teacher = teachers.find((teacher) => teacher.Username === Username);

    // Set the initial selected values based on the data from the backend
    setSelectedTeacherAccess(teacher.SpecialAccessTeacher || []);
    setSelectedStudentAccess(teacher.SpecialAccessStudent || []);

    setEditingEmail(Username);
  };

  const handleSaveClick = async (Username) => {
    try {
      const updateApiurl = `http://localhost:5000/api/v1/general/update-fields`;

      // Modify the data to be sent to the backend
      const data = {
        username: Username,
        teacherTables: selectedTeacherAccess,
        studentTables: selectedStudentAccess,
      };

      console.log("data after submitting is : ", data)

      console.log("Teacher access is :", selectedTeacherAccess)
      console.log("Student access is :", selectedStudentAccess)

      await axios.post(updateApiurl, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success(`Access updated for ${Username}`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setEditingEmail(null);

      // Update the state with the modified value
      setTeachers((prevTeachers) =>
        prevTeachers.map((teacher) =>
          teacher.Username === Username
            ? {
                ...teacher,
                SpecialAccessTeacher: selectedTeacherAccess,
                SpecialAccessStudent: selectedStudentAccess,
              }
            : teacher
        )
      );
    } catch (error) {
      console.error("Error updating teacher:", error);
    }
  };

  const handleSpecialAccessSelectChange = (value, type) => {
    if (type === 'teacher') {
      setSelectedTeacherAccess(value.map((option) => option.value));
    } else if (type === 'student') {
      setSelectedStudentAccess(value.map((option) => option.value));
    }
  };

  return (
    <div className="container mx-auto">
      <div>
        <Header category="Page" title="Teacher" />
      </div>
      <div className="overflow-x-auto mx-4">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">
                <Typography
                  variant="medium"
                  color="blue"
                  className="flex items-center justify-between gap-2 leading-none opacity-70 font-bold text-dark-700"
                >
                  Name
                </Typography>
              </th>
              <th className="py-2 px-4 border-b">
                <Typography
                  variant="medium"
                  color="blue"
                  className="flex items-center justify-between gap-2 leading-none opacity-70 font-bold text-dark-700"
                >
                  Email
                </Typography>
              </th>
              <th className="py-2 px-4 border-b">
                <Typography
                  variant="medium"
                  color="blue"
                  className="flex items-center justify-between gap-2 leading-none opacity-70 font-bold text-dark-700"
                >
                  Special Access
                </Typography>
              </th>
              <th className="py-2 px-4 border-b">
                <Typography
                  variant="medium"
                  color="blue"
                  className="flex items-center justify-between gap-2  leading-none opacity-70 font-bold text-dark-700"
                >
                  Actions
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {teachers?.map((teacher) => (
              <tr key={teacher.Username} className="hover:bg-light-blue-50">
                <td className="py-2 px-4 border-b">{teacher.Name}</td>
                <td className="py-2 px-4 border-b">{teacher.Username}</td>
                <td className={`py-2 px-4 border-b ${editingEmail === teacher.Username ? "editable" : ""}`}>
                  {editingEmail === teacher.Username ? (
                    <>
                      <div className="mb-2">
                        <label>Special Access Teacher:</label>
                        <Select
                          isMulti
                          options={teacherTableAccess.map(option => ({
                            value: option,
                            label: option,
                          }))}
                          value={selectedTeacherAccess.map((option) => ({ value: option, label: option }))}
                          onChange={(value) => handleSpecialAccessSelectChange(value, 'teacher')}
                        />
                      </div>
                      <div>
                        <label>Special Access Student:</label>
                        <Select
                          isMulti
                          options={studentTableAccess.map(option => ({
                            value: option,
                            label: option,
                          }))}
                          value={selectedStudentAccess.map((option) => ({ value: option, label: option }))}
                          onChange={(value) => handleSpecialAccessSelectChange(value, 'student')}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <strong>Faculty:</strong> {teacher.SpecialAccess_Teacher ? teacher.SpecialAccess_Teacher : ""}
                      <br />
                      <strong>Student:</strong> {teacher.SpecialAccess_Student ? teacher.SpecialAccess_Student : ""}
                    </>
                  )}
                </td>
                <td className="py-2 px-4 border-b flex items-center">
                  {editingEmail === teacher.Username ? (
                    <Tooltip content="Save Changes">
                      <IconButton
                        onClick={() => handleSaveClick(teacher.Username)}
                        variant="text"
                      >
                        <CheckCircleIcon className="h-4 w-4 text-green-500" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip content="Edit Data">
                      <IconButton
                        onClick={() => handleEditClick(teacher.Username)}
                        variant="text"
                      >
                        <PencilIcon className="h-4 w-4 text-blue-500" />
                      </IconButton>
                    </Tooltip>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
