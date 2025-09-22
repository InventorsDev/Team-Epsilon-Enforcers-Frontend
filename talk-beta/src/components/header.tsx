import { Button } from "@/components/ui/button";
import frame from "../assets/Frame.svg";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="w-full px-6 py-8 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <img src={frame} alt="" className="h-5" />
        <span
          className="text-lg font-extrabold text-blue-600"
          style={{ fontFamily: "Borel, cursive" }}
        >
          Talk Beta
        </span>
      </div>
      <Link to="/login">
        <Button className="bg-blue-600 hover:bg-blue-700">Log In</Button>
      </Link>
    </header>
  );
}
