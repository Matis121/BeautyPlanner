import { Link } from "react-router-dom";

const NotivicationBar = () => {
  return (
    <nav className="flex justify-between bg-background w-full py-3 px-4 border-b">
      <Link
        to="/"
        className="text-blue-500 font-semibold uppercase hover:cursor-pointer"
      >
        SCHEDUSKY
      </Link>
      <p>Moje konto</p>
    </nav>
  );
};

export default NotivicationBar;