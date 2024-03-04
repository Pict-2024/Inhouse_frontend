import React, { useState } from "react";
import Select from "react-select";

import {
  Attended,
  BookPublication,
  CertificateCourses,
  ConfeSeminar,
  ConsultancyReport,
  Contribution,
  ExtensionActivity,
  FacultyAchievements,
  FacultyConferencePublication,
  FacultyExchange,
  FacultyResource,
  Grants,
  IndustrialVisits,
  PatentPublication,
  ProfessionalAffiliations,
  Research,
  TechnicalCompetitions,
  WebinarConducted,
} from "../../components/TModule";

export default function General() {
  const [selectedOption, setSelectedOption] = useState("Book Publication");

  const options = [
    { value: "Research", label: "Research" },
    { value: "Book Publication", label: "Book Publication" },
    {
      value: "Faculty Conference Publication",
      label: "Faculty Conference Publication",
    },
    { value: "Grants", label: "Grants" },
    { value: "Consultancy Report", label: "Consultancy Report" },
    { value: "Patent Publication", label: "Patent Publication" },
    {
      value: "Conferences, Seminars, Workshops, FDP, STTP Organized /conducted",
      label: "Conferences, Seminars, Workshops, FDP, STTP Organized /conducted",
    },
    {
      value: "STTP/FDP/Workshop/Conference Attended",
      label: "STTP/FDP/Workshop/Conference Attended",
    },
    {
      value:
        "Webinar/Guest-Expert Lecture / Video conference /Invited talks organized /conducted",
      label:
        "Webinar/Guest-Expert Lecture / Video conference /Invited talks organized /conducted",
    },
    {
      value: "Number of MoUs, collaborations / linkages for Faculty exchange",
      label: "Number of MoUs, collaborations / linkages for Faculty exchange",
    },
    { value: "Certificate Courses", label: "Certificate Courses" },
    { value: "Professional Affiliations", label: "Professional Affiliations" },
    {
      value: "Faculty as Resource Person you",
      label: "Faculty as Resource Person you",
    },
    { value: "Extension Activity", label: "Extension Activity" },
    {
      value:
        "Technical Competitions / Tech Fest Organized/Extra & Co-curricular activities Organized",
      label:
        "Technical Competitions / Tech Fest Organized/Extra & Co-curricular activities Organized",
    },
    { value: "Faculty Achievement", label: "Faculty Achievement" },
    {
      value: "Industrial Visits / Tours / Field Trip",
      label: "Industrial Visits / Tours / Field Trip",
    },
    { value: "Contribution to BoS", label: "Contribution to BoS" },
  ];

  // A mapping of option values to their corresponding components
  const optionComponents = {
    Research: Research,
    "Book Publication": BookPublication,
    "Faculty Conference Publication": FacultyConferencePublication,
    Grants: Grants,
    "Consultancy Report": ConsultancyReport,
    "Patent Publication": PatentPublication,
    "Conferences, Seminars, Workshops, FDP, STTP Organized /conducted":
      ConfeSeminar,
    "STTP/FDP/Workshop/Conference Attended": Attended,
    "Webinar/Guest-Expert Lecture / Video conference /Invited talks organized /conducted":
      WebinarConducted,
    "Number of MoUs, collaborations / linkages for Faculty exchange":
      FacultyExchange,

    "Certificate Courses": CertificateCourses,
    "Professional Affiliations": ProfessionalAffiliations,
    "Faculty as Resource Person you": FacultyResource,
    "Extension Activity": ExtensionActivity,
    "Technical Competitions / Tech Fest Organized/Extra & Co-curricular activities Organized":
      TechnicalCompetitions,
    "Faculty Achievement": FacultyAchievements,
    "Industrial Visits / Tours / Field Trip": IndustrialVisits,
    "Contribution to BoS": Contribution,
  };

  // Function to handle the option selection
  const handleOptionChange = (event) => {
    // console.log(event.target.option);
    // console.log("selected hit");
    setSelectedOption(event.value);
    // console.log(selectedOption);
    // console.log(selectedOption);
  };

  return (
    <div className="h-full  " style={{ padding: "5px" }}>
      <div className="w-full mt-4 flex flex-col items-center justify-center space-y-2">
        <h2 className="text-slate-900 text-xl font-bold">
          Select your choice :
        </h2>
        <Select
          value={options.find((option) => option.value === selectedOption)}
          onChange={handleOptionChange}
          options={options}
          className="w-2/3"
        />
      </div>
      {selectedOption ? (
        // Render the selected component if an option is selected
        <div className="w-full mt-4 ">
          {React.createElement(optionComponents[selectedOption])}
        </div>
      ) : (
        // Render the Faculty Achievement component by default
        <BookPublication />
      )}
    </div>
  );
}
