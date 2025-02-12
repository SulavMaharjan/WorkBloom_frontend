import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const filterData = [
  {
    filterType: "Location",
    array: ["Kathmandu", "Lalitpur", "Pokhara", "Bhaktapur", "Chitwan"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend",
      "Backend",
      "Designing",
      "Human resource",
      "Fullstack",
      "Accounting",
      "Marketing",
    ],
  },
  {
    filterType: "Preference",
    array: ["Remote", "Office", "Both"],
  },
  {
    filterType: "Salary",
    array: ["0 to 40k", "40k to 1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  return (
    <div className="w-[280px] bg-[#F4F5F7] p-4 pb-4 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3 mb-2" />
      <RadioGroup>
        {filterData.map((data, index) => (
          <div>
            <h1 className="font-bold text-md mb-1">{data.filterType}</h1>
            {data.array.map((item, index) => {
              return (
                <div className="flex items-center space-x-2 my-1">
                  <RadioGroupItem value={item} />
                  <Label className="text-sm">{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
