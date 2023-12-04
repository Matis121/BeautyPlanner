import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import NotivicationBar from "../components/NotivicationBar";

const BasicLayout = ({ children }) => {
  // CHECK WIDTH
  const isMobile = window.innerWidth <= 768;

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full bg-gray-100">
        <NotivicationBar />
        <div className={`flex w-full ${isMobile ? "px-2 py-4" : "p-6"}`}>
          {children}
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default BasicLayout;
