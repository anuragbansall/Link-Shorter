import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { AiOutlineHome } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { IoMdLink } from "react-icons/io";
import { IoAnalyticsSharp, IoSettingsOutline } from "react-icons/io5";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import Logo from "../../Components/Common/Logo";

function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);

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
    <main className="h-screen w-full flex overflow-hidden">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-5 md:hidden z-40">
        <Logo />

        <button
          onClick={() => setIsOpen(true)}
          className="text-3xl text-zinc-700 cursor-pointer"
        >
          <HiOutlineMenuAlt3 />
        </button>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-40 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <Logo />

          <button
            onClick={() => setIsOpen(false)}
            className="text-3xl text-zinc-700"
          >
            <HiOutlineX />
          </button>
        </div>

        <nav className="p-5 flex flex-col gap-3">
          {navLinks.map((link) => (
            <NavLink
              end
              key={link.name}
              to={link.link}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-3 rounded-xl text-lg font-medium transition-all ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-zinc-600 hover:bg-zinc-100"
                }`
              }
            >
              <span className="text-2xl">{link.icon}</span>
              {link.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex h-full w-72 border-r border-zinc-200 p-6 flex-col shrink-0">
        <Logo />

        <nav className="mt-8 flex flex-col gap-3">
          {navLinks.map((link) => (
            <NavLink
              end
              key={link.name}
              to={link.link}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-3 rounded-xl text-lg font-medium transition-all ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-zinc-600 hover:bg-zinc-100"
                }`
              }
            >
              <span className="text-2xl">{link.icon}</span>
              {link.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1 h-full overflow-auto pt-16 md:pt-0">
        <Outlet />
      </section>
    </main>
  );
}

export default DashboardLayout;
