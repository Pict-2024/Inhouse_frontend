const BASE_URL = "http://localhost:5000/api/v1";

//Book Publication
export const getAllRecordsBook = `${BASE_URL}/teacher/book-pb/all`;
export const getOneRecordsBook = (username) => {
  `${BASE_URL}/teacher/book-pb/${username}`;
};
export const addRecordsBook = `${BASE_URL}/teacher/book-pb/create-new`;
export const deleteRecordsBook = `${BASE_URL}/teacher/book-pb/remove`;
export const updateRecordsBook = `${BASE_URL}/teacher/book-pb/update`;

//Research Publication
export const getAllRecordsResearch = `${BASE_URL}/teacher/research-pb/all`;
export const getOneRecordsResearch = (username) => {
  `${BASE_URL}/teacher/research-pb/${username}`;
};
export const addRecordsResearch = `${BASE_URL}/teacher/research-pb/create-new`;
export const deleteRecordsResearch = `${BASE_URL}/teacher/research-pb/remove`;
export const updateRecordsResearch = `${BASE_URL}/teacher/research-pb/update`;

//Faculty Conference Publication
export const getAllRecordsFaculty = `${BASE_URL}/teacher/faculty-pb/all`;
export const getOneRecordsFaculty = (username) => {
  `${BASE_URL}/teacher/faculty-pb/${username}`;
};
export const addRecordsFaculty = `${BASE_URL}/teacher/faculty-pb/create-new`;
export const deleteRecordsFaculty = `${BASE_URL}/teacher/faculty-pb/remove`;
export const updateRecordsFaculty = `${BASE_URL}/teacher/faculty-pb/update`;

//Consultancy Report
export const getAllRecordsConsultancy = `${BASE_URL}/teacher/cons-rep/all`;
export const getOneRecordsConsultancy = (username) => {
  `${BASE_URL}/teacher/cons-rep/${username}`;
};
export const addRecordsConsultancy = `${BASE_URL}/teacher/cons-rep/create-new`;
export const deleteRecordsConsultancy = `${BASE_URL}/teacher/cons-rep/remove`;
export const updateRecordsConsultancy = `${BASE_URL}/teacher/cons-rep/update`;

//Conference Seminars
export const getAllRecordsConference = `${BASE_URL}/teacher/con-sem/all`;
export const getOneRecordsConference = (username) => {
  `${BASE_URL}/teacher/con-sem/${username}`;
};
export const addRecordsConference = `${BASE_URL}/teacher/con-sem/create-new`;
export const deleteRecordsConference = `${BASE_URL}/teacher/con-sem/remove`;
export const updateRecordsConference = `${BASE_URL}/teacher/con-sem/update`;

// SSTP_FDP_Workshop Attended
export const getAllRecordsAttended = `${BASE_URL}/teacher/sf-ws/all`;
export const getOneRecordsAttended = (username) => {
  `${BASE_URL}/teacher/sf-ws/${username}`;
};
export const addRecordsAttended = `${BASE_URL}/teacher/sf-ws/create-new`;
export const deleteRecordsAttended = `${BASE_URL}/teacher/sf-ws/remove`;
export const updateRecordsAttended = `${BASE_URL}/teacher/sf-ws/update`;
