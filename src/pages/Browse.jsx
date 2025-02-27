import Job from "@/components/Jobs/Job";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const randomJobs = [1, 2, 3, 4, 5, 6];

const Browse = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto my-10">
        <h1 className="font-bold text-lg my-10">
          Search Results ({randomJobs.length})
        </h1>
        <div>
          {randomJobs.map((item, index) => {
            return <Job />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
