// AdminJobsTable.jsx
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, Eye, ArrowUpDown } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortField, setSortField] = useState("title");
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return (
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  const toggleSort = (field) => {
    const newDirection =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);

    const sortedJobs = [...filterJobs].sort((a, b) => {
      const valueA = field === "title" ? a.title : a.company.name;
      const valueB = field === "title" ? b.title : b.company.name;

      if (newDirection === "asc") {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });

    setFilterJobs(sortedJobs);
  };

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableCaption className="text-gray-500 text-sm mt-4">
          {filterJobs?.length
            ? `Showing ${filterJobs.length} of ${allAdminJobs.length} jobs`
            : "No jobs found matching your filter"}
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-50 text-gray-600">
            <TableHead className="w-20 py-3">Logo</TableHead>
            <TableHead className="py-3">
              <button
                className="flex items-center focus:outline-none group"
                onClick={() => toggleSort("company")}
              >
                Company
                <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-600" />
              </button>
            </TableHead>
            <TableHead className="py-3">
              <button
                className="flex items-center focus:outline-none group"
                onClick={() => toggleSort("title")}
              >
                Role
                <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-600" />
              </button>
            </TableHead>
            <TableHead className="py-3">Date</TableHead>
            <TableHead className="text-right py-3">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                No jobs found matching your search
              </TableCell>
            </TableRow>
          )}

          {filterJobs?.map((job) => (
            <TableRow
              key={job._id}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <TableCell className="py-3">
                <Avatar className="h-10 w-10 rounded-md border border-gray-200">
                  <AvatarImage src={job.company?.logo} />
                  <AvatarFallback className="bg-blue-100 text-blue-700 rounded-md">
                    {job.company?.name?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="py-3 font-medium text-gray-900">
                {job.company?.name}
              </TableCell>
              <TableCell className="py-3 font-medium text-gray-900">
                {job.title}
              </TableCell>
              <TableCell className="py-3 text-gray-600">
                {new Date(job.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell className="text-right py-3">
                <Popover>
                  <PopoverTrigger>
                    <button className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                      <MoreHorizontal className="h-5 w-5 text-gray-500" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-2">
                    <div className="flex flex-col space-y-1">
                      <button
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-blue-600" />
                        <span>Edit Details</span>
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 transition-colors"
                      >
                        <Eye className="w-4 h-4 text-green-600" />
                        <span>View Applicants</span>
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
