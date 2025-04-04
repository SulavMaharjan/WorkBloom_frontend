// CompaniesTable.jsx
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
import { Edit2, MoreHorizontal, ArrowUpDown } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const [sortDirection, setSortDirection] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  const toggleSort = () => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newDirection);

    const sortedCompanies = [...filterCompany].sort((a, b) => {
      if (newDirection === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setFilterCompany(sortedCompanies);
  };

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableCaption className="text-gray-500 text-sm mt-4">
          {filterCompany?.length
            ? `Showing ${filterCompany.length} of ${companies.length} companies`
            : "No companies found matching your filter"}
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-50 text-gray-600">
            <TableHead className="w-20 py-3">Logo</TableHead>
            <TableHead className="py-3">
              <button
                className="flex items-center focus:outline-none group"
                onClick={toggleSort}
              >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400 group-hover:text-gray-600" />
              </button>
            </TableHead>
            <TableHead className="py-3">Date</TableHead>
            <TableHead className="text-right py-3">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                No companies found matching your search
              </TableCell>
            </TableRow>
          )}

          {filterCompany?.map((company) => (
            <TableRow
              key={company._id}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <TableCell className="py-3">
                <Avatar className="h-10 w-10 rounded-md border border-gray-200">
                  <AvatarImage src={company.logo} />
                  <AvatarFallback className="bg-blue-100 text-blue-700 rounded-md">
                    {company.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="py-3 font-medium text-gray-900">
                {company.name}
              </TableCell>
              <TableCell className="py-3 text-gray-600">
                {new Date(company.createdAt).toLocaleDateString("en-US", {
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
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-blue-600" />
                        <span>Edit Details</span>
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

export default CompaniesTable;