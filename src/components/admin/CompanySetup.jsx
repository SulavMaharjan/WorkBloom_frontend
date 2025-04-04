import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2, Building } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update company");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: singleCompany?.file || null,
    });
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          {/* Header Section */}
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => navigate("/admin/companies")}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 text-gray-700 border-gray-300 hover:bg-gray-100"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-blue-600" />
                  <h1 className="text-lg font-medium text-gray-800">
                    Company Setup
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={submitHandler} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-gray-700">Company Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  placeholder="Enter company name"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-gray-700">Website</Label>
                <Input
                  type="text"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                  placeholder="https://example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-gray-700">Location</Label>
                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  placeholder="Company location"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-gray-700">Company Logo</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={changeFileHandler}
                    className="cursor-pointer"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <Label className="text-gray-700">Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Brief description about your company"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              {loading ? (
                <Button disabled className="w-full md:w-auto">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                >
                  Update Company
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanySetup;