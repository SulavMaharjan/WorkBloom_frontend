import FilterCard from "@/components/Jobs/FilterCard";
import Job from "@/components/Jobs/Job";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-10">
        <div className="flex gap-10">
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            {jobsArray.length <= 0 ? (
              <span className="text-center block">Job not found</span>
            ) : (
              <div className="flex flex-col gap-4">
                {jobsArray.map((item, index) => (
                  <div>
                    <Job />
                  </div>
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
