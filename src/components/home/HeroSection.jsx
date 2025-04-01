import React, { useState } from "react";
import Orange from "../../assets/images/OrangeRectangle.png";
import Blue from "../../assets/images/BlueRectangle.png";
import employee from "../../assets/images/Employee.png";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div>
      <div className="flex  w-full justify-between pt-4">
        <div className="leftSection w-1/2 ">
          <div className="relative">
            <img src={Orange} alt="" className="h-full w-full pt-2" />

            <div className="absolute top-56 left-10 flex flex-col gap-5 ">
              <div>
                <h1 className="font-bold text-4xl">WorkBloom -</h1>
                <h1 className="font-bold text-4xl">
                  Where talent meets opportunity!
                </h1>
              </div>
              <p className="w-11/12 text-xl">
                We connect job seekers with top employers, making career dreams
                a reality. Whether you're searching for your next role or the
                perfect candidate, we've got you covered!
              </p>
            </div>
          </div>
        </div>
        <div className="rightSection w-1/2 relative">
          <div className="flex justify-center pl-10">
            <img src={Blue} alt="" className=" w-[545px] h-[500px]" />
          </div>
          <img src={employee} alt="" className="absolute left-0 bottom-11" />
        </div>
      </div>
      <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
        <input
          type="text"
          placeholder="Find your dream jobs"
          onChange={(e) => setQuery(e.target.value)}
          className="outline-none border-none w-full"
        />
        <Button
          onClick={searchJobHandler}
          className="rounded-r-full bg-[#EA4C89]"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
