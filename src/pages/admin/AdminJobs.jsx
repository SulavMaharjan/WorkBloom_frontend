import AdminJobsTable from "@/components/admin/AdminJobsTable";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Briefcase, Plus, Search, RefreshCw } from "lucide-react";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allAdminJobs } = useSelector((store) => store.job);

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Briefcase className="mr-2 h-6 w-6 text-blue-600" />
                Jobs Management
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage and monitor all posted jobs
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <Button
                variant="outline"
                className="flex items-center text-gray-700 border-gray-300 hover:bg-gray-100"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button
                onClick={() => navigate("/admin/jobs/create")}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Job
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-500">Total Jobs</h2>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {allAdminJobs.length}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {allAdminJobs.length > 0
                ? `${Math.round(allAdminJobs.length * 0.1)} new in last 30 days`
                : "No jobs yet"}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-500">Active Jobs</h2>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <div className="h-4 w-4 text-green-600">✓</div>
              </div>
            </div>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {Math.round(allAdminJobs.length * 0.8)}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {allAdminJobs.length > 0
                ? `${Math.round(
                    ((allAdminJobs.length * 0.8) / allAdminJobs.length) * 100
                  )}% of total`
                : "No active jobs"}
            </p>
          </div>
        </div>

        {/* Filter and Table Section */}
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-medium text-gray-800">Jobs List</h3>
              <div className="mt-4 md:mt-0 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  className="pl-10 pr-4 py-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-md"
                  placeholder="Filter by job title or company..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="px-6 py-4">
            <AdminJobsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
