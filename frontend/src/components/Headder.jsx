import React from 'react';

const Header = () => (
  <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
    <div className="flex items-center gap-2">
      <img src="https://jishnutp.vercel.app/logo/jtp-logo.png" alt="Logo" className="h-8" />
      <h1 className="font-bold text-lg">Admin Console</h1>
    </div>
    <div className="flex items-center gap-4">
      <button className="text-sm">Support</button>
      <div className="relative">
        <button className="flex items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAMjQfOnVjs8CCD4-gLzDvZ0L6npZIUqTd1Q&s"
            alt="User Avatar"
            className="h-8 w-8 rounded-full"
          />
          <span className="ml-2">Jane</span>
        </button>
      </div>
    </div>
  </header>
);

export default Header;
