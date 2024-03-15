import { Select, Option } from "@material-tailwind/react";
import { Link } from "react-router-dom";
// import Research from "../../components/TModule/Research";
// import BookPublication from "../../components/TModule/BookPublication";
// import FacultyConferencePublication from "../../components/TModule/FacultyConferencePublication";
// import Grants from "../../components/TModule/Grants";
// import ConsultancyReport from "../../components/TModule/ConsultancyReport";
// import PatentPublication from "../../components/TModule/PatentPublication";
// import ConfeSeminar from "../../components/TModule/ConfeSeminar";
// import Attended from "../../components/TModule/Attended";
// import WebinarConducted from "../../components/TModule/WebinarConducted";
// import FacultyExchange from "../../components/TModule/FacultyExchange";
// import CertificateCourses from "../../components/TModule/CertificateCourses";
// import ProfessionalAffiliations from "../../components/TModule/ProfessionalAffiliations";
// import FacultyResource from "../../components/TModule/FacultyResource";
// import ExtensionActivity from "../../components/TModule/ExtensionActivity";
// import TechnicalCompetitions from "../../components/TModule/TechnicalCompetitions";
// import FacultyAchievements from "../../components/TModule/FacultyAchievements";
// import IndustrialVisits from "../../components/TModule/IndustrialVisits";
import Contribution from "../../components/TModule/Contribution";

export const TDashBoard = () => {
  return (
    <>
      <div className="w-4/5 mx-auto mt-4">
        <Select label="Select Your Department of work">
          <Link>
            <Option>Research Publication</Option>
          </Link>
          <Option>Book Publication</Option>
          <Option>Faculty Conference Publication</Option>
          <Option>Grants</Option>
          <Option>Consultancy Report</Option>
          <Option>Patent Publication</Option>
          <Option>
            Conferences, Seminars, Workshops, FDP, STTP, Organized/ conducted
          </Option>
          <Option>STTP/FDP/Workshop/Conference Attended</Option>
          <Option>
            Webinar/Guest-Expert Lecture / Video conference /Invited talks
            organized /conducted
          </Option>
          <Option>
            Number of MoUs, collaborations / linkages for Faculty exchange
          </Option>
          <Option>Certificate Courses</Option>
          <Option>Professional Affiliations</Option>
          <Option>Faculty as Resource Person you</Option>
          <Option>Extension Activity</Option>
          <Option>
            Technical Competitions / Tech Fest Organized/Extra & Co-curricular
            activities Organized
          </Option>
          <Option>Faculty Achievement</Option>
          <Option>Industrial Visits / Tours / Field Trip</Option>
          <Option>Contribution to BoS</Option>
        </Select>
      </div>
      <div>
        {/* <Research/> */}
        {/* <BookPublication /> */}
        {/* <FacultyConferencePublication/> */}
        {/* <Grants/> */}
        {/* <ConsultancyReport/> */}
        {/* <PatentPublication/> */}
        {/* <ConfeSeminar/> */}
        {/* <Attended/> */}
        {/* <WebinarConducted/> */}
        {/* <FacultyExchange/> */}
        {/* <CertificateCourses/> */}
        {/* <ProfessionalAffiliations/> */}
        {/* <FacultyResource/> */}
        {/* <ExtensionActivity/> */}
        {/* <TechnicalCompetitions/> */}
        {/* <FacultyAchievements/> */}
        {/* <IndustrialVisits/> */}
        <Contribution />
      </div>
    </>
  );
};
