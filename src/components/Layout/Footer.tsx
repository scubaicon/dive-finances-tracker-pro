
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">PM</span>
            </div>
            <div>
              <p className="font-semibold">ProMaster Dive Center</p>
              <p className="text-gray-400 text-sm">Financial Management System</p>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} ProMaster Dive Center. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Built for XAMPP • Secure • Reliable
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
