"use client";

import React, { memo, useEffect } from "react";

import StoreProvider, { useAppSelector } from "../redux";
import SideBar from "./SideBar";
import NavBar from "./NavBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div
      className={`${
        isDarkMode ? "dark" : "light"
      } flex bg-gray-50 text-gray-900 w-full min-h-screen`}
    >
      <SideBar />
      <main
        className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${
          isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
        }`}
      >
        <NavBar />
        {children}
      </main>
    </div>
  );
};

const DashboardLayoutWithStore = (props: DashboardLayoutProps) => (
  <StoreProvider>
    <DashboardLayout {...props} />
  </StoreProvider>
);

export default memo(DashboardLayoutWithStore);
