import { NavLink } from "react-router-dom";
import {
  LuCalendarRange,
  LuUsers,
  LuWrench,
  LuSettings,
  LuX,
} from "react-icons/lu";
import { useContext } from "react";
import { WrapMenuContext } from "@/Contexts/WrapMenuContext";
import { MobileMenuContext } from "@/Contexts/MobileMenuContext";

const Sidebar = () => {
  const { wrapMenu } = useContext(WrapMenuContext);
  const { setToggleMobileMenu, toggleMobileMenu } =
    useContext(MobileMenuContext);

  const isMobile = window.innerWidth <= 768;

  return (
    <>
      {isMobile ? (
        <nav
          className={`absolute z-9999 bg-zinc-900 flex flex-col justify-between h-screen z-10 py-4 border-r border-gray-200 w-48 px-4 items-start transition-all ${
            toggleMobileMenu ? "ml-0" : "-ml-52"
          }`}
        >
          <button className="absolute right-3 top-3">
            <LuX
              className=" text-gray-300"
              size={28}
              onClick={() => setToggleMobileMenu(!toggleMobileMenu)}
            />
          </button>
          <div className={`flex flex-col gap-6 items-start mt-8`}>
            <p className="logo font-semibold text-xl mb-4">BeautyPlanner</p>
            <p className="text-xs font-bold uppercase text-gray-400 transition-all">
              Wizyty
            </p>
            <NavLink
              to="/calendar"
              className="flex justify-center items-center text-gray-300 hover:cursor-pointer hover:text-gray-400 transition-all"
              onClick={() => setToggleMobileMenu(!toggleMobileMenu)}
            >
              <LuCalendarRange size={25} className="mr-3" />
              <span className={`font-normal block`}>Kalendarz</span>
            </NavLink>
            <NavLink
              to="/clients"
              className="flex justify-center items-center text-gray-300 hover:cursor-pointer hover:text-gray-400 transition-all"
              onClick={() => setToggleMobileMenu(!toggleMobileMenu)}
            >
              <LuUsers size={25} className="mr-3" />
              <span className={`font-normal block`}>Klienci</span>
            </NavLink>
            <NavLink
              to="/services"
              className="flex justify-center items-center text-gray-300 hover:cursor-pointer hover:text-gray-400 transition-all"
              onClick={() => setToggleMobileMenu(!toggleMobileMenu)}
            >
              <LuWrench size={25} className="mr-3" />
              <span className={`font-normal block`}>Usługi</span>
            </NavLink>
          </div>
          <NavLink
            to="/settings"
            className="flex justify-center items-center text-gray-300 hover:cursor-pointer hover:text-gray-400 transition-all"
            onClick={() => setToggleMobileMenu(!toggleMobileMenu)}
          >
            <LuSettings size={25} className="mr-3" />
            <span className={`font-normal block`}>Ustawienia</span>
          </NavLink>
        </nav>
      ) : (
        <nav
          className={`bg-zinc-900 flex flex-col justify-between h-screen z-10 py-4 border-r border-gray-200 transition-all ${
            wrapMenu ? "w-18 px-2 items-center " : "w-48 px-4 items-start"
          }`}
        >
          <div
            className={`flex flex-col gap-6 ${
              wrapMenu ? "items-center" : "items-start"
            }`}
          >
            <p className="logo font-semibold text-xl mb-4">
              {wrapMenu ? "BP" : "BeautyPlanner"}
            </p>
            <p className="text-xs font-bold uppercase text-gray-400 transition-all">
              Wizyty
            </p>
            <NavLink
              to="/calendar"
              className="flex justify-center items-center text-gray-300 hover:cursor-pointer hover:text-gray-400 transition-all"
            >
              <LuCalendarRange
                size={25}
                className={`${wrapMenu ? "" : "mr-3"}`}
              />
              <span className={`font-normal ${wrapMenu ? "hidden" : "block"}`}>
                Kalendarz
              </span>
            </NavLink>
            <NavLink
              to="/clients"
              className="flex justify-center items-center text-gray-300 hover:cursor-pointer hover:text-gray-400 transition-all"
            >
              <LuUsers size={25} className={`${wrapMenu ? "" : "mr-3"}`} />
              <span className={`font-normal ${wrapMenu ? "hidden" : "block"}`}>
                Klienci
              </span>
            </NavLink>
            <NavLink
              to="/services"
              className="flex justify-center items-center text-gray-300 hover:cursor-pointer hover:text-gray-400 transition-all"
            >
              <LuWrench size={25} className={`${wrapMenu ? "" : "mr-3"}`} />
              <span className={`font-normal ${wrapMenu ? "hidden" : "block"}`}>
                Usługi
              </span>
            </NavLink>
          </div>
          <NavLink
            to="/settings"
            className="flex justify-center items-center text-gray-300 hover:cursor-pointer hover:text-gray-400 transition-all"
          >
            <LuSettings size={25} className={`${wrapMenu ? "" : "mr-3"}`} />
            <span className={`font-normal ${wrapMenu ? "hidden" : "block"}`}>
              Ustawienia
            </span>
          </NavLink>
        </nav>
      )}
    </>
  );
};

export default Sidebar;
