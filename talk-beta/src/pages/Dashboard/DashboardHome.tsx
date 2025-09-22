import NavBar from "@/components/navBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Book, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardHome() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("Alex"); // Placeholder for user's name
  useEffect(() => {
    // Fetch user data here and set the userName accordingly  
const authData = localStorage.getItem("sb-kklpfqtpnunievubcjxy-auth-token");
let name = "";
if (authData) {
  try {
    const parsed = JSON.parse(authData);
    name = parsed?.user?.user_metadata?.full_name;
    setUserName(name || "Alex");
  } catch (e) {
    console.error("Failed to parse the name from localStorage", e);
  }
}
  },[])

  return (
    <div className="min-h-screen">
      {/* Header Navigation */}
      <NavBar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="bg-blue-50 rounded-2xl p-12 text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome back, {userName.split(' ')[1]}!
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            "The journey of a thousand miles begins with a single step."
          </p>
          <Button
            onClick={() => {
              navigate("practice-area");
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 mx-auto"
          >
            <Mic className="w-5 h-5" />
            Quick Start Practice
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* New Practice Session Card */}
          <Card className="bg-blue-50 border-0 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <CardContent className="p-0 text-center">
              <div className="bg-blue-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Mic className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                New Practice Session
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Start a fresh session and get real-time feedback on your speech.
              </p>
              <Button
                onClick={() => {
                  navigate("practice-area");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg font-medium"
              >
                New Practice Session
              </Button>
            </CardContent>
          </Card>

          {/* Explore Exercises Card */}
          <Card className="bg-blue-50 border-0 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <CardContent className="p-0 text-center">
              <div className="bg-blue-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Book className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Explore Exercises
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Discover a variety of interactive exercises and speaking
                scenarios.
              </p>
              <Button
                onClick={() => {
                  navigate("practice-page");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg font-medium"
              >
                Explore Exercises
              </Button>
            </CardContent>
          </Card>

          {/* View Detailed Reports Card */}
          <Card className="bg-blue-50 border-0 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <CardContent className="p-0 text-center relative">
              <span className="absolute right-0 top-0 text-[9px]  rounded-full bg-orange-300 p-1">
                Coming soon
              </span>
              <div className="bg-blue-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                View Detailed Reports
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Analyze your progress over time with in-depth analytics and
                trends.
              </p>
              <Button
                disabled
                className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg font-medium"
              >
                View Detailed Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
