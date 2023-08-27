import NotivicationBar from "@/components/NotivicationBar";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { Toaster } from "@/components/ui/toaster";

const BasicLayout = ({ children }) => {
  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full">
        <NotivicationBar />
        {children}
        <Toaster />
      </div>
    </div>
  );
};

export default BasicLayout;
