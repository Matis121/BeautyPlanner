import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import NotivicationBar from "../components/NotivicationBar";

const BasicLayout = ({ children }) => {
  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full bg-neutral-100">
        <NotivicationBar />
        {children}
        <Toaster />
      </div>
    </div>
  );
};

export default BasicLayout;
