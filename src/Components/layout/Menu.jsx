import React from 'react';
import { routes } from '../../constant/navRoute';
import { Link, NavLink } from 'react-router';
import { FaEdit } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

const Menu = ({ menuStyle, toggleMenu }) => {
  const active = (isActive) => {
    return isActive ? "text-yellow-500" : "text-white";
  };

  const { user } = useAuth();
  return (
    <menu className={menuStyle}>
      {user ? (
        <div>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <button>Logout</button>
          </li>
          <Link
        to="jobs/create"
        className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded hover:shadow-md transition duration-300 flex items-center justify-center gap-1"
      >
        <FaEdit /> Post a Job
      </Link>
        </div>
      ) : (
        routes.map(({ name, path, id }) => (
          <li key={id}>
            <NavLink
              to={path}
              className={({ isActive }) => active(isActive)}
              onClick={toggleMenu}
            >
              {name}
            </NavLink>
          </li>
        ))
      )}
     
    </menu>
  );
};

export default Menu;
