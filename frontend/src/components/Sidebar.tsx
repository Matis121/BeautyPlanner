import { NavLink } from "react-router-dom";
import {
  LuCalendarRange,
  LuUsers,
  LuWrench,
  LuLineChart,
  LuSettings,
} from "react-icons/lu";

const Sidebar = () => {
  return (
    <>
      <nav className="flex flex-col justify-between items-start h-screen w-48 z-10 px-4 py-5 border-r border-gray-200">
        <div className="flex flex-col items-start gap-6">
          <p className="logo font-semibold text-xl mb-4">BeautyPlanner</p>
          <p className="text-xs font-bold uppercase text-gray-500">Wizyty</p>
          <NavLink
            to="/calendar"
            className="flex justify-center items-center text-gray-400 hover:cursor-pointer hover:text-gray-500"
          >
            <LuCalendarRange size={25} className="mr-3" />
            <span className="font-normal">Kalendarz</span>
          </NavLink>
          <NavLink
            to="/clients"
            className="flex justify-center items-center text-gray-400 hover:cursor-pointer hover:text-gray-500"
          >
            <LuUsers size={25} className="mr-3" />
            <span className="font-normal">Klienci</span>
          </NavLink>
          <NavLink
            to="/services"
            className="flex justify-center items-center text-gray-400 hover:cursor-pointer hover:text-gray-500"
          >
            <LuWrench size={25} className="mr-3" />
            <span className="font-normal">Usługi</span>
          </NavLink>
        </div>
        <NavLink
          to="/settings"
          className="flex justify-center items-center text-gray-400 hover:cursor-pointer hover:text-gray-500"
        >
          <LuSettings size={25} className="mr-3" />
          <span className=" font-normal">Ustawienia</span>
        </NavLink>
      </nav>
    </>
  );
};

export default Sidebar;
