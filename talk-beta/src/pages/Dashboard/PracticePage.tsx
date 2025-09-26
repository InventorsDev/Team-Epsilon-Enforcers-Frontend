import { Button } from "@/components/ui/button";
import TongueTwisters from "@/assets/Tongue twisters.png";
import RolePlays from "@/assets/Role-Playing Scenarios.png";
import Reading from "@/assets/Reading Passages.png";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/navBar";
import { useNavigate } from "react-router-dom";

export default function PracticePage() {
  const navigate = useNavigate();

  const lessons = [
    {
      title: "Monologue Drill",
      prompt:
        "Try reading this tongue twister aloud: 'She sells seashells by the seashore.'",
      image: TongueTwisters,
      badges: ["Lesson", "Beginner"],
      description:
        "Practice flowing expression and dramatic tone shufts to expand fluenecy and engage listeners",
      duration: "15 min lesson",
    },
    {
      title: "Argument Practice",
      prompt: "Role-play a debate: 'Why is public speaking important?'",
      image: RolePlays,
      badges: ["Lesson", "Beginner"],
      description:
        "Develop logical structure , persuasive rhythm, and strong emphasis to sharpen fluenecy and conviction.",
      duration: "10 min lesson",
    },
    {
      title: "Conversation Practice",
      prompt:
        "Read this passage: 'The quick brown fox jumps over the lazy dog.'",
      image: Reading,
      badges: ["Lesson", "Intermediate"],
      description:
        "Strengthen fluenecy through natural pauses, casual rhythm, and relaxed exchanges.",
      duration: "20 min lesson",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <NavBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-10 bg-white">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Master Your Speech with Engaging Practice
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore interactive exercises designed to improve your fluency,
            pronunciation, and confidence for beginners.
          </p>
        </div>

        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <Card
                key={lesson.title}
                className="hover:shadow-lg transition-shadow p-0"
              >
                <CardHeader
                  className="rounded-t-lg"
                  style={{
                    backgroundImage: `url(${lesson.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                    height: "12rem",
                  }}
                ></CardHeader>
                <CardContent className="p-4 text-left">
                  <div className="flex gap-2 mb-2">
                    {lesson.badges.map((b) => (
                      <Badge
                        key={b}
                        variant={b === "Lesson" ? "secondary" : "outline"}
                      >
                        {b}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-lg mb-2">{lesson.title}</CardTitle>
                  <CardDescription className="text-sm mb-3">
                    {lesson.description}
                  </CardDescription>
                  <p className="text-xs text-gray-500 mb-3">
                    {lesson.duration}
                  </p>
                  <Button
                    variant="default"
                    className="h-auto text-center w-full"
                    onClick={() =>
                      navigate("/practice-area", {
                        state: { prompt: lesson.prompt, title: lesson.title },
                      })
                    }
                  >
                    Start Lesson
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
