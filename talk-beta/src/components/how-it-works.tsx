import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AImic from "../assets/ai-mic.jpg";
import recordPrompt from "../assets/record-prompt.jpg";
import cubeImage from "../assets/cube-image.jpg";
import feedback from "../assets/feedback.jpg";

export function HowItWorksSection() {
  return (
    <section className="px-9 py-16 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
        How It Works
      </h2>

      <div className="space-y-20">
        {/* Upload a Prompt */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
              <img
                src={recordPrompt}
                alt="Professional microphone for voice recording"
                width={320}
                height={240}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6 text-left">
            <h3 className="text-2xl font-bold text-foreground">
              Upload a Prompt
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Simply upload or enter your speech prompt. This helps the app
              tailor feedback to your specific script, ensuring your practice
              session feels realistic and relevant.
            </p>
            <Link to="/signup">
              <Button
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Record Your Voice */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <h3 className="text-2xl font-bold text-foreground">
              Record Your Voice
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Easily record your voice directly in the app or upload audio files
              in formats like WAV, MP3, or M4A.
            </p>
            <Link to="/signup">
              <Button
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
              >
                Get Started
              </Button>
            </Link>
          </div>
          <div className="flex justify-center">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
              <img
                src={AImic}
                alt="Professional microphone for voice recording"
                width={320}
                height={240}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* AI-Powered Processing */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center lg:order-first">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
              <img
                src={cubeImage}
                alt="AI-powered processing visualization"
                width={320}
                height={240}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="space-y-6 text-left">
            <h3 className="text-2xl font-bold text-foreground">
              AI-Powered Processing
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Once uploaded, your files are securely stored in the cloud and
              processed instantly. Using advanced AI models, your speech is
              analyzed and transcribed within seconds, while our FastAPI-powered
              backend ensures smooth, low-latency performance.
            </p>
            <Link to="/signup">
              <Button
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Instant Feedback */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <h3 className="text-2xl font-bold text-foreground">
              Instant Feedback
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Receive accurate transcripts along with insights on clarity,
              filler words, and pacing. You can also track your progress over
              time, helping you see how your speaking skills improve with every
              session.
            </p>
            <Link to="/signup">
              <Button
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
              >
                Get Started
              </Button>
            </Link>
          </div>
          <div className="flex justify-center">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
              <img
                src={feedback}
                alt="Professional microphone for voice recording"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
          Why This Matters
        </h2>

        {/* Upload a Prompt */}
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          <div className="space-y-6 text-left shadow-lg transition-shadow p-5 rounded-xl">
            <h3 className="text-2xl font-semibold text-foreground">
              For Creators
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Helps you polish your delivery before going live so you can engage
              your audience with confidence.
            </p>
            <Link to="/signup">
              <Button
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
              >
                Get Started
              </Button>
            </Link>
          </div>

          <div className="space-y-6 text-left shadow-lg transition-shadow p-5 rounded-xl">
            <h3 className="text-2xl font-semibold text-foreground">
              For Professionals
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Powerful tool to refine your clarity and impact in pitches and
              presentations, by cutting down on filler words and improving
              pacing.
            </p>
            <Link to="/signup">
              <Button
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
              >
                Get Started
              </Button>
            </Link>
          </div>

          <div className="space-y-6 text-left shadow-lg transition-shadow p-5 rounded-xl">
            <h3 className="text-2xl font-semibold text-foreground">
              For Students
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A personal coach that guides you toward becoming a more fluent and
              articulate speaker, building confidence.
            </p>
            <Link to="/signup">
              <Button
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
