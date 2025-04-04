import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

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
      "Data Science",
      "Human resource",
      "Fullstack",
      "Accounting",
      "Designing",
    ],
  },
  {
    filterType: "Preference",
    array: ["Part Time", "Full Time"],
  },
  {
    filterType: "Salary",
    array: ["0 to 4000", "4000 to 10000", "10000 to 50000"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);
  return (
    <div className="w-[280px] bg-[#F4F5F7] p-4 pb-4 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3 mb-2" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div>
            <h1 className="font-bold text-md mb-1">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className="flex items-center space-x-2 my-1">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label className="text-sm" htmlFor={itemId}>
                    {item}
                  </Label>
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
