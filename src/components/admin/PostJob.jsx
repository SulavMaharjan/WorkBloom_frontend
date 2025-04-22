import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2, Briefcase } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const SelectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() == value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validations
    const salaryNumber = parseFloat(input.salary);
    const experienceNumber = parseFloat(input.experience);
    const positionNumber = parseInt(input.position);

    if (isNaN(salaryNumber) || salaryNumber <= 0) {
      toast.error("Salary must be a positive number.");
      return;
    }
    if (isNaN(experienceNumber) || experienceNumber < 0) {
      toast.error("Experience level must be a non-negative number.");
      return;
    }
    if (isNaN(positionNumber) || positionNumber <= 0) {
      toast.error("Number of positions must be greater than 0.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                <Briefcase className="h-5 w-5" />
              </div>
              <h1 className="text-lg font-medium text-gray-800">
                Post New Job
              </h1>
            </div>
          </div>

          <form onSubmit={submitHandler} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-gray-700">Title</Label>
                <Input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={changeEventHandler}
                  placeholder="Job title"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Job description"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Requirements</Label>
                <Input
                  type="text"
                  name="requirements"
                  value={input.requirements}
                  onChange={changeEventHandler}
                  placeholder="Required skills/qualifications"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Salary</Label>
                <Input
                  type="text"
                  name="salary"
                  value={input.salary}
                  onChange={changeEventHandler}
                  placeholder="Salary range"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Location</Label>
                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  placeholder="Job location"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Job Type</Label>
                <Input
                  type="text"
                  name="jobType"
                  value={input.jobType}
                  onChange={changeEventHandler}
                  placeholder="Full-time, Part-time, etc."
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Experience Level</Label>
                <Input
                  type="text"
                  name="experience"
                  value={input.experience}
                  onChange={changeEventHandler}
                  placeholder="Required experience"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Number of Positions</Label>
                <Input
                  type="number"
                  name="position"
                  value={input.position}
                  onChange={changeEventHandler}
                  placeholder="0"
                />
              </div>

              {companies.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-gray-700">Company</Label>
                  <Select onValueChange={SelectChangeHandler}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>COMPANIES</SelectLabel>
                        {companies.map((company) => (
                          <SelectItem
                            key={company._id}
                            value={company?.name?.toLowerCase()}
                          >
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="mt-8">
              {loading ? (
                <Button className="w-full" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting Job...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={companies.length === 0}
                >
                  Post New Job
                </Button>
              )}

              {companies.length === 0 && (
                <p className="mt-3 text-sm text-red-600 font-medium text-center">
                  *Please register a company first before posting a job*
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
