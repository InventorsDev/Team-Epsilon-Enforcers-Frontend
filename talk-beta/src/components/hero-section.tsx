import { Button } from "@/components/ui/button";
import humanBrainImage from "../assets/ai-human-brain.jpg";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="px-9 py-16 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 items-center">
        <div className="space-y-6 w-full text-left">
          <h1 className="text-4xl w-full lg:text-5xl font-bold text-black leading-tight text-balance">
            Your Journey to Fluent Speech Starts Here.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            AI-Powered fluency coach designed to help you practice, improve, and
            master fluency. Practice in real time, and unlock the power of your
            voice.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white hover:text-white font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:scale-95"
          >
            Get Started
          </Link>
        </div>
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-80 h-80 bg-white rounded-3xl border-4 border-foreground shadow-lg flex items-center justify-center">
              <img
                src={humanBrainImage}
                alt="AI Brain Visualization"
                width={524}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
