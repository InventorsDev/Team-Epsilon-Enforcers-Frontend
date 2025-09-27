import { useEffect, useRef, useState } from "react";
import NavBar from "@/components/navBar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Square, Upload, Play, Pause } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

const PracticeArea = () => {
  // Animated bars state for recording
  const [bars, setBars] = useState<number[]>(Array(70).fill(60));
  const location = useLocation();
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [practicePrompt, setPracticePrompt] = useState<string>(
    localStorage.getItem("analysis_result")
      ? JSON.parse(localStorage.getItem("analysis_result") as string).transcript
      : `"Hello, um, welcome to Talk Beta. This platform is designed to help you improve your public speaking skills and build confidence. We focus on key areas like pronunciation, pacing, and overall fluency. Uh, our intelligent system provides instant feedback to guide your progress"`
  );
  const navigate = useNavigate();
  const [analyzedResult, setAnalyzedResult] = useState<any>(null);

  useEffect(() => {
    const defaultPrompt = location.state?.prompt || practicePrompt;
    setPracticePrompt(defaultPrompt);
  },[location.state]);

  useEffect(() => {
    function animateBars() {
      setBars(Array.from({ length: 70 }, () => Math.random() * 80 + 40));
      animationIdRef.current = requestAnimationFrame(animateBars);
    }
    if (isRecording) {
      animateBars();
    } else {
      setBars(Array(70).fill(60));
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    }
    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
  }, [isRecording]);

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

  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(
    null
  );

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
      // Web Audio API for waveform
      const audioCtx = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;
      drawWaveform();
      mediaRecorder.start();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Error accessing microphone:", err);
      setIsRecording(false);
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

  // Draw waveform using canvas
  const drawWaveform = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyserRef.current.getByteTimeDomainData(dataArray);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#2563eb";
    ctx.beginPath();
    const sliceWidth = canvas.width / bufferLength;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * canvas.height) / 2;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      x += sliceWidth;
    }
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    animationIdRef.current = requestAnimationFrame(drawWaveform);
  };

  // Play/pause audio
  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Upload Audio
  const handleUploadAudio = async () => {
    if (!audioUrl) return;
    setIsUploading(false);
    try {
      setIsUploading(true);
      // Fetch the audio blob from the URL
      const audioBlob = await fetch(audioUrl).then(res => res.blob());
      const formData = new FormData();
      formData.append("prompt_text", practicePrompt);
      formData.append("file", audioBlob, "recording.webm");

      const authData = localStorage.getItem("sb-kklpfqtpnunievubcjxy-auth-token");
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
      // navigate("/dashboard/view-analysis", { state: { analysis: result } });
    } catch (err:any) {
      toast.error("Upload Failed: " + (err?.message || err));
    } finally {
      setIsUploading(false);
    }
  }

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

  // Helper function to format seconds as mm:ss
  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

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
                  disabled={!audioUrl}
                  onClick={handleUploadAudio}
                >
                  {isUploading ? (<span
                    className="inline-block h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin"
                    aria-hidden="true"
                  />):(<Upload className="w-4 h-4" />)}
                  
                  <span>{isUploading ? "Uploading Audio" : "Upload Audio"}</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-center space-x-2 py-3 bg-transparent"
                  disabled={!audioUrl}
                  onClick={handlePlayPause}
                >
                  <Play className="w-4 h-4" />
                  <span>Replay Audio</span>
                </Button>
              </div>

              {/* Audio Waveform Visualization */}
              <div className="bg-gradient-to-r from-blue-500 via-[#5E6795] to-orange-500 rounded p-4 h-32 flex items-center justify-center relative">
                <div className="flex items-end space-x-1 h-28 w-full">
                  {isRecording
                    ? bars.map((height, i) => (
                        <div
                          key={i}
                          className="bg-white rounded-full transition-all"
                          style={{
                            width: "4px",
                            height: `${height}px`,
                            opacity: 0.9,
                          }}
                        />
                      ))
                    : Array.from({ length: 70 }).map((_, i) => (
                        <div
                          key={i}
                          className="bg-white rounded-full transition-all duration-200"
                          style={{
                            width: "4px",
                            height: `${Math.random() * 20 + 10}px`,
                            opacity: 0.5,
                          }}
                        />
                      ))}
                  {isRecording && (
                    <span className="absolute left-4 top-4 flex items-center text-red-600 font-bold animate-pulse">
                      <Mic className="w-4 h-4 mr-2" /> Recording...
                    </span>
                  )}
                </div>
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
                  onClick={(e) => {
                    if (!audioRef.current || !audioDuration) return;
                    const rect = (
                      e.target as HTMLDivElement
                    ).getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const percent = clickX / rect.width;
                    audioRef.current.currentTime = percent * audioDuration;
                  }}
                >
                  <div
                    className="bg-blue-600 h-2 rounded-full absolute top-0 left-0"
                    style={{
                      width: `${
                        audioDuration
                          ? (audioCurrentTime / audioDuration) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
                <span className="text-sm text-gray-600 font-mono">
                  {isRecording && recordingStartTime
                    ? `${formatTime((Date.now() - recordingStartTime) / 1000)}`
                    : audioUrl
                    ? `${formatTime(audioCurrentTime)} / ${formatTime(
                        audioDuration
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
        <div className="flex justify-end">
          <Button onClick={()=>navigate("/dashboard/view-analysis", { state: { analysis: analyzedResult } })} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg flex items-center space-x-2">
            <Mic className="w-5 h-5" />
            <span>See Results</span>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default PracticeArea;