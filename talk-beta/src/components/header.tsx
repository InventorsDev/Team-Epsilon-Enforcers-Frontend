import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="w-full px-6 py-0 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-white"
          >
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line
              x1="12"
              x2="12"
              y1="19"
              y2="22"
            />
            <line
              x1="8"
              x2="16"
              y1="22"
              y2="22"
            />
          </svg>
        </div>
        <span className="text-lg font-semibold text-blue-600">Talk Beta</span>
      </div>
      <Link
        to={"/login"}
        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white hover:text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:scale-95"
      >
        Log In
      </Link>
    </header>
  );
}
