import type React from "react";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Square, Upload, Play, Pause, Eye } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import NavBar from "@/components/navBar";

export default function PracticeAreaPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [_isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(
    null
  );
  const [recordingTime, setRecordingTime] = useState(0);
  const [practicePrompt, setPracticePrompt] = useState<string>(
    localStorage.getItem("analysis_result")
      ? JSON.parse(localStorage.getItem("analysis_result") as string).transcript
      : `"Paste your speech draft here"`
  );
   const [analyzedResult, setAnalyzedResult] = useState<any>(null);
   const [isUploading, setIsUploading] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const [bars, setBars] = useState<number[]>(Array(70).fill(20));
  const location = useLocation();

  useEffect(() => {
    const defaultPrompt = location.state?.prompt || practicePrompt;
    setPracticePrompt(defaultPrompt);
  }, [location.state]);

  useEffect(() => {
    if (isRecording && recordingStartTime) {
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(Date.now() - recordingStartTime);
      }, 100);
    } else {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      setRecordingTime(0);
    }

    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, [isRecording, recordingStartTime]);
   
   

  useEffect(() => {
    function animateBars() {
      if (!analyserRef.current) {
        animationIdRef.current = requestAnimationFrame(animateBars);
        return;
      }

      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserRef.current.getByteFrequencyData(dataArray);

      // Sample 70 points from the frequency data
      const step = Math.floor(bufferLength / 70);
      const newBars = Array.from({ length: 70 }, (_, i) => {
        const index = i * step;
        const value = dataArray[index] || 0;
        // Map 0-255 to 10-80 pixels for better visualization
        return Math.max(10, (value / 255) * 70 + 10);
      });

      setBars(newBars);
      animationIdRef.current = requestAnimationFrame(animateBars);
    }

    if (isRecording) {
      animateBars();
    } else {
      setBars(Array(70).fill(20));
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    }

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isRecording]);

  useEffect(() => {
    if (!audioRef.current) return;

    const handleEnded = () => setIsPlaying(false);
    const handleLoadedMetadata = () => {
      setAudioDuration(audioRef.current?.duration || 0);
    };
    const handleTimeUpdate = () => {
      setAudioCurrentTime(audioRef.current?.currentTime || 0);
    };

    audioRef.current.addEventListener("ended", handleEnded);
    audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audioRef.current?.removeEventListener("ended", handleEnded);
      audioRef.current?.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );
      audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioUrl]);

  const handleStartRecording = async () => {
    setAudioUrl(null);
    setIsRecording(true);
    setRecordingStartTime(Date.now());
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        // Persist the recording as base64
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          localStorage.setItem("persisted_recording_base64", base64);
          setAudioUrl(URL.createObjectURL(audioBlob));
        };
        reader.readAsDataURL(audioBlob);
      };

      const audioCtx = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);
      analyserRef.current = analyser;

      mediaRecorder.start();
    } catch (err) {
      console.error("[v0] Error accessing microphone:", err);
      setIsRecording(false);
      setRecordingStartTime(null);
      alert("Could not access microphone. Please check permissions.");
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setRecordingStartTime(null);

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }

    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }

    analyserRef.current = null;
  };

  const handleUploadAudioFile = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("audio/")) {
      alert("Please select a valid audio file");
      return;
    }

    setIsLoading(true);
    setIsUploading(true);
    setLoadingMessage("Uploading audio file...");


    setTimeout(() => {
      // Create URL for the uploaded file
      const url = URL.createObjectURL(file);
      setAudioUrl(url);

      // Reset recording state if active
      if (isRecording) {
        handleStopRecording();
      }
      setIsLoading(false);
      setIsUploading(false);
      setLoadingMessage("");
    }, 1500);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !audioDuration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    audioRef.current.currentTime = percent * audioDuration;
  };

  // Upload Audio
  const handleUploadAudio = async () => {
    if (!audioUrl) return;
    setIsUploading(false);
    try {
      setIsUploading(true);
      setLoadingMessage("Analyzing your speech...");
      // Fetch the audio blob from the URL
      const audioBlob = await fetch(audioUrl).then((res) => res.blob());
      const formData = new FormData();
      formData.append("prompt_text", practicePrompt);
      formData.append("file", audioBlob, "recording.webm");

      const authData = localStorage.getItem(
        "sb-kklpfqtpnunievubcjxy-auth-token"
      );
      let accessToken = "";
      if (authData) {
        try {
          const parsed = JSON.parse(authData);
          accessToken = parsed.access_token;
        } catch (e) {
          console.error("Failed to parse auth token from localStorage", e);
        }
      }
      const response = await fetch(
        "https://team-epsilon-enforcers-backend.onrender.com/recordings/submit-and-analyze",
        {
          method: "POST",
          body: formData,
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : {},
        }
      );
      const result = await response.json();
      console.log("Upload result:", result);
      localStorage.setItem("analysis_result", JSON.stringify(result));
      setAnalyzedResult(result);
      toast.success("Upload and Analysis Successful!");
      setLoadingMessage("");
      setTimeout(() => {
        navigate("/dashboard/view-analysis", {
          state: { analysis: analyzedResult },
        });
      }, 2500);
    } catch (err: any) {
      toast.error("Upload Failed: " + (err?.message || err));
    } finally {
      setIsUploading(false);
    }
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    // Load persisted recording on mount
    const savedBase64 = localStorage.getItem("persisted_recording_base64");
    if (savedBase64) {
      const byteString = atob(savedBase64.split(",")[1]);
      const mimeString = savedBase64.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    }
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      {isUploading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-in zoom-in-95 duration-300">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                <div
                  className="absolute inset-2 border-4 border-blue-400 rounded-full border-t-transparent animate-spin animation-delay-150"
                  style={{ animationDirection: "reverse" }}
                ></div>
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {loadingMessage}
                </h3>
                <p className="text-sm text-gray-500">
                  Please wait while we process your audio
                </p>
              </div>

              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
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
          <Card className="bg-white shadow-sm max-h-[400px]">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Ready to Speak?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Recording Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2 py-3"
                  onClick={handleStartRecording}
                  disabled={isRecording}
                >
                  <Mic className="w-4 h-4" />
                  <span>Start Recording</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-center space-x-2 py-3 bg-transparent"
                  onClick={handleStopRecording}
                  disabled={!isRecording}
                >
                  <Square className="w-4 h-4" />
                  <span>Stop Recording</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-center space-x-2 py-3 bg-transparent"
                  onClick={handleUploadClick}
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Audio</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-center space-x-2 py-3 bg-transparent"
                  disabled={!audioUrl}
                  onClick={handlePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  <span>Replay Audio</span>
                </Button>
              </div>

              {/* Hidden file input for audio upload */}
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleUploadAudioFile}
                className="hidden"
              />

              {/* Audio Waveform Visualization */}
              <div className="bg-gradient-to-r from-blue-500 via-[#5E6795] to-orange-500 rounded-lg p-4 h-32 flex items-center justify-center relative">
                <div className="flex items-end justify-center space-x-1 h-28 w-full">
                  {bars.map((height, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-full transition-all duration-100"
                      style={{
                        width: "3px",
                        height: `${height}px`,
                        opacity: isRecording ? 0.9 : 0.5,
                      }}
                    />
                  ))}
                </div>
                {isRecording && (
                  <span className="absolute left-4 top-4 flex items-center text-red-600 font-bold animate-pulse">
                    <Mic className="w-4 h-4 mr-2" /> Recording...
                  </span>
                )}
              </div>

              {/* Playback Controls */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePlayPause}
                  disabled={!audioUrl}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
                <audio
                  ref={audioRef}
                  src={audioUrl ?? undefined}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  style={{ display: "none" }}
                />
                <div
                  className="flex-1 bg-gray-200 rounded-full h-2 relative cursor-pointer"
                  onClick={handleProgressClick}
                >
                  <div
                    className="bg-blue-600 h-2 rounded-full absolute top-0 left-0 transition-all"
                    style={{
                      width: `${
                        audioDuration
                          ? (audioCurrentTime / audioDuration) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
                <span className="text-sm text-gray-600 font-mono min-w-[60px]">
                  {isRecording
                    ? formatTime(recordingTime)
                    : audioUrl
                    ? `${formatTime(audioCurrentTime * 1000)} / ${formatTime(
                        audioDuration * 1000
                      )}`
                    : "0:00"}
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
              {/* <Input
                placeholder="Upload or Search prompts..."
                className="w-full"
              /> */}

              {/* Paste Button */}

              <Button
                className="flex ml-auto"
                onClick={async () => {
                  try {
                    const text = await navigator.clipboard.readText();
                    setPracticePrompt(text);
                  } catch (err) {
                    // eslint-disable-next-line no-console
                    console.error("Failed to paste from clipboard:", err);
                  }
                }}
              >
                Paste prompt
              </Button>

              {/* Practice Text */}
              <Textarea
                value={practicePrompt}
                onChange={(e) => setPracticePrompt(e.target.value)}
                placeholder={`Write or paste your practice prompt here...`}
                className="min-h-[200px] text-gray-700 leading-relaxed resize-none"
              />
            </CardContent>
          </Card>
        </div>

        {/* See Results Button */}
        <div className="flex gap-4 justify-end">
          <Button
            disabled={!audioUrl}
            onClick={handleUploadAudio}
            className="bg-green-600 hover:bg-green-700 cursor-pointer text-white px-8 py-3 flex items-center space-x-2"
          >
            {isUploading ? (
              <span
                className="inline-block h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin"
                aria-hidden="true"
              />
            ) : (
              <Mic className="w-4 h-4" />
            )}

            <span>{isUploading ? "Processing Audio" : "Process Audio"}</span>
          </Button>
          <Button
            onClick={() => {
              navigate("/dashboard/view-analysis", {
                state: { analysis: analyzedResult },
              });
            }}
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-8 py-3 flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />

            <span>See Results</span>
          </Button>
        </div>
      </main>
    </div>
  );
}
