import React from "react";
import { Facebook, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-5">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-6">
          {/* Branding */}
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl font-bold">WorkBloom</h2>
            <p className="mt-2 text-gray-400">
              Connecting talent with opportunity, one job at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/3 flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="text-gray-400 space-y-1">
              <li>
                <a href="#" className="hover:text-white">
                  Find Jobs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  For Employers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-4 mt-2">
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm mt-6 border-t border-gray-700 pt-4">
          © {new Date().getFullYear()} WorkBloom. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
