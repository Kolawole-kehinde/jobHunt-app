import React from 'react';
import { routes } from '../../constant/navRoute';
import {NavLink } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import AuthMenu from './AuthMenu';

const Menu = ({ menuStyle, toggleMenu }) => {
  const active = (isActive) => {
    return isActive ? "text-yellow-500" : "text-white";
  };

  const { user} = useAuth();
  return (
    <menu className={menuStyle}>
      {user ? (
       <AuthMenu  menuStyle={menuStyle} toggleMenu={toggleMenu}/>
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
