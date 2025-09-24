import NavBar from "@/components/navBar";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useLocation } from "react-router-dom";

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
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            View Analysis: Real-time Speech Feedback
          </h1>
          <h2 className="text-xl text-gray-700">
            Speech Analysis and Feedback
          </h2>
        </div>

        {/* Transcript Section */}
        <Card className="mb-8">
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
              <p className="text-gray-800 leading-relaxed">
                {analysisResult.transcript}
              </p>
            </div>

            {/* <p className="text-gray-600 leading-relaxed">
              You can record your voice, get a detailed analysis, and then
              review your performance. We offer various exercises to practice
              different scenarios, from daily conversations to formal
              presentations. Remember, consistent practice is key. We are here
              to support your journey every step of the way. Thank you for
              choosing FluentAI.
            </p> */}

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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Real-time AI Feedback
          </h2>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Fluency */}
            <Card>
              <CardContent className="p-6">
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
                  <span className="text-2xl font-bold text-blue-600">
                    {analysisResult?.scores?.fluency ?? 85}%
                  </span>
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Smoothness and flow of speech.
                </p>
              </CardContent>
            </Card>

            {/* Pronunciation */}
            <Card>
              <CardContent className="p-6">
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
                  <span className="text-2xl font-bold text-blue-600">
                    {analysisResult?.scores?.pronunciation ?? 78}%
                  </span>
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Accuracy of sounds and words.
                </p>
              </CardContent>
            </Card>

            {/* Filler Words */}
            <Card>
              <CardContent className="p-6">
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
                  <span className="text-2xl font-bold text-blue-600">
                    {analysisResult?.scores?.filler_words || 2} Words
                  </span>
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Count of "um", "uh", etc.
                </p>
              </CardContent>
            </Card>

            {/* Pacing */}
            <Card>
              <CardContent className="p-6">
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
                  <span className="text-2xl font-bold text-blue-600">
                    {analysisResult?.scores?.pacing ?? 120} WPM
                  </span>
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">Speaking speed.</p>
              </CardContent>
            </Card>

            {/* Confidence */}
            <Card>
              <CardContent className="p-6">
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
                  <span className="text-2xl font-bold text-blue-600">
                    {" "}
                    {((analysisResult?.details?.confidence ?? 1) * 10).toFixed(
                      1
                    )}
                    /10
                  </span>
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Tone and vocal delivery.
                </p>
              </CardContent>
            </Card>

            {/* Pauses */}
            <Card>
              <CardContent className="p-6">
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
                  <span className="text-2xl font-bold text-blue-600">
                    {analysisResult?.details?.pauses ?? 5}%
                  </span>
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Frequency and duration of breaks in speech.
                </p>
              </CardContent>
            </Card>

            {/* Words per minute */}
            <Card>
              <CardContent className="p-6">
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
                  <span className="text-2xl font-bold text-blue-600">
                    {analysisResult?.details?.wpm ?? 140}
                  </span>
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Rate of speech delivery.
                </p>
              </CardContent>
            </Card>

            {/* Word error rate */}
            <Card>
              <CardContent className="p-6">
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
                  <span className="text-2xl font-bold text-blue-600">
                    {analysisResult?.details?.wer ?? 2}%
                  </span>
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
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
