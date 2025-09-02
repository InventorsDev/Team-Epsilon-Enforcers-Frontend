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
          <Button
            variant="outline"
            asChild
            className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
          >
            <Link to="/signup">Get Started</Link>
          </Button>
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
