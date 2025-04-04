import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { Building } from "lucide-react";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Please enter a company name");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        {
          companyName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to create company");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 p-6">
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <Building className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Create New Company
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  What would you like to name your company? You can change this later.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-gray-700 font-medium">Company Name</Label>
              <Input
                type="text"
                className="mt-2"
                placeholder="e.g. JobHunt, Microsoft, etc."
                onChange={(e) => setCompanyName(e.target.value)}
                value={companyName}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-6">
              <Button
                variant="outline"
                className="text-gray-700 border-gray-300 hover:bg-gray-100"
                onClick={() => navigate("/admin/companies")}
              >
                Cancel
              </Button>
              <Button 
                onClick={registerNewCompany}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isLoading || !companyName.trim()}
              >
                {isLoading ? "Creating..." : "Continue"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;