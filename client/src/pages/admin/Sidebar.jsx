/* eslint-disable react/prop-types */
import { useState } from "react";
import { ChartNoAxesColumn, SquareLibrary, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/admin/dashboard", icon: ChartNoAxesColumn, label: "Dashboard" },
    { to: "/admin/courses", icon: SquareLibrary, label: "Courses" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-16 left-2 z-50 lg:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar for large screens and up */}
      <div className="hidden  lg:flex flex-col w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-lg transition-all duration-300 ease-in-out min-h-screen">
        <SidebarContent navItems={navItems} location={location} />
      </div>

      {/* Sidebar for medium screens and below */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-lg transition-all duration-300 ease-in-out transform lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent navItems={navItems} location={location} />
      </div>

      {/* Overlay for medium screens and below */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

const SidebarContent = ({ navItems, location }) => (
  <div className="p-5">
    <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
    <nav className="space-y-2">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200",
            "hover:bg-gray-100 dark:hover:bg-gray-700",
            location.pathname === item.to
              ? "bg-primary text-white"
              : "text-gray-600 dark:text-gray-300"
          )}
        >
          <item.icon size={20} />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  </div>
);

export default Sidebar;
