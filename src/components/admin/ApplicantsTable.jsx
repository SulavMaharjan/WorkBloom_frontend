// ApplicantsTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableCaption className="text-gray-500 text-sm mt-4">
          A list of your recently applied users
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-50 text-gray-600">
            <TableHead className="py-3">FullName</TableHead>
            <TableHead className="py-3">Email</TableHead>
            <TableHead className="py-3">Contact</TableHead>
            <TableHead className="py-3">Resume</TableHead>
            <TableHead className="py-3">Date</TableHead>
            <TableHead className="text-right py-3">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <TableRow
                key={item._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <TableCell className="py-3">
                  {item?.applicant?.fullname}
                </TableCell>
                <TableCell className="py-3">{item?.applicant?.email}</TableCell>
                <TableCell className="py-3">
                  {item?.applicant?.phoneNumber}
                </TableCell>
                <TableCell className="py-3">
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 hover:text-blue-800"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>N/A</span>
                  )}
                </TableCell>
                <TableCell className="py-3">
                  {item?.applicant?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right py-3">
                  <Popover>
                    <PopoverTrigger>
                      <button className="p-1 rounded-full hover:bg-gray-200">
                        <MoreHorizontal className="h-5 w-5 text-gray-500" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-32 p-2">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          onClick={() => statusHandler(status, item?._id)}
                          key={index}
                          className="flex items-center px-3 py-2 text-sm rounded hover:bg-gray-100 cursor-pointer"
                        >
                          <span>{status}</span>
                        </div>
                      ))}
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

export default ApplicantsTable;
