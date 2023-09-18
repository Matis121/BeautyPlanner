import React from "react";
import { NavLink, NavNavLink } from "react-router-dom";
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
      <nav className="flex flex-col justify-between items-center bg-neutral-800 h-screen w-26 z-10 px-2 py-5">
        <div className="flex flex-col items-center">
          <Avatar className="shadow-md hover:cursor-pointer hover:shadow-xl hover:scale-105 mb-6">
            <AvatarImage src="https://lh6.googleusercontent.com/-rHKzuuteqoc/AAAAAAAAAAI/AAAAAAAAAAA/fK12yfqT0TM/s44-w44-h44-p-k-no-ns-nd/photo.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <NavLink
            to="/calendar"
            className="my-4 flex flex-col justify-center items-center text-white hover:cursor-pointer hover:text-gray-300"
          >
            <LuCalendarDays size={28} />
            <span className="mt-1 font-normal text-xs">Kalendarz</span>
          </NavLink>
          <NavLink
            to="/clients"
            className="my-4 flex flex-col justify-center items-center text-white hover:cursor-pointer hover:text-gray-300"
          >
            <LuUsers size={28} />
            <span className="mt-1 font-normal text-xs">Klienci</span>
          </NavLink>
          <NavLink
            to="/services"
            className="my-4 flex flex-col justify-center items-center text-white hover:cursor-pointer hover:text-gray-300"
          >
            <LuWrench size={28} />
            <span className="mt-1 font-normal text-xs">Usługi</span>
          </NavLink>
          {/* <NavLink
            to="/reports"
            className="my-4 flex flex-col justify-center items-center text-white hover:cursor-pointer hover:text-gray-300"
          >
            <LuLineChart size={28} />
            <span className="mt-1 font-normal text-xs">Raporty</span>
          </NavLink> */}
        </div>
        <NavLink
          to="/settings"
          className="flex flex-col justify-center items-center text-white hover:cursor-pointer hover:text-gray-300"
        >
          <LuSettings size={28} />
          <span className="mt-1 font-normal text-xs">Ustawienia</span>
        </NavLink>
      </nav>
    </>
  );
};

export default Sidebar;
