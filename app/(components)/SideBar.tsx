"use client";

import { Menu } from "lucide-react";
import React from "react";

const SideBar = () => {
  return (
    <div>
      <div className="flex gap-3 justify-between md:justify-normal items-center pt-8">
        <div>logo</div>
        <h1 className="font-extrabold text-2xl">Asventory</h1>

        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100 transition-all duration-200 ease-in-out"
          onClick={() => {}}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-grow mt-8"></div>

      <div>
        <p className="text-center text-xs text-gray-500">
          &copy; 2024 Asventory
        </p>
      </div>
    </div>
  );
};

export default SideBar;
