import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import React from "react";

const JobDescription = () => {
  const isApplied = false; // Change as needed
  return (
    <div>
      <Navbar />
      {/* Header */}
      <div className="text-center pb-4">
        <div className="bg-[#F4F5F7] h-32 flex items-center justify-center gap-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Laravel Developer
            <span className="text-gray-500 text-sm">(Full Time)</span>
          </h1>
          <h2 className="text-lg font-semibold text-gray-700">
            - Krafters Technology Pvt. Ltd.
          </h2>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <Button
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
            Experience: <span className="font-normal">2 years</span>
          </h2>
          <h2 className="text-lg font-semibold">
            Location: <span className="font-normal">San Francisco, USA</span>
          </h2>
          <h2 className="text-lg font-semibold">
            Salary Range:
            <span className="font-normal">$105,000 - $150,000</span>
          </h2>
          <h2 className="text-lg font-semibold">
            Total Applicants : <span className="font-normal">4</span>
          </h2>
          <h2 className="text-lg font-semibold">
            Posted Date : <span className="font-normal">17-07-2024</span>
          </h2>
        </div>

        {/* Job Description */}
        <div className="mt-6 border-t pt-4">
          <h2 className="text-xl font-bold">Job Description:</h2>
          <p className="text-gray-700 mt-2">
            We are searching for a Laravel developer to build web applications
            for our company. In this role, you will design and create projects
            using Laravel framework and PHP, and assist the team in delivering
            high-quality applications, services, and tools for our business.
          </p>
        </div>

        {/* Requirements */}
        <div className="mt-6 border-t pt-4">
          <h2 className="text-xl font-bold">Laravel Developer Requirements:</h2>
          <ul className="list-disc pl-6 text-gray-700 mt-2">
            <li>
              A degree in programming, computer science, or a related field.
            </li>
            <li>
              Experience working with PHP, performing unit testing, and managing
              APIs such as REST.
            </li>
            <li>A solid understanding of application design using Laravel.</li>
            <li>Knowledge of database design and querying using SQL.</li>
            <li>Proficiency in HTML and JavaScript.</li>
            <li>Practical experience using the MVC architecture.</li>
            <li>Strong communication and problem-solving skills.</li>
          </ul>
        </div>

        {/* Responsibilities */}
        <div className="mt-6 border-t pt-4">
          <h2 className="text-xl font-bold">Responsibilities:</h2>
          <ul className="list-disc pl-6 text-gray-700 mt-2">
            <li>
              Discussing project aims with the client and development team.
            </li>
            <li>Designing and building web applications using Laravel.</li>
            <li>
              Troubleshooting issues in the implementation and debug builds.
            </li>
            <li>Ensuring that integrations run smoothly.</li>
            <li>Maintaining web-based applications.</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobDescription;
