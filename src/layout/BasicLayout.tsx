import NotivicationBar from "@/components/NotivicationBar";
import Sidebar from "@/components/Sidebar";
import React from "react";

const BasicLayout = ({ children }) => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex flex-col w-full">
        <NotivicationBar />
        {children}
      </div>
    </div>
  );
};

export default BasicLayout;
