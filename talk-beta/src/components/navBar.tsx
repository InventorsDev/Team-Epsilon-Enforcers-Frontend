import { NavLink, Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import frame from "../assets/Frame.svg";
import { useAuth } from "@/context/AuthContext";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState } from "react";
import { Menu} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

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

  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/dashboard/practice-area", label: "Practice Area" },
    { to: "/dashboard/view-analysis", label: "View Analysis" },
    { to: "/dashboard/practice-page", label: "Practice Page" },
    { to: "/dashboard/learning-resources", label: "Learning Resources" },
    { to: "/dashboard/profile", label: "Profile" },
  ];

  return (
    <>
      {/* Navigation Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          {/* Logo */}
          <div className="flex items-center space-x-2" onClick={() => navigate("/dashboard")}>
            <img src={frame} alt="logo" className="h-5" />
            <span
              className="text-xl font-extrabold text-blue-600"
              style={{ fontFamily: "Borel, cursive" }}
            >
              Talk Beta
            </span>
            <VisuallyHidden>
              <div className="flex items-center justify-between h-16 ">
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => navigate("/dashboard")}
                >
                  <img src={frame} alt="logo" className="h-5" />
                  <span
                    className="text-lg font-extrabold text-blue-600"
                    style={{ fontFamily: "Borel, cursive" }}
                  >
                    Talk Beta
                  </span>
                </div>
              </div>
            </VisuallyHidden>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 text-sm">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-bold"
                    : "text-gray-600 hover:text-gray-900"
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
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
                {isSigningOut ? "Signing out" : "Sign Out"}
              </Button>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  className="p-2"
                >
                  <Menu className="h-6 w-6 text-gray-700" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-start mb-6 pl-4 pt-2 gap-4">
                    <img src={frame} alt="logo" className="h-5" />
                    <span
                      className="text-lg font-extrabold text-blue-600"
                      style={{ fontFamily: "Borel, cursive" }}
                    >
                      Talk Beta
                    </span>
                    {/* <SheetClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Close menu"
                      >
                        <X className="h-6 w-6 text-gray-700" />
                      </Button>
                    </SheetClose> */}
                  </div>
                  <nav className="flex flex-col space-y-4 text-sm pl-4">
                    {navLinks.map(({ to, label }) => (
                      <SheetClose asChild key={to}>
                        <NavLink
                          to={to}
                          end
                          className={({ isActive }) =>
                            isActive
                              ? "text-blue-600 font-bold"
                              : "text-gray-600 hover:text-gray-900"
                          }
                        >
                          {label}
                        </NavLink>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="mt-auto pt-6 border-t pl-4 pr-4">
                    {user ? (
                      <Button
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-60"
                      >
                        {isSigningOut ? "Signing out..." : "Sign Out"}
                      </Button>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <SheetClose asChild>
                          <Link to="/login">
                            <Button
                              variant="outline"
                              className="w-full border-border"
                            >
                              Log In
                            </Button>
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link to="/signup">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                              Sign Up
                            </Button>
                          </Link>
                        </SheetClose>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
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