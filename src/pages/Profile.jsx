import AppliedJobTable from "@/components/Profile/AppliedJobTable";
import UpdateProfileDialog from "@/components/Profile/UpdateProfileDialog ";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { Contact, Mail, Pen, Bookmark, FileText } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

// const skills = ["html", "css", "javascript", "mongodb"];
const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto flex gap-20 p-6">
        {/* Sidebar */}
        <div className="w-1/3 bg-gray-50 p-5 h-fit">
          <h2 className="font-semibold text-lg mb-4">Profile Options</h2>
          <div className="flex justify-center items-center py-6">
            <Avatar className="h-28 w-28 border-3 border-gray-300 shadow-md">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>
          </div>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-2 w-full h-10 p-2 cursor-pointer hover:bg-[#7BBCB0] hover:text-white ">
              <Contact className="w-5 h-5" /> Profile Information
            </li>
            <li className="flex items-center gap-2 w-full h-10 p-2 cursor-pointer hover:bg-[#7BBCB0] hover:text-white">
              <Bookmark className="w-5 h-5" /> Bookmarked
            </li>
          </ul>
        </div>

        {/* Main Profile Section */}
        <div className="w-3/4">
          <div className="bg-gray-50 border border-gray-200 rounded-sm p-8 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="font-semibold text-2xl pb-3">
                  {user?.fullname}
                </h1>
                <p className="text-gray-600">{user?.profile?.bio}</p>
              </div>

              <Button
                onClick={() => setOpen(true)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
                variant="outline"
              >
                <Pen className="w-5 h-5" />
              </Button>
            </div>
            <div className="my-6 space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="text-gray-500" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Contact className="text-gray-500" />
                <span>{user?.phoneNumber}</span>
              </div>
            </div>
            <div className="my-4">
              <h1 className="text-lg font-semibold">Skills</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                {user?.profile?.skills.length !== 0 ? (
                  user?.profile?.skills.map((item, index) => (
                    <Badge
                      key={index}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-[#FF764A] hover:text-white"
                    >
                      {item}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-500">N/A</span>
                )}
              </div>
            </div>
          </div>

          {/* Add auto-apply status badge */}
          <div className="my-4">
            <h1 className="text-lg font-semibold">Auto-Apply Status</h1>
            <Badge
              className={`mt-2 ${
                user?.profile?.autoApply ? "bg-green-500" : "bg-gray-500"
              }`}
            >
              {user?.profile?.autoApply ? "Enabled" : "Disabled"}
            </Badge>
            {user?.profile?.autoApply && (
              <p className="text-sm text-gray-500 mt-1">
                We'll automatically apply to jobs matching your skills
              </p>
            )}
          </div>

          {/* Resume Section */}
          <div className="bg-gray-50 border border-gray-200 rounded-sm p-6 shadow-lg mt-5">
            <h1 className="font-bold text-xl mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" /> Resume
            </h1>
            {isResume ? (
              <a
                target="_blank"
                href={user?.profile?.resume}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span className="text-gray-500">N/A</span>
            )}
          </div>

          {/* Applied Jobs Section */}
          <div className="bg-gray-50 rounded-sm shadow-sm p-6 my-5">
            <h1 className="font-bold text-xl mb-4">Applied Jobs</h1>
            <AppliedJobTable />
          </div>
        </div>
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
      <Footer />
    </div>
  );
};

export default Profile;
