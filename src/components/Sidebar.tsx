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
      <section className="flex flex-col justify-between bg-zinc-800 h-screen w-28 z-50">
        <div>
          <Link
            to="/calendar"
            className="py-4 flex flex-col justify-center items-center text-white hover:cursor-pointer hover:text-zinc-300"
          >
            <span className="mb-2 font-normal">Kalendarz</span>
            <LuCalendarDays size={25} />
          </Link>
          <Link
            to="/clients"
            className="py-4 flex flex-col justify-center items-center text-white hover:cursor-pointer hover:text-zinc-300"
          >
            <span className="mb-2 font-normal">Klienci</span>
            <LuUsers size={25} />
          </Link>
          <Link
            to="/services"
            className="py-4 flex flex-col justify-center items-center text-white hover:cursor-pointer hover:text-zinc-300"
          >
            <span className="mb-2 font-normal">Usługi</span>
            <LuWrench size={25} />
          </Link>
          <Link
            to="/calendar"
            className="py-4 flex flex-col justify-center items-center text-white hover:cursor-pointer hover:text-zinc-300"
          >
            <span className="mb-2 font-normal">Raporty</span>
            <LuLineChart size={25} />
          </Link>
        </div>
        <Link
          to="/calendar"
          className="py-4 flex flex-col justify-center items-center text-white hover:cursor-pointer hover:text-zinc-300"
        >
          <span className="mb-2 font-normal">Ustawienia</span>
          <LuSettings size={25} />
        </Link>
      </section>
    </>
  );
};

export default Sidebar;
