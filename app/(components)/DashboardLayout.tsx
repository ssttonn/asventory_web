"use client";

import React, { memo } from "react";
import NavBar from "@/app/(components)/NavBar";
import SideBar from "@/app/(components)/SideBar";
import StoreProvider from "../redux";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className={`light flex bg-gray-50 text-gray-900 w-full min-h-screen`}>
      <SideBar />
      <main className="flex flex-col w-full h-full py-7 px-9 bg-gray-50 md:pl-24">
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
