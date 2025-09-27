import NavBar from "@/components/navBar";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useLocation } from "react-router-dom";
import { BookmarkCheck, CirclePause, Gauge, Info, Megaphone, Smile, Sparkles, Volume2 } from "lucide-react";

export default function ViewAnalysis() {
  const location = useLocation();
  let analysisResult = location?.state?.analysis;
  if (!analysisResult) {
    const stored = localStorage.getItem("analysis_result");
    if (stored) {
      analysisResult = JSON.parse(stored);
    }
  }
  console.log(location?.state?.analysis);
  const fillerWords:any[] = analysisResult?.details?.filler_words_details?.words
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 justify-center items-center flex  gap-2">
            <span>Your Personalized Transcripts and Insights</span>
            <Tooltip>
              <TooltipTrigger>
                <span>
                  <Info size={14} />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  See exactly how you spoke, with real-time highlights on filler
                  words, pacing, and pronunciation. This transcript helps you
                  spot areas for improvement so you can track progress and grow
                  with each practice.
                </p>
              </TooltipContent>
            </Tooltip>
          </h1>
          <h2 className="text-xl text-gray-700">
            Speech Analysis and Feedback
          </h2>
        </div>

        {/* Transcript Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Your Transcript & Feedback
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              This is an example transcript of your speech. As you speak, the AI
              analyzes your delivery and provides real-time feedback. You can
              see how certain words or phrases are highlighted to indicate areas
              for improvement, such as filler words or pacing issues.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg">
              {/* <p className="text-gray-800 leading-relaxed">
                "Hello,{" "}
                <span className="bg-orange-200 px-1 rounded text-orange-800 font-medium">
                  um
                </span>
                , welcome to FluentAI. This platform is designed to help you
                improve your public speaking skills and build confidence. We
                focus on key areas like pronunciation, pacing, and overall
                fluency.{" "}
                <span className="bg-orange-200 px-1 rounded text-orange-800 font-medium">
                  Uh
                </span>
                , our intelligent system provides instant feedback to guide your
                progress."
              </p> */}
              {analysisResult?.transcript ? (
                <p className="text-gray-800 leading-relaxed">
                  {analysisResult.transcript
                    .split(" ")
                    .map((word: string, idx: number) => {
                      const isFiller = fillerWords?.includes(
                        word.replace(/[.,!?]/g, "")
                      );
                      return (
                        <span
                          key={idx}
                          className={
                            isFiller
                              ? "bg-orange-200 px-1 rounded text-orange-800 font-medium text-xs"
                              : ""
                          }
                        >
                          {word}
                        </span>
                      );
                    })
                    .reduce((prev: any, curr: any) => [prev, " ", curr])}
                </p>
              ) : (
                <p className="text-gray-800 leading-relaxed">
                  "Hello,{" "}
                  <span className="bg-red-200 px-1 rounded text-red-800 font-medium">
                    um
                  </span>
                  , welcome to Talk Beta. This platform is designed to help you
                  improve your public speaking skills and build confidence. We
                  focus on key areas like pronunciation, pacing, and overall
                  fluency.{" "}
                  <span className="bg-red-200 px-1 rounded text-red-800 font-medium">
                    Uh
                  </span>
                  , our intelligent system provides instant feedback to guide
                  your progress."
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Highlighted words (e.g.,</span>
              <span className="bg-orange-200 px-1 rounded text-orange-800 font-medium text-xs">
                um
              </span>
              <span>) indicate potential areas for improvement.</span>
            </div>
          </CardContent>
        </Card>

        {/* Real-time AI Feedback Section */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Detailed Perfomance Analsyis
            </h2>
            <Tooltip>
              <TooltipTrigger>
                <span>
                  <Info size={14} />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Here’s your performance across the key dimensions of effective
                  speaking. These insights give you clear, measurable goals to
                  help you communicate with confidence and impact.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Fluency */}
            <Card>
              <CardContent className="">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-700">Fluency</h3>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    Excellent
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={20} className="text-blue-600" />
                  <span className="text-2xl font-bold text-blue-600">
                    {analysisResult?.scores?.fluency ?? 85}%
                  </span>
                </div>
                <p className="text-sm text-left text-gray-600">
                  Smoothness and flow of speech.
                </p>
              </CardContent>
            </Card>

            {/* Pronunciation */}
            <Card>
              <CardContent className="">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-700">Pronunciation</h3>
                  <Badge
                    variant="secondary"
                    className="bg-yellow-100 text-yellow-800"
                  >
                    Good
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Megaphone size={20} className="text-blue-600" />
                  <span className="text-2xl font-bold text-blue-600">
                    {analysisResult?.scores?.pronunciation ?? 78}%
                  </span>
                </div>
                <p className="text-sm text-left text-gray-600">
                  Accuracy of sounds and words.
                </p>
              </CardContent>
            </Card>

            {/* Filler Words */}
            <Card>
              <CardContent className="">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-700">Filler Words</h3>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    Minimal
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Volume2 size={20} className="text-blue-600" />
                  <span className="text-2xl font-bold text-blue-600">
                    {analysisResult?.scores?.filler_words || 2} Words
                  </span>
                </div>
                <p className="text-sm text-left text-gray-600">
                  Count of "um", "uh", etc.
                </p>
              </CardContent>
            </Card>

            {/* Pacing */}
            <Card>
              <CardContent className="">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-700">Pacing</h3>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    Optimal
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Gauge size={20} className="text-blue-600" />
                  <span className="text-2xl font-bold text-blue-600">
                    {analysisResult?.scores?.pacing ?? 120} WPM
                  </span>
                </div>
                <p className="text-sm text-left text-gray-600">
                  Speaking speed.
                </p>
              </CardContent>
            </Card>

            {/* Confidence */}
            <Card>
              <CardContent className="">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-700">Confidence</h3>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    Strong
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Smile size={20} className="text-blue-600" />
                  <span className="text-2xl font-bold text-blue-600">
                    {" "}
                    {((analysisResult?.details?.confidence ?? 1) * 10).toFixed(
                      1
                    )}
                    /10
                  </span>
                </div>
                <p className="text-sm text-left text-gray-600">
                  Tone and vocal delivery.
                </p>
              </CardContent>
            </Card>

            {/* Pauses */}
            <Card>
              <CardContent className="">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-700">Pauses</h3>
                  <Badge
                    variant="secondary"
                    className="bg-yellow-100 text-yellow-800"
                  >
                    Good
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <CirclePause size={20} className="text-blue-600" />
                  <span className="text-2xl font-bold text-blue-600">
                    {analysisResult?.details?.pauses ?? 5}%
                  </span>
                </div>
                <p className="text-sm text-left text-gray-600">
                  Frequency and duration of breaks in speech.
                </p>
              </CardContent>
            </Card>

            {/* Words per minute */}
            <Card>
              <CardContent className="">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-700">
                    Words per minute
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    Great
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Gauge size={20} className="text-blue-600" />
                  <span className="text-2xl font-bold text-blue-600">
                    {analysisResult?.details?.wpm ?? 140}
                  </span>
                </div>
                <p className="text-sm text-left text-gray-600">
                  Rate of speech delivery.
                </p>
              </CardContent>
            </Card>

            {/* Word error rate */}
            <Card>
              <CardContent className="">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-700">Word error rate</h3>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    Excellent
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <BookmarkCheck size={20} className="text-blue-600" />
                  <span className="text-2xl font-bold text-blue-600">
                    {analysisResult?.details?.wer ?? 2}%
                  </span>
                </div>
                <p className="text-sm text-left text-gray-600">
                  Accuracy of spoken words.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
