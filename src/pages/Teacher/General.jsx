import { Select, Option } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import TechnicalCompetitions from "../../components/TModule/TechnicalCompetitions";


export default function General() {
  return (
    <>
      <div className="w-4/5 mx-auto mt-4">
        <Select label="Select your Department">
          <Link>
            <Option>Research</Option>
          </Link>
          <Link>
            <Option>Book Publication</Option>
          </Link>
          <Option>Faculty Conference Publication</Option>
          <Option>Grants</Option>
          <Option>Consultancy Report</Option>
          <Option>Patent Publication</Option>
          <Option>
            Conferences, Seminars, Workshops, FDP, STTP Organized /conducted
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
      {/* <Grants/> */}
      <TechnicalCompetitions />
    </>
  );
}
