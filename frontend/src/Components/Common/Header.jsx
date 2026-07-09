import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import Button from "./Button";
import Logo from "./Logo";
import useUser from "../../hooks/useUser";
import useLogout from "../../hooks/useLogout";
import Avatar from "./Avatar";
import { HoveredLink, Menu, MenuItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";

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
  const [active, setActive] = useState(false);

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
          <>
            <Menu setActive={setActive} className={cn("bg-transparent p-0")}>
              <MenuItem
                setActive={setActive}
                active={active}
                item={
                  <Avatar className="text-2xl cursor-pointer">
                    {user?.data?.username?.charAt(0)?.toUpperCase() || "U"}
                  </Avatar>
                }
              >
                <div className="flex flex-col space-y-4 text-sm">
                  <Button
                    onClick={() => {
                      console.log("Logout clicked");
                      logoutMutation.mutate();
                    }}
                  >
                    Logout
                  </Button>
                  <HoveredLink href="/dashboard/settings">Profile</HoveredLink>
                </div>
              </MenuItem>
            </Menu>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
