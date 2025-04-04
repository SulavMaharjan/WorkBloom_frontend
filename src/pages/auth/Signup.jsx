import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { setLoading } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SignupCartoon from "../../assets/images/SignUpCartoon.png";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center h-full pt-6 pb-16 px-4">
        <div className="w-full max-w-6xl bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Illustration Section */}
          <div className="w-full md:w-1/2 bg-blue-50 p-8 flex items-center justify-center hidden md:flex">
            <div className="max-w-md">
              <img
                src={SignupCartoon}
                alt="Person working on laptop"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <div className="max-w-md mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Sign up</h1>

              <form onSubmit={submitHandler} className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 block mb-2">
                    Full Name
                  </Label>
                  <Input
                    type="text"
                    value={input.fullname}
                    name="fullname"
                    onChange={changeEventHandler}
                    placeholder="Your Full Name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 block mb-2">
                    Email
                  </Label>
                  <Input
                    type="email"
                    value={input.email}
                    name="email"
                    onChange={changeEventHandler}
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 block mb-2">
                    Phone Number
                  </Label>
                  <Input
                    type="text"
                    value={input.phoneNumber}
                    name="phoneNumber"
                    onChange={changeEventHandler}
                    placeholder="Your Phone Number"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 block mb-2">
                    Password
                  </Label>
                  <Input
                    type="password"
                    value={input.password}
                    name="password"
                    onChange={changeEventHandler}
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <Label className="text-sm font-medium text-gray-700 block mb-2">
                      Account Type
                    </Label>
                    <RadioGroup className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Input
                          type="radio"
                          name="role"
                          value="user"
                          checked={input.role === "user"}
                          onChange={changeEventHandler}
                          className="cursor-pointer mr-2"
                          id="role-user"
                        />
                        <Label
                          htmlFor="role-user"
                          className="text-sm text-gray-600 cursor-pointer"
                        >
                          User
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Input
                          type="radio"
                          name="role"
                          value="admin"
                          checked={input.role === "admin"}
                          onChange={changeEventHandler}
                          className="cursor-pointer mr-2"
                          id="role-admin"
                        />
                        <Label
                          htmlFor="role-admin"
                          className="text-sm text-gray-600 cursor-pointer"
                        >
                          Admin
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex-1">
                    <Label className="text-sm font-medium text-gray-700 block mb-2">
                      Profile Picture
                    </Label>
                    <Input
                      accept="image/*"
                      type="file"
                      onChange={changeFileHandler}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                    />
                  </div>
                </div>

                {loading ? (
                  <Button className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating account...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all"
                  >
                    Sign up
                  </Button>
                )}
              </form>

              <p className="mt-8 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
