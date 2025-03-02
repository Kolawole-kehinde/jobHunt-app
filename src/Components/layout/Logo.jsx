import React from 'react'
import { NavLink } from 'react-router'

const Logo = (toggleMenu) => {
  return (
    <>
        <h1 className="text-3xl font-semibold" onClick={toggleMenu}>
          <NavLink to="/">JobHunt</NavLink>
        </h1>
    </>
  )
}

export default Logo
