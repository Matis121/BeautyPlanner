import React from 'react';
import { Link } from "react-router-dom";

const Sidebar = () => {

  return (
    <>
        <section className='flex flex-col bg-slate-700 h-screen w-fit z-50'>
            <div className='py-8 px-4 flex items-center justify-center text-white'>
                <Link to="/" className='hover:cursor-pointer'>Home</Link>
            </div>
            <div className='py-8 px-4 flex items-center justify-center text-white'>
                <Link to="/calendar" className='hover:cursor-pointer'>Calendar</Link>
            </div>
            <div className='py-8 px-4 flex items-center justify-center text-white'>
                <Link to="/clients" className='hover:cursor-pointer'>Clients</Link>
            </div>
            <div className='py-8 px-4 flex items-center justify-center text-white'>
                <Link to="/services" className='hover:cursor-pointer'>Services</Link>
            </div>
            <div className='py-8 px-4 flex items-center justify-center text-white'>
                <a className='hover:cursor-pointer'>Settings</a>
            </div>
        </section>
    </>
  )
}

export default Sidebar;