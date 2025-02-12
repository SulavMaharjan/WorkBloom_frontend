import React from "react";
import { Badge } from "../ui/badge";

const LatestJobCards = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">Company Name</h1>
        <p className="text-sm text-gray-500">Nepal</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Job Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="flex item-center gap-2 mt-4">
        <Badge className="text-[#4174F5] font-bold" variant="ghost">
          12 Positions
        </Badge>
        <Badge className="text-[#F37418] font-bold" variant="ghost">
          Part time
        </Badge>
        <Badge className="text-red-600 font-bold" variant="ghost">
          24LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
