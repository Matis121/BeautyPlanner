import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WrapMenuContext } from "@/Contexts/WrapMenuContext";
import { MobileMenuContext } from "@/Contexts/MobileMenuContext";
import { useContext } from "react";

import {
  LuChevronDown,
  LuUser,
  LuAlignJustify,
  LuPanelLeftClose,
  LuPanelLeftOpen,
} from "react-icons/lu";

const NotivicationBar = () => {
  // USER DATA
  const userToken = localStorage.getItem("user");
  const userData = JSON.parse(userToken).username;

  // WRAP MENU CONTEXT
  const { setWrapMenu, wrapMenu } = useContext(WrapMenuContext);
  const { setToggleMobileMenu, toggleMobileMenu } =
    useContext(MobileMenuContext);

  // CHECK WIDTH
  const isMobile = window.innerWidth <= 768;

  // LOGOUT
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between bg-background w-full py-4 px-8 border-b">
      {isMobile ? (
        <LuAlignJustify
          size={24}
          onClick={() => setToggleMobileMenu(!toggleMobileMenu)}
          className="text-gray-500"
        />
      ) : (
        <button
          onClick={() => setWrapMenu(!wrapMenu)}
          className="flex items-center gap-1 logo font-semibold"
        >
          {wrapMenu ? (
            <LuPanelLeftOpen size={25} />
          ) : (
            <LuPanelLeftClose size={25} />
          )}
          {wrapMenu ? "Rozwiń" : "Zwiń"}
        </button>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center">
          <p className="flex items-center">
            <span className="purple">
              <LuUser size={20} className="mr-1" />
            </span>
            {userData}
          </p>{" "}
          <LuChevronDown size={15} className="ml-1" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleLogout}>
            Wyloguj się
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default NotivicationBar;
