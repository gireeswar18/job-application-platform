import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 text-blue-600 bg-slate-200 px-4">
      <header>
        <nav className="flex flex-wrap items-center justify-between p-4">
          <h3
            className="font-bold text-2xl company-name cursor-pointer"
            onClick={() => navigate("/home")}
          >
            Jobify
          </h3>

          <button className="md:hidden text-blue-600" onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>

          <div
            className={`${
              menuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            } w-full overflow-hidden transition-all duration-300 ease-in-out md:flex md:items-center md:w-auto md:opacity-100 md:max-h-full`}
          >
            <ul className="flex flex-col mt-4 md:flex-row md:mt-0 md:space-x-8">
              <li>
                <p
                  className="block py-2 text-blue-600 hover:text-blue-400 font-semibold cursor-pointer"
                  onClick={() => navigate("/search")}
                >
                  Search
                </p>
              </li>
              <li>
                <p
                  className="block py-2 text-blue-600 hover:text-blue-400 font-semibold cursor-pointer"
                  onClick={() => navigate("/post")}
                >
                  Post a job
                </p>
              </li>
              <li>
                <p
                  className="block py-2 text-blue-600 hover:text-blue-400 font-semibold cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </p>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
