import React from 'react'
import { NavLink } from 'react-router'

const Logo = () => {
  return (
    <>
        <h1 className="text-3xl font-semibold">
          <NavLink to="/">JobHunt</NavLink>
        </h1>
    </>
  )
}

export default Logo
