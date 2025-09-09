import { Button } from "@/components/ui/button";
import TongueTwisters from "@/assets/Tongue twisters.png"
import RolePlays from "@/assets/Role-Playing Scenarios.png"
import Reading from "@/assets/Reading Passages.png"


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/navBar";

export default function PracticePage() {
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

        {/* Lessons Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow p-0">
              <CardHeader
                className="rounded-t-lg"
                style={{
                  backgroundImage: `url(${TongueTwisters})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                  height: "12rem",
                }}
              ></CardHeader>
              <CardContent className="p-4 text-left">
                <div className="flex gap-2 mb-2">
                  <Badge variant="secondary">Lesson</Badge>
                  <Badge variant="outline">Beginner</Badge>
                </div>
                <CardTitle className="text-lg mb-2">Tongue Twisters</CardTitle>
                <CardDescription className="text-sm mb-3">
                  Sharpen your articulation and clarity by mastering challenging
                  phrases.
                </CardDescription>
                <p className="text-xs text-gray-500 mb-3">15 min lesson</p>
                <Button variant="default" className="h-auto text-center w-full">
                  Start Lesson
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow p-0">
              <CardHeader
                className="p-0 rounded-t-lg"
                style={{
                  backgroundImage: `url(${RolePlays})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                  height: "12rem",
                }}
              ></CardHeader>
              <CardContent className="p-4 text-left">
                <div className="flex gap-2 mb-2">
                  <Badge variant="secondary">Lesson</Badge>
                  <Badge variant="outline">Beginner</Badge>
                </div>
                <CardTitle className="text-lg mb-2">
                  Role-Playing Scenarios
                </CardTitle>
                <CardDescription className="text-sm mb-3">
                  Practice real-life conversations from job interviews to social
                  interactions.
                </CardDescription>
                <p className="text-xs text-gray-500 mb-3">10 min lesson</p>
                <Button variant="default" className="w-full h-auto">
                  Start Lesson
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow p-0">
              <CardHeader
                className="p-0 rounded-t-lg"
                style={{
                  backgroundImage: `url(${Reading})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                  height: "12rem",
                }}
              ></CardHeader>
              <CardContent className="p-4 text-left">
                <div className="flex gap-2 mb-2">
                  <Badge variant="secondary">Lesson</Badge>
                  <Badge variant="outline">Intermediate</Badge>
                </div>
                <CardTitle className="text-lg mb-2">Reading Passages</CardTitle>
                <CardDescription className="text-sm mb-3">
                  Improve your reading fluency and pacing with curated texts.
                </CardDescription>
                <p className="text-xs text-gray-500 mb-3">20 min lesson</p>
                <Button variant="default" className="h-auto w-full">
                  Start Lesson
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16 bg-white rounded-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Speak Confidently?
          </h2>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
          >
            Explore All Exercises
          </Button>
        </section>
      </main>
    </div>
  );
}
