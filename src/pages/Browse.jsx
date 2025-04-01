import Job from "@/components/Jobs/Job";
import Navbar from "@/components/shared/Navbar";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "@/redux/jobSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// const randomJobs = [1, 2, 3, 4, 5, 6];

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto my-10">
        <h1 className="font-bold text-lg my-10">
          Search Results ({allJobs.length})
        </h1>
        <div>
          {allJobs.map((job) => {
            return <Job key={job._id} job={job} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
