import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

export default function PatentPublication() {
  // Define state variables for form fields
  const [formData, setFormData] = useState({
    // staffName: "",
    departmentName: "",
    patentApplicationNo: "",
    patentStatus: "",
    inventorName: "",
    patentTitle: "",
    applicantName: "",
    patentFiledDate: "",
    patentPublishedDate: "",
    publicationNumber: "",
    assigneeName: "",
    financialSupport: "",
    sourceProofURL: "",
    patentType: "",
    country: "",
    patentDocument: null,
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can access the form data in the `formData` object
    console.log(formData);
    // Add your submission logic here
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
          Patent Publication
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of Department
              </Typography>
              <Input
                size="lg"
                name="departmentName"
                value={formData.departmentName}
                onChange={handleChange}
                label="Name of Department"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Patent Application No.
              </Typography>
              <Input
                size="lg"
                name="patentApplicationNo"
                value={formData.patentApplicationNo}
                onChange={handleChange}
                label="Patent Application No."
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Status of Patent (Published / Granted)
              </Typography>
              <Input
                size="lg"
                name="patentStatus"
                value={formData.patentStatus}
                onChange={handleChange}
                label="Status of Patent (Published / Granted)"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Inventors Name
              </Typography>
              <Input
                size="lg"
                name="inventorName"
                value={formData.inventorName}
                onChange={handleChange}
                label="Inventor's Name"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Title of the Patent
              </Typography>
              <Input
                size="lg"
                name="patentTitle"
                value={formData.patentTitle}
                onChange={handleChange}
                label="Title of the Patent"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Applicants Name
              </Typography>
              <Input
                size="lg"
                name="applicantName"
                value={formData.applicantName}
                onChange={handleChange}
                label="Applicant's Name"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Patent Filed Date
              </Typography>
              <Input
                size="lg"
                name="patentFiledDate"
                value={formData.patentFiledDate}
                onChange={handleChange}
                type="date"
                label="Patent Filed Date (DD/MM/YYYY)"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Patent Published Date / Granted Date
              </Typography>
              <Input
                size="lg"
                name="patentPublishedDate"
                value={formData.patentPublishedDate}
                onChange={handleChange}
                type="date"
                label="Patent Published Date / Granted Date (DD/MM/YYYY)"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Patent Publication Number / Patent Granted Number
              </Typography>
              <Input
                size="lg"
                name="publicationNumber"
                value={formData.publicationNumber}
                onChange={handleChange}
                label="Patent Publication Number / Patent Granted Number"
              />
            </div>
          </div>
          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Assignees Name (Institute Affiliation at the time of Application)
            </Typography>
            <Input
              size="lg"
              name="assigneeName"
              value={formData.assigneeName}
              onChange={handleChange}
              label="Assignee's Name"
            />
          </div>
          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Financial Support by PICT Amount in Rs
            </Typography>
            <Input
              size="lg"
              name="financialSupport"
              value={formData.financialSupport}
              onChange={handleChange}
              label="Financial Support by PICT Amount in Rs"
            />
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Source Proof URL/Website Links, etc.
              </Typography>
              <Input
                size="lg"
                name="sourceProofURL"
                value={formData.sourceProofURL}
                onChange={handleChange}
                label="Source Proof URL/Website Links, etc."
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Type of the Patent
              </Typography>
              <Input
                size="lg"
                name="patentType"
                value={formData.patentType}
                onChange={handleChange}
                label="Type of the Patent"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Country
              </Typography>
              <Input
                size="lg"
                name="country"
                value={formData.country}
                onChange={handleChange}
                label="Country"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload Patent Document(Add drive link)
              </Typography>
              <Input
                size="lg"
                name="patentDocument"
                onChange={handleChange}
                type="text"
                label="Upload Patent Document"
              />
            </div>
          </div>

          <Button type="submit" className="mt-4" fullWidth>
            Add Changes
          </Button>
        </form>
      </Card>
    </>
  );
}
