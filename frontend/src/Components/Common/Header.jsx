import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import Button from "./Button";
import Logo from "./Logo";
import useUser from "../../hooks/useUser";
import useLogout from "../../hooks/useLogout";
import UserMenu from "./UserMenu";

const navLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Dashboard",
    link: "/dashboard",
  },
];

function Header() {
  const { data: user, isLoading, isError } = useUser();
  const logoutMutation = useLogout();

  const navigate = useNavigate();

  return (
    <header className="w-full max-w-300 rounded-xl shadow-[0_8px_10px_rgba(0,0,0,0.25)] shadow-zinc-100 mx-auto py-5 px-6 flex items-center justify-between sticky top-6 bg-zinc-50/80 z-50 backdrop-blur-md">
      <Logo />

      <nav className="hidden md:flex items-center gap-6 text-zinc-700 font-medium">
        {navLinks.map((link) => (
          <NavLink
            to={link.link}
            className={({ isActive }) =>
              `text-lg hover:text-blue-500 duration-200 ${isActive ? "text-blue-500" : ""}`
            }
          >
            {link.title}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        {!user?.data ? (
          <>
            <Button isPrimary={false} onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button isPrimary={true} onClick={() => navigate("/register")}>
              Register
            </Button>
          </>
        ) : (
          <UserMenu user={user} logoutMutation={logoutMutation} />
        )}
      </div>
    </header>
  );
}

export default Header;
