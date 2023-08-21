import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotivicationBar = () => {
  return (
    <nav className="flex justify-between bg-background w-full py-4 px-4 border-b">
      <Link
        to="/"
        className="text-sky-500 font-bold uppercase hover:cursor-pointer"
      >
        SCHEDUSKY
      </Link>
      <p>Moje konto</p>
    </nav>
  );
};

export default NotivicationBar;
