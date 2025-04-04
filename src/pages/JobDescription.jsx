import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { setSingleJob } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant == user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      console.log(res.data);

      if (res.data.success) {
        setIsApplied(true); //Update local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); //real time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant == user?._id
            )
          ); //Ensure that the state is in sync with the fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div>
      <Navbar />
      {/* Header */}
      <div className="text-center pb-4">
        <div className="bg-[#F4F5F7] h-32 flex items-center justify-center gap-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            {singleJob?.title}
            <span className="text-gray-500 text-sm">
              ({singleJob?.jobType})
            </span>
          </h1>
          <h2 className="text-lg font-semibold text-gray-700">
            - Krafters Technology Pvt. Ltd.
          </h2>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#4174F5] hover:bg-[#485f9b] "
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>

          <Button className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-md">
            Bookmark
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-10  p-8">
        {/* Job Details */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">
            Minimum Qualification: <span className="font-normal">Bachelor</span>
          </h2>
          <h2 className="text-lg font-semibold">
            Experience:
            <span className="font-normal">
              {singleJob?.experienceLevel} years
            </span>
          </h2>
          <h2 className="text-lg font-semibold">
            Location: <span className="font-normal">{singleJob?.location}</span>
          </h2>
          <h2 className="text-lg font-semibold">
            Salary:
            <span className="font-normal">{singleJob?.salary} USD</span>
          </h2>
          <h2 className="text-lg font-semibold">
            Total Applicants :
            <span className="font-normal">
              {singleJob?.applications?.length}
            </span>
          </h2>
          <h2 className="text-lg font-semibold">
            Posted Date :
            <span className="font-normal">
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </h2>
        </div>

        {/* Job Description */}
        <div className="mt-6 border-t pt-4">
          <h2 className="text-xl font-bold">Job Description:</h2>
          <p className="text-gray-700 mt-2">{singleJob?.description}</p>
        </div>

        {/* Requirements */}
        <div className="mt-6 border-t pt-4">
          <h2 className="text-xl font-bold"> Job Requirements:</h2>
          <ul className="list-disc pl-6 text-gray-700 mt-2">
            <li>{singleJob?.requirements}</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobDescription;
