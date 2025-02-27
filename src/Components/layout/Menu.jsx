import React from 'react'
import { routes } from '../../constant/navRoute'
import { Link, NavLink } from 'react-router'
import { FaEdit } from 'react-icons/fa'

const Menu = ({menuStyle}) => {
    const active = (isActive) => {
        return isActive ? "text-yellow-500" : "text-white";
      };
  return (
    <>
        <menu className={menuStyle}>
             {routes.map(({ name, path, id }) => (
              <li key={id}>
                  <NavLink
              to={path}
              className={({ isActive }) => active(isActive)}
            >
              {name}
            </NavLink>
              </li>
          ))}
          <Link
            to="jobs/create"
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded hover:shadow-md transition duration-300 flex items-center justify-center gap-1"
          >
            <FaEdit /> Post a Job
          </Link>
          </menu>
          
    </>
  )
}

export default Menu
