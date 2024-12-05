"use client";

import { toggleSidebar } from "@/state";
import {
  Archive,
  ChevronsLeftIcon,
  CircleDollarSign,
  Clipboard,
  LayoutIcon,
  SlidersHorizontal,
  User,
} from "lucide-react";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import SideBarLink from "./SideBarLink";

const sideBarLinks = [
  {
    href: "/dashboard",
    icon: LayoutIcon,
    label: "Dashboard",
  },
  {
    href: "/products",
    icon: Archive,
    label: "Products",
  },
  {
    href: "/clipboard",
    icon: Clipboard,
    label: "Clipboard",
  },
  {
    href: "/users",
    icon: User,
    label: "Users",
  },
  {
    href: "/settings",
    icon: SlidersHorizontal,
    label: "Settings",
  },
  {
    href: "/expenses",
    icon: CircleDollarSign,
    label: "Expenses",
  },
];

const SideBar = () => {
  const dispatch = useAppDispatch();
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSideBar = useCallback(() => {
    dispatch(toggleSidebar());
  }, [dispatch]);

  const sideBarClassNames = `fixed flex flex-col ${
    isSideBarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-200 ease-in-out h-full overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sideBarClassNames}>
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSideBarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <div>logo</div>
        <h1
          className={`font-extrabold text-2xl ${
            isSideBarCollapsed ? "hidden" : "block"
          }`}
        >
          Asventory
        </h1>

        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100 transition-all duration-200 ease-in-out"
          onClick={() => {
            console.log("clicked");
            toggleSideBar();
          }}
        >
          <ChevronsLeftIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-grow mt-8">
        {sideBarLinks.map((link) => {
          return (
            <SideBarLink
              key={link.href}
              {...link}
              isCollapsed={isSideBarCollapsed}
            />
          );
        })}
      </div>

      <div className={`${isSideBarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">
          &copy; 2024 Asventory
        </p>
      </div>
    </div>
  );
};

export default SideBar;
