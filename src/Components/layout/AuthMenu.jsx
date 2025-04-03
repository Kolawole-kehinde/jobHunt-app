import React from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const AuthMenu = ({ menuStyle, toggleMenu }) => {
  const { loading, handleLogout } = useAuth();
  return (
    <menu className={menuStyle}>
      <li>
        <Link to="/dashboard" onClick={toggleMenu}>
          Dashboard
        </Link>
      </li>
      <li>
        <button
          onClick={() => {
            handleLogout();
            toggleMenu();
          }}
        >
          {loading ? "Logging Out" : "Logout"}
        </button>
      </li>
      <Link
        to="jobs/jobcreation"
        className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded hover:shadow-md transition duration-300 flex items-center justify-center gap-1"
      >
        <FaEdit /> Post a Job
      </Link>
    </menu>
  );
};

export default AuthMenu;
