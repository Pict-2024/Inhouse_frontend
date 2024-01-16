const BASE_URL = "http://localhost:5000/api/v1";

// Internship Details Routes
export const getAllRecordsInternship = `${BASE_URL}/student/internship-details/all`;
export const getOneRecordsInternship = (username) => {
  return `${BASE_URL}/student/internship-details/${username}`;
};
export const addRecordsInternship = `${BASE_URL}/student/internship-details/create-new`;
export const deleteRecordsInternship = `${BASE_URL}/student/internship-details/remove`;
export const updateRecordsInternship = `${BASE_URL}/student/internship-details/update`;

// Research Publications Routes
export const getAllRecordsResearch = `${BASE_URL}/student/research-pb/all`;
export const getOneRecordsResearch = (username) => {
  return `${BASE_URL}/student/research-pb/${username}`;
};
export const addRecordsResearch = `${BASE_URL}/student/research-pb/create-new`;
export const deleteRecordsResearch = `${BASE_URL}/student/research-pb/remove`;
export const updateRecordsResearch = `${BASE_URL}/student/research-pb/update`;

// Conference publication Routes
export const getAllRecordsConference = `${BASE_URL}/student/conference-pb/all`;
export const getOneRecordsConference = (username) => {
  return `${BASE_URL}/student/conference-pb/${username}`;
};
export const addRecordsConference = `${BASE_URL}/student/conference-pb/create-new`;
export const deleteRecordsConference = `${BASE_URL}/student/conference-pb/remove`;
export const updateRecordsConference = `${BASE_URL}/student/conference-pb/update`;

// Certificate_Courses Routes
export const getAllRecordsCertificate = `${BASE_URL}/student/certificate-courses/all`;
export const getOneRecordsCertificate = (username) => {
  return `${BASE_URL}/student/certificate-courses/${username}`;
};
export const addRecordsCertificate = `${BASE_URL}/student/certificate-courses/create-new`;
export const deleteRecordsCertificate = `${BASE_URL}/student/certificate-courses/remove`;
export const updateRecordsCertificate = `${BASE_URL}/student/certificate-courses/update`;

// Sport Data Routes
export const getAllRecordsSport = `${BASE_URL}/student/sports-data/all`;
export const getOneRecordsSport = (username) => {
  return `${BASE_URL}/student/sports-data/${username}`;
};
export const addRecordsSport = `${BASE_URL}/student/sports-data/create-new`;
export const deleteRecordsSport = `${BASE_URL}/student/sports-data/remove`;
export const updateRecordsSport = `${BASE_URL}/student/sports-data/update`;

// Event Participation Routes
export const getAllRecordsParticipation = `${BASE_URL}/student/event-participation/all`;
export const getOneRecordsParticipation = (username) => {
  return `${BASE_URL}/student/event-participation/${username}`;
};
export const addRecordsParticipation = `${BASE_URL}/student/event-participation/create-new`;
export const deleteRecordsParticipation = `${BASE_URL}/student/event-participation/remove`;
export const updateRecordsParticipation = `${BASE_URL}/student/event-participation/update`;

// Event Organized Route
export const getAllRecordsOrganized = `${BASE_URL}/student/event-org/all`;
export const getOneRecordsOrganized = (username) => {
  return `${BASE_URL}/student/event-org/${username}`;
};
export const addRecordsOrganized = `${BASE_URL}/student/event-org/create-new`;
export const deleteRecordsOrganized = `${BASE_URL}/student/event-org/remove`;
export const updateRecordsOrganized = `${BASE_URL}/student/event-org/update`;

// Technical Events Routes
export const getAllRecordsTechnical = `${BASE_URL}/student/tech-events/all`;
export const getOneRecordsTechnical = (username) => {
  return `${BASE_URL}/student/tech-events/${username}`;
};
export const addRecordsTechnical = `${BASE_URL}/student/tech-events/create-new`;
export const deleteRecordsTechnical = `${BASE_URL}/student/tech-events/remove`;
export const updateRecordsTechnical = `${BASE_URL}/student/tech-events/update`;

// Higher Education Routes
export const getAllRecordsHigherEdu = `${BASE_URL}/student/higher-edu/all`;
export const getOneRecordsHigherEdu = (username) => {
  return `${BASE_URL}/student/higher-edu/${username}`;
};
export const addRecordsHigherEdu = `${BASE_URL}/student/higher-edu/create-new`;
export const deleteRecordsHigherEdu = `${BASE_URL}/student/higher-edu/remove`;
export const updateRecordsHigherEdu = `${BASE_URL}/student/higher-edu/update`;