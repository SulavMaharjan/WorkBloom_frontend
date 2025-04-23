import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { toast } from "sonner";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Bookmark, Contact } from "lucide-react";

const BookmarkedJobs = () => {
  const { user } = useSelector((store) => store.auth);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookmarkedJobs = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/bookmarks`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setBookmarkedJobs(res.data.bookmarkedJobs);
        }
      } catch (error) {
        console.log("Error fetching bookmarked jobs:", error);
        toast.error("Failed to load bookmarked jobs");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchBookmarkedJobs();
    }
  }, [user?._id]);

  const handleRemoveBookmark = async (jobId) => {
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/bookmark/${jobId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        // Update local state to remove the unbookmarked job
        setBookmarkedJobs((prev) => prev.filter((job) => job._id !== jobId));
        toast.success("Job removed from bookmarks");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to remove bookmark");
    }
  };

  if (loading) {
    return <div></div>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto flex gap-20 p-6">
        <div className="w-1/3 bg-gray-50 p-5 h-fit">
          <h2 className="font-semibold text-lg mb-4">Profile Options</h2>
          <div className="flex justify-center items-center py-6">
            <Avatar className="h-28 w-28 border-3 border-gray-300 shadow-md">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>
          </div>
          <ul className="space-y-3 text-gray-700">
            <li
              className={`flex items-center gap-2 w-full h-10 p-2 cursor-pointer ${
                location.pathname === "/profile"
                  ? "bg-[#7BBCB0] text-white"
                  : "hover:bg-gray-50 hover:text-gray-700"
              }`}
              onClick={() => navigate("/profile")}
            >
              <Contact className="w-5 h-5" /> Profile Information
            </li>
            <li
              className={`flex items-center gap-2 w-full h-10 p-2 cursor-pointer ${
                location.pathname === "/bookmarked"
                  ? "bg-[#7BBCB0] text-white"
                  : "hover:bg-gray-50 hover:text-gray-700"
              }`}
              onClick={() => navigate("/bookmarked")}
            >
              <Bookmark className="w-5 h-5" /> Bookmarked
            </li>
          </ul>
        </div>
        <div className="max-w-7xl mx-auto p-4 w-3/4">
          <h1 className="text-3xl font-bold mb-8">Your Bookmarked Jobs</h1>

          {bookmarkedJobs.length === 0 ? (
            <div className="text-center py-[72px]">
              <p className="text-gray-600">
                You haven't bookmarked any jobs yet.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {bookmarkedJobs.map((job) => (
                <div
                  key={job._id}
                  className="border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        {job.title}
                        <span className="text-gray-500 text-sm">
                          ({job.jobType})
                        </span>
                      </h2>
                      <p className="text-gray-700 mt-1">{job.companyName}</p>
                      <div className="mt-3 space-y-1">
                        <p className="text-gray-600">
                          <span className="font-semibold">Location:</span>
                          {job.location}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Salary:</span>
                          {job.salary} USD
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Experience:</span>
                          {job.experienceLevel} years
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveBookmark(job._id);
                      }}
                      variant="destructive"
                      className="ml-4"
                    >
                      Remove Bookmark
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookmarkedJobs;
