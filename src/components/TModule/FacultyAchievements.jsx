import {
  Card,
  Select,
  Option,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function FacultyAchievements() {
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
          Faculty Achievement
        </Typography>

        <form className="mt-8 mb-2">
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of the faculty
              </Typography>
              <Input
                size="lg"
                placeholder="Name of the faculty"
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
                Achievement / Awards Details
              </Typography>
              <Input
                size="lg"
                placeholder="Achievement / Awards Details"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of Event
              </Typography>
              <Input
                size="lg"
                placeholder="Name of Event"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of Organiser
              </Typography>
              <Input
                size="lg"
                placeholder="Name of Organiser"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Achievement Level
              </Typography>
              <Select
                size="lg"
                placeholder="Select Level"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
              >
                <Option value="International">International</Option>
                <Option value="National">National</Option>
                <Option value="State">State</Option>
                <Option value="University">University</Option>
                <Option value="District">District</Option>
                <Option value="Institue">Institue</Option>
              </Select>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Award Type (Winner, Runner, Consolation, Appreciation)
              </Typography>
              <Select
                size="lg"
                placeholder="Select Award Type"
                className="border-t-blue-gray-200 focus-border-t-gray-900"
              >
                <Option value="Winner">Winner</Option>
                <Option value="Runner">Runner</Option>
                <Option value="Consolation">Consolation</Option>
                <Option value="Appreciation">Appreciation</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Award/Prize Money
              </Typography>
              <Input
                size="lg"
                placeholder="Award/Prize Money"
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
