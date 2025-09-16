
import NavBar from "@/components/navBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Square, Upload, Play } from "lucide-react";

export default function PracticeArea() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Header Navigation */}
      <NavBar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-10">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Practice Area: Real-time Speech Feedback
          </h1>
          <h2 className="text-lg text-gray-600">Practice Your Speech</h2>
        </div>

        {/* Two Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Panel - Recording Controls */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Ready to Speak?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Recording Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2 py-3">
                  <Mic className="w-4 h-4" />
                  <span>Start Recording</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-center space-x-2 py-3 bg-transparent"
                >
                  <Square className="w-4 h-4" />
                  <span>Stop Recording</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-center space-x-2 py-3 bg-transparent"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Audio</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-center space-x-2 py-3 bg-transparent"
                >
                  <Play className="w-4 h-4" />
                  <span>Replay Audio</span>
                </Button>
              </div>

              {/* Audio Waveform Visualization */}
              <div className="bg-gradient-to-r from-blue-500 via-[#5E6795] to-orange-500 rounded p-4 h-32 flex items-center justify-center">
                <div className="flex items-end space-x-1 h-20">
                  {/* Waveform bars */}
                  {Array.from({ length: 70 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-full opacity-80"
                      style={{
                        width: "3px",
                        height: `${Math.random() * 60 + 10}px`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Play className="w-4 h-4" />
                </Button>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "25%" }}
                  />
                </div>
                <span className="text-sm text-gray-600 font-mono">
                  0:25 / 1:30
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Right Panel - Practice Prompt */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Your Practice Prompt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search/Upload Input */}
              <Input
                placeholder="Upload or Search prompts..."
                className="w-full"
              />

              {/* Practice Text */}
              <Textarea
                value={`"Thank you for attending today. Public speaking is a crucial skill, often overlooked in our daily lives. Mastering it not only boosts your confidence but also enhances your ability to communicate effectively. Remember to articulate clearly, maintain eye contact, and vary your tone to keep your audience engaged. Practice regularly, and don't be afraid to make mistakes; they are part of the learning process. Vocal Ascent is here to support you every step of the way."`}
                readOnly
                className="min-h-[200px] text-gray-700 leading-relaxed resize-none"
              />
            </CardContent>
          </Card>
        </div>

        {/* See Results Button */}
        <div className="flex justify-end">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg flex items-center space-x-2">
            <Mic className="w-5 h-5" />
            <span>See Results</span>
          </Button>
        </div>
      </main>
    </div>
  );
}
