import React from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  // const jobId = "yoysafdasfaye";

  const daysAgoFunction = (mongoDbTime) => {
    const createdAt = new Date(mongoDbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-5 m-5 rounded-md shadow-xl bg-[#F6F7FA] border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {daysAgoFunction(job?.createdAt) == 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex gap-4">
        <div>
          <button className="p-6" variant="outline">
            <Avatar className="w-[80px] h-[80px]">
              <AvatarImage src={job?.company?.logo} />
            </Avatar>
          </button>
        </div>

        <div className="flex flex-col">
          <div>
            <div>
              <h1 className="font-medium text-lg">{job?.company?.name}</h1>
              <p className="text-sm text-gray-400">Nepal</p>
            </div>
            <h1 className="font-bold text-lg my-2">{job?.title}</h1>
            <p className="text-sm text-gray-400">{job?.description}</p>
          </div>

          <div className="flex justify-between">
            <div className="flex item-center gap-2 mt-4">
              <Badge className="text-[#4174F5] font-bold" variant="ghost">
                {job?.position} Positions
              </Badge>
              <Badge className="text-[#F37418] font-bold" variant="ghost">
                {job?.jobType}
              </Badge>
              <Badge className="text-red-600 font-bold" variant="ghost">
                {job?.salary} USD
              </Badge>
            </div>

            <Button
              onClick={() => navigate(`/description/${job?._id}`)}
              className="mt-4"
              variant="outline"
            >
              Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
