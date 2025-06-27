import React, { useEffect } from "react";
import logo from "../assets/img_logo.png";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js";
import axios from "axios";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isAdminn, setisAdminn] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

useEffect(() => {
  const token = localStorage.getItem("token")   ;
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // ✅ convert string to boolean
  setisAdminn(isAdmin);
  setToken(token);
}, []);

  return (
    <div
      className="flex justify-between items-center p-4 bg-gray-200 text-white
    py-6"
    >
      {/* img logo */}
      <img src={logo} alt="Logo" className="w-36 rounded-md" />

      <ul className="hidden sm:flex gap-4 text-black font-bold text-lg">
        {[
          { path: "/", label: "HOME" },
          { path: "/collection", label: "COLLECTION" },
          { path: "/about", label: "ABOUT" },
          { path: "/contact", label: "CONTACT" },
        ].map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${
                isActive ? "text-black" : "text-gray-500"
              }`
            }
          >
            <p>{label}</p>
            {/** Only show <hr> if active */}
            <hr
              className={`w-2/4 border-dotted h-[1.5px] transition-all duration-300 ${
                path === location.pathname ? "bg-gray-700" : "bg-transparent"
              }`}
            />
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => {
            setShowSearch(true);
            navigate("/collection");
          }}
          src={assets.search_icon}
          alt="search"
          className="w-6 h-6 cursor-pointer"
        />

        <div className="group relative">
          <img
            src={assets.profile_icon}
            alt=""
            onClick={() => (token ? null : navigate("/login"))}
            className="w-6 h-6 cursor-pointer"
          />
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5  bg-slate-100 text-gray-500 rounded">
                <Link
  to="/profile"
  className="cursor-pointer hover:text-black"
>
  My Profile
</Link>

                
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                 
                </p>
                {
                  isAdminn && (
                    <p
                      onClick={() => navigate("/admin")}
                      className="cursor-pointer hover:text-black"
                    >
                      Admin
                    </p>
                  )
                }
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        {/* <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" /> */}
      </div>

      {/*  sidebar */}
      <div className="sm:hidden">
        <GiHamburgerMenu
          className="text-2xl text-black"
          onClick={() => {
            setVisible(true);
          }}
        />
        {visible && (
          <div className="absolute top-0 right-0 h-auto w-2/3 bg-gray-200 flex  justify-between  gap-4 p-4">
            <ul className="flex flex-col  gap-4 text-black font-bold text-lg  pt-4">
              <NavLink to="/" className=" flex flex-col  gap-1">
                <p>HOME</p>
                <hr className="w-2/4 border-dotted  h-[1.5px] bg-gray-200 " />
              </NavLink>
              <NavLink to="/collection " className=" flex flex-col  gap-1">
                <p>COLLECTION</p>
                <hr className="w-2/4 border-dotted  h-[1.5px] bg-gray-200 " />
              </NavLink>
              <NavLink to="/about" className=" flex flex-col  gap-1">
                <p>ABOUT</p>
                <hr className="w-2/4 border-dotted  h-[1.5px] bg-gray-200 " />
              </NavLink>
              <NavLink className=" flex flex-col  gap-1" to="/contact">
                <p>CONTACT</p>
                <hr className="w-2/4 border-dotted  h-[1.5px] bg-gray-200 " />
              </NavLink>
            </ul>
            <div className="text-2xl text-black pt-4">
              <RxCross1 onClick={() => setVisible(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
