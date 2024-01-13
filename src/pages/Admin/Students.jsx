// import { useEffect, useState } from "react";
// import axios from "axios";
import Header from "../../components/AModule/Header";
// import { CheckCircleIcon, PencilIcon } from "@heroicons/react/24/outline";
// import { IconButton, Tooltip, Typography } from "@material-tailwind/react";

export default function Students() {
  return (
    <div><Header category="Page" title="Student" /></div>
  )
  // const [teachers, setTeachers] = useState([]);
  // const [editingEmail, setEditingEmail] = useState(null);

  // const getAllTeachers = async () => {
  //   try {
  //     const apiurl = "http://localhost:5000/api/v1/auth/getAllTeacher";
  //     const response = await axios.get(apiurl, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     setTeachers(response.data.data);
  //   } catch (error) {
  //     console.error("Error fetching teachers:", error);
  //   }
  // };

  // useEffect(() => {
  //   getAllTeachers();
  // }, []);

  // const handleEditClick = (email) => {
  //   setEditingEmail(email);
  // };

  // const handleSaveClick = async (email) => {
  //   try {
  //     const editedTeacher = teachers.find((teacher) => teacher.Email === email);
  //     console.log("Email:", email);
  //     console.log("access:", editedTeacher.SpecialAccess);
  //     const updateApiurl = `http://localhost:5000/api/v1/general/update-access?Email=${email}&SpecialAccess=${editedTeacher.SpecialAccess}`;
  //     await axios.put(updateApiurl, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       data: {
  //         Email: email,
  //         SpecialAccess: editedTeacher.SpecialAccess,
  //       },
  //     });

  //     setEditingEmail(null);

  //     // Update the state with the modified value
  //     setTeachers((prevTeachers) =>
  //       prevTeachers.map((teacher) =>
  //         teacher.Email === email
  //           ? { ...teacher, SpecialAccess: editedTeacher.SpecialAccess }
  //           : teacher
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error updating teacher:", error);
  //   }
  // };

  // const handleSpecialAccessChange = (email, value) => {
  //   setTeachers((prevTeachers) =>
  //     prevTeachers.map((teacher) =>
  //       teacher.Email === email ? { ...teacher, SpecialAccess: value } : teacher
  //     )
  //   );
  // };

  // return (
  //   <div className="container mx-auto">
  //     <div>
  //       <Header category="Page" title="Teacher" />
  //     </div>
  //     <div className="overflow-x-auto mx-4">
  //       <table className="mt-4 w-full min-w-max table-auto text-left">
  //         <thead>
  //           <tr className="bg-gray-200">
  //             <th className="py-2 px-4 border-b">
  //               <Typography
  //                 variant="medium"
  //                 color="blue"
  //                 className="flex items-center justify-between gap-2 font-normal leading-none opacity-70 font-bold text-dark-700"
  //               >
  //                 Name
  //               </Typography>
  //             </th>
  //             <th className="py-2 px-4 border-b">
  //               <Typography
  //                 variant="medium"
  //                 color="blue"
  //                 className="flex items-center justify-between gap-2 font-normal leading-none opacity-70 font-bold text-dark-700"
  //               >
  //                 Email
  //               </Typography>
  //             </th>
  //             <th className="py-2 px-4 border-b">
  //               <Typography
  //                 variant="medium"
  //                 color="blue"
  //                 className="flex items-center justify-between gap-2 font-normal leading-none opacity-70 font-bold text-dark-700"
  //               >
  //                 Special Access
  //               </Typography>
  //             </th>
  //             <th className="py-2 px-4 border-b">
  //               <Typography
  //                 variant="medium"
  //                 color="blue"
  //                 className="flex items-center justify-between gap-2 font-normal leading-none opacity-70 font-bold text-dark-700"
  //               >
  //                 Actions
  //               </Typography>
  //             </th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {teachers?.map((teacher) => (
  //             <tr key={teacher.Email} className="hover:bg-light-blue-50">
  //               <td className="py-2 px-4 border-b">{teacher.Name}</td>
  //               <td className="py-2 px-4 border-b">{teacher.Email}</td>
  //               <td
  //                 className={`py-2 px-4 border-b ${
  //                   editingEmail === teacher.Email ? "editable" : ""
  //                 }`}
  //               >
  //                 {editingEmail === teacher.Email ? (
  //                   <select
  //                     value={teacher.SpecialAccess}
  //                     onChange={(e) =>
  //                       handleSpecialAccessChange(teacher.Email, e.target.value)
  //                     }
  //                     className="border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
  //                   >
  //                     {["NAAC", "PDA", "Development", "Sports", "null"].map(
  //                       (option) => (
  //                         <option key={option} value={option}>
  //                           {option}
  //                         </option>
  //                       )
  //                     )}
  //                   </select>
  //                 ) : (
  //                   teacher.SpecialAccess
  //                 )}
  //               </td>
  //               <td className="py-2 px-4 border-b flex items-center">
  //                 {editingEmail === teacher.Email ? (
  //                   <Tooltip content="Save Changes">
  //                     <IconButton
  //                       onClick={() => handleSaveClick(teacher.Email)}
  //                       variant="text"
  //                     >
  //                       <CheckCircleIcon className="h-4 w-4 text-green-500" />
  //                     </IconButton>
  //                   </Tooltip>
  //                 ) : (
  //                   <Tooltip content="Edit Data">
  //                     <IconButton
  //                       onClick={() => handleEditClick(teacher.Email)}
  //                       variant="text"
  //                     >
  //                       <PencilIcon className="h-4 w-4 text-blue-500" />
  //                     </IconButton>
  //                   </Tooltip>
  //                 )}
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );
}
