import React, { useState } from "react";
import Select from "react-select";
import TableData from "./../../components/SModule/Table Data/TableData";

export default function Data() {
  const [selectedOption, setSelectedOption] = useState("Internship");

  const options = [
    { value: "Internship", label: "Internship Details" },
    { value: "Research", label: "Research Publication" },
    { value: "Conference publication", label: "Conference publication" },
    {
      value: "Certificate Course Attended",
      label: "Certificate Course Attended",
    },
    { value: "Sport Data", label: "Sport Data" },
    { value: "Event Participated", label: "Event Participated" },
    { value: "Event Organized", label: "Event Organized" },
    { value: "Technical Events", label: "Technical Events" },
    { value: "Higher Education", label: "Higher Education" },
  ];

  console.log("options:", options);

  const optionComponents = {
    Internship: TableData,
    Research: TableData,
    "Conference publication": TableData,
    "Certificate Course Attended": TableData,
    "Sport Data": TableData,
    "Event Participated": TableData,
    "Event Organized": TableData,
    "Technical Events": TableData,
    "Higher Education": TableData,
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.value);
    console.log(event.value);
  };

  return (
    <>
      <div className="h-screen " style={{ padding: "15px" }}>
        <div className="w-full mt-4 flex flex-col items-center justify-center space-y-2">
          <h2 className="text-slate-900 text-xl font-bold">
            Select your choice:
          </h2>
          <Select
            value={options.find((option) => option.value === selectedOption)}
            onChange={handleOptionChange}
            options={options}
            className="w-2/3 "
          />
        </div>

        {selectedOption && optionComponents[selectedOption] ? (
          <div className="w-full mt-4 ">
            {React.createElement(optionComponents[selectedOption], {
              tableName: selectedOption,
            })}
          </div>
        ) : (
          <div>Component not found</div>
        )}
      </div>
    </>
  );
}
