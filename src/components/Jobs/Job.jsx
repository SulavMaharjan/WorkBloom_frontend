import React from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const Job = () => {
  const navigate = useNavigate();
  const jobId = "yoysafdasfaye";

  return (
    <div className="p-5 m-5 rounded-md shadow-xl bg-[#F6F7FA] border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex gap-4">
        <div>
          <button className="p-6" variant="outline" >
            <Avatar className="w-[80px] h-[80px]">
              <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
            </Avatar>
          </button>
        </div>

        <div className="flex flex-col">
          <div>
            <div>
              <h1 className="font-medium text-lg">Company Name</h1>
              <p className="text-sm text-gray-400">Nepal</p>
            </div>
            <h1 className="font-bold text-lg my-2">Title</h1>
            <p className="text-sm text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
              quas earum voluptas nulla odio quod provident odit enim aliquam
              consequatur?
            </p>
          </div>

          <div className="flex justify-between">
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
            <div className="flex items-center gap-4 mt-4">
              <Button
                onClick={() => navigate(`/description/${jobId}`)}
                variant="outline"
              >
                Details
              </Button>
              <Button className="bg-[#4174F5]">Apply</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
