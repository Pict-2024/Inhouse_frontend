import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

export default function ProfessionalAffiliations() {
  const [formData, setFormData] = useState({
    // teacherName: "",
    // facultyName: "",
    professionalAffiliation: "",
    membershipNumber: "",
    financialSupport: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, you can access form data in the formData object
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
          Professional Affiliations
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Professional Affiliation
              </Typography>
              <Input
                size="lg"
                name="professionalAffiliation"
                value={formData.professionalAffiliation}
                label="Professional Affiliation"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Membership Number/ID
              </Typography>
              <Input
                size="lg"
                name="membershipNumber"
                value={formData.membershipNumber}
                label="Membership Number/ID"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Financial Support from PICT
            </Typography>
            <Input
              size="lg"
              name="financialSupport"
              value={formData.financialSupport}
              label="Financial Support from PICT"
              onChange={handleChange}
            />
          </div>
          <Button className="mt-4" fullWidth type="submit">
            Add Changes
          </Button>
        </form>
      </Card>
    </>
  );
}
