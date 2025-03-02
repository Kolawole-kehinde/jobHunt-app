import { Link, NavLink } from "react-router";
import { routes } from "../../constant/navRoute";
import { FaEdit } from "react-icons/fa";
import { TbMenuDeep } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import Logo from "./Logo";
import Menu from "./Menu";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu)
    
  }
  return (
    <header className="bg-blue-900 text-white p-4 relative">
      <nav className="container mx-auto flex justify-between items-center">
        <Logo />
        <button className="lg:hidden block">
          <TbMenuDeep fontSize={30} onClick={toggleMenu}/>
          </button>
          <Menu menuStyle={"items-center gap-4 lg:flex hidden"}/>
        
      </nav>

      {/* NavBar Mobile Responsive */}
       {
        showMenu && (
          <nav className="fixed inset-0 z-40 h-[400px] w-full bg-blue-900 p-5 space-y-5">
             <div className="flex justify-between items-center">
             <Logo toggleMenu={toggleMenu}/>
             <button onClick={toggleMenu}>
            <IoClose fontSize={30}/>
            </button>
             </div>

            <Menu menuStyle="space-y-5 gap-6" toggleMenu={toggleMenu}/>
          </nav>
        )}
       
    </header>
  );
};

export default NavBar;
