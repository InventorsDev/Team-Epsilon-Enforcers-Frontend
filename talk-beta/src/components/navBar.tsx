import { NavLink, Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import frame from "../assets/Frame.svg";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const NavBar = () => {
  const { user, supabase } = useAuth();
  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignOut = async () => {
    setErrorMessage(null);
    setIsSigningOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setErrorMessage(error.message);
        return;
      }
      navigate("/login");
    } catch (err) {
      setErrorMessage((err as Error).message);
    } finally {
      setIsSigningOut(false);
    }
  };

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
              <img src={frame} alt="logo" className="h-5" />

              <span
                className="text-lg font-extrabold text-blue-600 "
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
            {user ? (
              <Button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 disabled:opacity-60"
              >
                {isSigningOut && (
                  <span
                    className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"
                    aria-hidden="true"
                  />
                )}
                {isSigningOut ? "Signing out..." : "Sign Out"}
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="outline" className="border-border">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      {errorMessage && (
        <div className="px-4 py-2 text-sm text-red-700 bg-red-50 border-t border-red-200">
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default NavBar;
