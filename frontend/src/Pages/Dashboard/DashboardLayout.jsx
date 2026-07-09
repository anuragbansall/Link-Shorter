import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { AiOutlineHome } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { IoMdLink } from "react-icons/io";
import { IoAnalyticsSharp } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import Logo from "../../Components/Common/Logo";

function DashboardLayout() {
  const navLinks = [
    {
      name: "Home",
      link: "/dashboard",
      icon: <AiOutlineHome />,
    },
    {
      name: "Create Link",
      link: "/dashboard/create-link",
      icon: <FaPlus />,
    },
    {
      name: "My Links",
      link: "/dashboard/my-links",
      icon: <IoMdLink />,
    },
    {
      name: "Analytics",
      link: "/dashboard/analytics",
      icon: <IoAnalyticsSharp />,
    },
    {
      name: "Settings",
      link: "/dashboard/settings",
      icon: <IoSettingsOutline />,
    },
  ];

  return (
    <main className="h-screen w-full flex">
      <div className="h-full w-1/6 border-r border-zinc-200 p-6 shrink-0 hidden md:flex flex-col">
        <Logo />

        <nav className="mt-8 flex flex-col gap-4">
          {navLinks.map((link) => (
            <NavLink
              end
              key={link.name}
              to={link.link}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 rounded-xl gap-4 text-lg font-medium transition-colors ${
                  isActive
                    ? "text-blue-600 bg-blue-500/10"
                    : "text-zinc-500 hover:text-zinc-700"
                }`
              }
            >
              <span className="text-2xl">{link.icon}</span>
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <section className="w-full h-full overflow-auto">
        <Outlet />
      </section>
    </main>
  );
}

export default DashboardLayout;
