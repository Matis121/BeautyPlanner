import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <section className="flex flex-col bg-slate-700 h-screen w-40 z-50">
        <div className="pt-3 pb-6 px-6 flex text-white">
          <a className="hover:cursor-pointer">WSTAW LOGO</a>
        </div>
        <div className="py-4 px-6 flex text-white">
          <Link to="/" className="hover:cursor-pointer">
            Pulpit
          </Link>
        </div>
        <div className="py-4 px-6 flex text-white">
          <Link to="/calendar" className="hover:cursor-pointer">
            Kalendarz
          </Link>
        </div>
        <div className="py-4 px-6 flex text-white">
          <Link to="/clients" className="hover:cursor-pointer">
            Klienci
          </Link>
        </div>
        <div className="py-4 px-6 flex text-white">
          <Link to="/services" className="hover:cursor-pointer">
            Usługi
          </Link>
        </div>
        <div className="py-4 px-6 flex text-white">
          <a className="hover:cursor-pointer">Raporty</a>
        </div>
        <div className="py-4 px-6 flex text-white">
          <a className="hover:cursor-pointer">Ustawienia</a>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
