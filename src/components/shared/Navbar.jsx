import React from "react";
import logo from "../../assets/images/logo-workbloom.png";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";

const Navbar = () => {
  const user = false;
  return (
    <div className="bg-white h-16 w-full flex justify-between items-center px-8">
      <div className="leftNav ">
        <div className="h-12 w-12">
          <img src={logo} alt="" className="h-full w-full" />
        </div>
      </div>
      <div className="rightNav flex gap-12">
        <ul className="flex font-medium items-center justify-center gap-5">
          <li>Home</li>
          <li>Jobs</li>
          <li>Browse</li>
        </ul>

        {!user ? (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="outline">Login </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-blue-500 hover:bg-blue-300">Signup </Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex flex-col gap-5">
                <div className="flex gap-4 space-y-2 items-center">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h1 className="font-medium">Sulav Maharjan</h1>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex gap-3 text-gray-600 w-30 items-center">
                    <User2 />
                    <Button variant="link">View Profile</Button>
                  </div>
                  <div className="flex gap-3 text-gray-600 w-30 items-center">
                    <LogOut />
                    <Button variant="link">Logout</Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default Navbar;
