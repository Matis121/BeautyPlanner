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
            <LuCalendarDays size={25} />
            <span className="mb-2 font-normal">Kalendarz</span>
          </Link>
          <Link
            to="/clients"
            className="py-4 flex flex-col justify-center items-center text-white hover:cursor-pointer hover:text-zinc-300"
          >
            <LuUsers size={25} />
            <span className="mb-2 font-normal">Klienci</span>
          </Link>
          <Link
            to="/services"
            className="py-4 flex flex-col justify-center items-center text-white hover:cursor-pointer hover:text-zinc-300"
          >
            <LuWrench size={25} />
            <span className="mb-2 font-normal">Usługi</span>
          </Link>
          <Link
            to="/calendar"
            className="py-4 flex flex-col justify-center items-center text-white hover:cursor-pointer hover:text-zinc-300"
          >
            <LuLineChart size={25} />
            <span className="mb-2 font-normal">Raporty</span>
          </Link>
        </div>
        <Link
          to="/calendar"
          className="py-4 flex flex-col justify-center items-center text-white hover:cursor-pointer hover:text-zinc-300"
        >
          <LuSettings size={25} />
          <span className="mb-2 font-normal">Ustawienia</span>
        </Link>
      </section>
    </>
  );
};

export default Sidebar;
