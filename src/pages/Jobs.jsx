import FilterCard from "@/components/Jobs/FilterCard";
import Job from "@/components/Jobs/Job";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        // Check if the query matches any of the standard fields
        const matchesStandardFields =
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase());

        // Check for salary range match
        let matchesSalary = false;
        if (searchedQuery.includes("to")) {
          const [minStr, maxStr] = searchedQuery
            .split("to")
            .map((s) => s.trim());
          const min = parseInt(minStr);
          const max = parseInt(maxStr);

          if (!isNaN(min) && !isNaN(max)) {
            const jobSalary = parseInt(job.salary) || 0;
            matchesSalary = jobSalary >= min && jobSalary <= max;
          }
        }

        return matchesStandardFields || matchesSalary;
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="w-[900px] pt-10 pl-[150px]">
        <h1 className="font-bold text-3xl pb-2">Kickstart Your Career</h1>
        <p className="text-m w-auto text-gray-600">
          Ready to take the next step in your career? Explore a range of
          exciting job opportunities and find the perfect fit for your skills
          and aspirations. Your future starts here!
        </p>
      </div>
      <div className="max-w-7xl mx-auto mt-4">
        <div className="flex gap-10">
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            {filterJobs.length <= 0 ? (
              <span className="text-center block">Job not found</span>
            ) : (
              <div className="flex flex-col gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          <div className="w-[300px]">
            <FilterCard />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;
