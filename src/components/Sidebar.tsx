import React from "react";
import { Link } from "react-router-dom";
import {
  LuCalendarDays,
  LuUsers,
  LuWrench,
  LuLineChart,
  LuSettings,
} from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Sidebar = () => {
  return (
    <>
      <section className="flex flex-col justify-between items-center bg-gray-200 h-screen w-26 z-50 px-2 py-5">
        <Avatar className="shadow-md hover:cursor-pointer hover:shadow-xl hover:scale-105">
          <AvatarImage src="https://lh6.googleusercontent.com/-rHKzuuteqoc/AAAAAAAAAAI/AAAAAAAAAAA/fK12yfqT0TM/s44-w44-h44-p-k-no-ns-nd/photo.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <Link
            to="/calendar"
            className="py-4 flex flex-col justify-center items-center text-gray-700 hover:cursor-pointer hover:text-gray-500"
          >
            <LuCalendarDays size={28} />
            <span className="mt-1 font-normal text-xs">Kalendarz</span>
          </Link>
          <Link
            to="/clients"
            className="py-4 flex flex-col justify-center items-center text-gray-700 hover:cursor-pointer hover:text-gray-500"
          >
            <LuUsers size={28} />
            <span className="mt-1 font-normal text-xs">Klienci</span>
          </Link>
          <Link
            to="/services"
            className="py-4 flex flex-col justify-center items-center text-gray-700 hover:cursor-pointer hover:text-gray-500"
          >
            <LuWrench size={28} />
            <span className="mt-1 font-normal text-xs">Usługi</span>
          </Link>
          <Link
            to="/calendar"
            className="py-4 flex flex-col justify-center items-center text-gray-700 hover:cursor-pointer hover:text-gray-500"
          >
            <LuLineChart size={28} />
            <span className="mt-1 font-normal text-xs">Raporty</span>
          </Link>
        </div>
        <Link
          to="/calendar"
          className="flex flex-col justify-center items-center text-gray-700 hover:cursor-pointer hover:text-gray-500"
        >
          <LuSettings size={28} />
          <span className="mt-1 font-normal text-xs">Ustawienia</span>
        </Link>
      </section>
    </>
  );
};

export default Sidebar;
