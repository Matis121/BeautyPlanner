import React from "react";
import { Link } from "react-router-dom";
import {
  LuCalendarDays,
  LuUsers,
  LuWrench,
  LuLineChart,
  LuSettings,
} from "react-icons/lu";

const Sidebar = () => {
  return (
    <>
      <section className="flex flex-col justify-between bg-zinc-800 h-screen w-26 z-50 px-2">
        <div>
          <Link
            to="/calendar"
            className="py-4 flex flex-col justify-center items-center text-white hover:cursor-pointer hover:text-zinc-300"
          >
            <LuCalendarDays size={25} />
            <span className="mt-1 font-normal text-sm">Kalendarz</span>
          </Link>
          <Link
            to="/clients"
            className="py-4 flex flex-col justify-center items-center text-white hover:cursor-pointer hover:text-zinc-300"
          >
            <LuUsers size={25} />
            <span className="mt-1 font-normal text-sm">Klienci</span>
          </Link>
          <Link
            to="/services"
            className="py-4 flex flex-col justify-center items-center text-white hover:cursor-pointer hover:text-zinc-300"
          >
            <LuWrench size={25} />
            <span className="mt-1 font-normal text-sm">Usługi</span>
          </Link>
          <Link
            to="/calendar"
            className="py-4 flex flex-col justify-center items-center text-white hover:cursor-pointer hover:text-zinc-300"
          >
            <LuLineChart size={25} />
            <span className="mt-1 font-normal text-sm">Raporty</span>
          </Link>
        </div>
        <Link
          to="/calendar"
          className="py-4 flex flex-col justify-center items-center text-white hover:cursor-pointer hover:text-zinc-300"
        >
          <LuSettings size={25} />
          <span className="mt-1 font-normal text-sm">Ustawienia</span>
        </Link>
      </section>
    </>
  );
};

export default Sidebar;
