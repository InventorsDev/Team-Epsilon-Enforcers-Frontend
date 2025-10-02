import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Show loader while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="inline-block h-8 w-8 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
          <p className="text-gray-600 text-sm">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If no user is logged in, redirect to login
  if (!user) {
    navigate("/", { replace: true });
    return null;
  }

  // If user is logged in, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
