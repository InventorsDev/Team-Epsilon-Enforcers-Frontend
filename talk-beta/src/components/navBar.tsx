import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { Mic } from "lucide-react";
import logo from "../assets/logo.png";

const NavBar = () => {
  return (
    <>
      {/* Navigation Header */}
      <header className="bg-white border-b border-gray-200">
        <div>
          <div className="flex items-center justify-between h-16 ">
            <div className="flex items-center space-x-2">
              {/* <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Mic className="w-3 h-3 text-primary-foreground" />
                </div> */}
              <img
                src={logo}
                alt="logo"
                className="w-16"
              />

              <span
                className="text-lg font-extrabold text-blue-600 -ml-8"
                style={{ fontFamily: "Borel, cursive" }}
              >
                Talk Beta
              </span>
            </div>
            <div className="flex items-center space-x-8">
              <nav className="hidden md:flex space-x-8 text-sm">
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-bold"
                      : "text-gray-600 hover:text-gray-900"
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/dashboard/practice-area"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-bold"
                      : "text-gray-600 hover:text-gray-900"
                  }
                >
                  Practice Area
                </NavLink>
                <NavLink
                  to="/dashboard/view-analysis"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-bold"
                      : "text-gray-600 hover:text-gray-900"
                  }
                >
                  View Analysis
                </NavLink>
                <NavLink
                  to="/dashboard/practice-page"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-bold"
                      : "text-gray-600 hover:text-gray-900"
                  }
                >
                  Practice Page
                </NavLink>
                <NavLink
                  to="/dashboard/learning-resources"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-bold"
                      : "text-gray-600 hover:text-gray-900"
                  }
                >
                  Learning Resources
                </NavLink>
                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-bold"
                      : "text-gray-600 hover:text-gray-900"
                  }
                >
                  Profile
                </NavLink>
              </nav>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Sign Out</Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
