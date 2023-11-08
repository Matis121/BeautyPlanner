import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LuChevronDown, LuUser } from "react-icons/lu";

const NotivicationBar = () => {
  // USER DATA
  const userToken = localStorage.getItem("user");
  const userData = JSON.parse(userToken).username;

  // LOGOUT
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="flex justify-end bg-background w-full py-4 px-8 border-b">
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
