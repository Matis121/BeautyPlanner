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
  const userToken: string | any = localStorage.getItem("user") ?? "";
  const userData = JSON.parse(userToken).username;

  // WRAP MENU CONTEXT
  const { setWrapMenu, wrapMenu }: any = useContext(WrapMenuContext);
  const { setToggleMobileMenu, toggleMobileMenu }: any =
    useContext(MobileMenuContext);

  // CHECK WIDTH
  const isMobile = window.innerWidth <= 768;

  // LOGOUT
  const handleLogout = async () => {
    localStorage.removeItem("user");
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/logout`;
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
          className="flex items-center gap-1 text-gray-600 text-md hover:text-gray-400 transition-all"
        >
          {wrapMenu ? (
            <LuPanelLeftOpen size={22} />
          ) : (
            <LuPanelLeftClose size={22} />
          )}
          {wrapMenu ? "Rozwiń" : "Zwiń"}
        </button>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center hover:text-gray-500 transition-all">
          <p className="flex items-center">
            <span className="">
              <LuUser size={20} className="mr-1" />
            </span>
            {userData}
          </p>{" "}
          <LuChevronDown size={15} className="ml-1" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={handleLogout}
            className="hover:cursor-pointer"
          >
            Wyloguj się
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default NotivicationBar;
