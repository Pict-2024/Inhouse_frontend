import {
  Card,
  Select,
  Option,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function Research() {
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
          Research Publication
        </Typography>

        <form className="mt-8 mb-2">
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Name of Faculty
              </Typography>
              <Input
                size="lg"
                placeholder="Name of Faculty"
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Department
              </Typography>
              <Input
                size="lg"
                placeholder="Department"
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Title of Research Article
              </Typography>
              <Input
                size="lg"
                placeholder="Title of Research Article"
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Type
              </Typography>
              <Input
                size="lg"
                placeholder="Type Research/Review"
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Level
              </Typography>
              <Select
                size="lg"
                placeholder="Select Level"
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              >
                <Option value="Undergraduate">International</Option>
                <Option value="Graduate">National</Option>
                <Option value="Postgraduate">State University</Option>
              </Select>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Indexed
              </Typography>
              <Select
                size="lg"
                placeholder="Select Selection"
                color="light-gray"
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              >
                <Option value="Selected">SCI</Option>
                <Option value="Not Selected">Scopus</Option>
                <Option value="Not Selected">Web of Science</Option>
                <Option value="Not Selected">UGC</Option>
                <Option value="Not Selected">Others</Option>
              </Select>
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Date
              </Typography>
              <Input
                size="lg"
                placeholder="Author"
                type="date"
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Author
              </Typography>
              <Input
                size="lg"
                placeholder="Author"
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Affiliation at the Time of Publication
              </Typography>
              <Input
                size="lg"
                placeholder="Author"
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Role
              </Typography>
              <Select
                size="lg"
                placeholder="Select Role"
                color="light-gray"
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              >
                <Option value="Selected">First Author</Option>
                <Option value="Not Selected">Second Author</Option>
                <Option value="Not Selected">Third Author</Option>
              </Select>
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Publisher
              </Typography>
              <Input
                size="lg"
                placeholder="Publisher"
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Co-Author(s)
              </Typography>
              <Input
                size="lg"
                placeholder="Co-Author"
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Journal Name
              </Typography>
              <Input
                size="lg"
                placeholder="Publisher"
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                ISSN
              </Typography>
              <Input
                size="lg"
                placeholder="Co-Author"
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Volume
              </Typography>
              <Input
                size="lg"
                placeholder="Publisher"
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Page Numbers
              </Typography>
              <Input
                size="lg"
                placeholder="Co-Author"
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Issue
              </Typography>
              <Input
                size="lg"
                placeholder="Issue"
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Year
              </Typography>
              <Select
                size="lg"
                placeholder="Select Year"
                color="light-gray"
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              >
                {years.map((year) => (
                  <Option key={year} value={year}>
                    {year}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                DOI
              </Typography>
              <Input
                size="lg"
                placeholder="DOI"
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Financial support from institute in INR
              </Typography>
              <Input
                size="lg"
                placeholder="Financial support from institute in INR "
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Link to article / paper / abstract of the article
              </Typography>
              <Input
                size="lg"
                placeholder="  Link to article / paper / abstract of the article "
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload the Paper
              </Typography>
              <Input
                size="lg"
                type="file"
                placeholder="Financial support from institute in INR "
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Achievements if any
              </Typography>
              <Input
                size="lg"
                placeholder="Achievements if any  "
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Upload Document of Achievement
              </Typography>
              <Input
                size="lg"
                type="file"
                placeholder="Financial support from institute in INR "
                className="border-t-blue-gray-200 focus:border-t-gray-900"
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
