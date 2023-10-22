import {
    Card,
    Select,
    Option,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
  
  export default function FacultyExchange() {
    const currentYear = new Date().getFullYear();
    const years = Array.from(
      { length: currentYear - 1999 },
      (_, index) => currentYear - index
    );
  
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
            Number of MoUs, collaborations / linkages for Faculty exchange
          </Typography>
  
          <form className="mt-8 mb-2">
            <div className="mb-4 flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Name of the MoU / Collaboration / Linkage
                </Typography>
                <Input
                  size="lg"
                  placeholder="Name of the MoU / Collaboration / Linkage"
                  className="border-t-blue-gray-200 focus-border-t-gray-900"
                />
              </div>
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Name of the collaborating agency / institution / industry / corporate house
                </Typography>
                <Input
                  size="lg"
                  placeholder="Collaborating Agency / Institution"
                  className="border-t-blue-gray-200 focus-border-t-gray-900"
                />
              </div>
            </div>
  
            <div className="mb-4 flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Faculty Coordinator
                </Typography>
                <Input
                  size="lg"
                  placeholder="Faculty Coordinator"
                  className="border-t-blue-gray-200 focus-border-t-gray-900"
                />
              </div>
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Department
                </Typography>
                <Input
                  size="lg"
                  placeholder="Department"
                  className="border-t-blue-gray-200 focus-border-t-gray-900"
                />
              </div>
            </div>
  
            <div className="mb-4 flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Year of Signing MoU / Collaboration / Linkage
                </Typography>
                <Select
                  size="lg"
                  placeholder="Select Year"
                  color="light-gray"
                  className="border-t-blue-gray-200 focus-border-t-gray-900"
                >
                  {years.map((year) => (
                    <Option key={year} value={year}>
                      {year}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Duration of MoU / Collaboration / Linkage
                </Typography>
                <Input
                  size="lg"
                  placeholder="Duration (in years)"
                  className="border-t-blue-gray-200 focus-border-t-gray-900"
                />
              </div>
            </div>
  
            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Objectives/Purpose of MoU, Collaboration/Linkages
              </Typography>
              <Input
                size="lg"
                placeholder="Objectives/Purpose"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
              />
            </div>
  
            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                List the Actual Activities under each MoU and Web-Links Year-wise
              </Typography>
              <Input
                size="lg"
                placeholder="Activities and Web-Links"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
              />
            </div>
  
            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Link to the Relevant Document
              </Typography>
              <Input
                size="lg"
                placeholder="Relevant Document Link"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
              />
            </div>
  
            <div className="mb-4 flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Any Financial Support/Transaction
                </Typography>
                <Input
                  size="lg"
                  placeholder="Financial Support/Transaction"
                  className="border-t-blue-gray-200 focus-border-t-gray-900"
                />
              </div>
              <div className="w-full md:w-1/2 px-4 mb-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Report
                </Typography>
                <Input
                  size="lg"
                  type="file"
                  placeholder="Report"
                  className="border-t-blue-gray-200 focus-border-t-gray-900"
                />
              </div>
            </div>
  
            <Button className="mt-4" fullWidth>
              Add Changes
            </Button>
          </form>
        </Card>
      </>
    );
  }
  