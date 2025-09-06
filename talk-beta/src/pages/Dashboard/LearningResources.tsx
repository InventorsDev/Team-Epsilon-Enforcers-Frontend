import { Mic, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Mastering from "@/assets/Mastering Pronunciation of.png";
import Pacing from "@/assets/Pacing Your Speech for Clarity.png";
import Intonation from "@/assets/Intonation and Stress Patterns.png";
import Openings from "@/assets/Crafting Compelling Openings.png";
import PublicSpeaking from "@/assets/Overcoming Public Speaking Anxiety.png";
import ActiveListening from "@/assets/The Power of Active Listening.png";
import VoiceTraining from "@/assets/Building Charisma in Your Voice.png";
import Persuasion from "@/assets/The Art of Persuasion in Daily Life.png";
import FillerWords from "@/assets/Common Filler Word Elimination.png";
import Accents from "@/assets/Managing Accents for Global Communication.png";
import Storytelling from "@/assets/Effective Storytelling Techniques.png";
import BodyLanguage from "@/assets/Body Language for Confident Speakers.png";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/navBar";

export default function LearningResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <NavBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-10 bg-white">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Our Learning Resources
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dive into our rich collection of lessons, articles, and videos
            designed to enhance your speaking skills. Find exactly what you need
            to become a more confident and fluent communicator.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search resources..."
              className="pl-10 h-12 border-[#DEE1E6FF] rounded-[6px] md:w-[448px] text-sm hover:text-[#565D6DFF]  "
            />
          </div>
          <div className="flex gap-2">
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
              All
            </Button>
            <Button variant="outline">Lesson</Button>
            <Button variant="outline">Article</Button>
            <Button variant="outline">Video</Button>
          </div>
        </div>

        {/* Lessons Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-left">
            Lessons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow p-0">
              <CardHeader
                className="rounded-t-lg"
                style={{
                  backgroundImage: `url(${Mastering})`,
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
                  Mastering Pronunciation of "Th"
                </CardTitle>
                <CardDescription className="text-sm mb-3">
                  A comprehensive guide to correctly pronouncing the often
                  tricky "th" sound in English.
                </CardDescription>
                <p className="text-xs text-gray-500 mb-3">15 min lesson</p>
                <Button
                  variant="link"
                  className="p-0 h-auto text-blue-600 text-center"
                >
                  Start Lesson
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow p-0">
              <CardHeader
                className="p-0 rounded-t-lg"
                style={{
                  backgroundImage: `url(${Pacing})`,
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
                  Pacing Your Speech for Clarity
                </CardTitle>
                <CardDescription className="text-sm mb-3">
                  Discover how to vary your speaking speed to enhance
                  comprehension and impact.
                </CardDescription>
                <p className="text-xs text-gray-500 mb-3">10 min lesson</p>
                <Button variant="link" className="p-0 h-auto text-blue-600">
                  Start Lesson
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow p-0">
              <CardHeader
                className="p-0 rounded-t-lg"
                style={{
                  backgroundImage: `url(${Intonation})`,
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
                <CardTitle className="text-lg mb-2">
                  Intonation and Stress Patterns
                </CardTitle>
                <CardDescription className="text-sm mb-3">
                  Learn to use pitch and emphasis to bring meaning and emotion
                  effectively.
                </CardDescription>
                <p className="text-xs text-gray-500 mb-3">20 min lesson</p>
                <Button variant="link" className="p-0 h-auto text-blue-600">
                  Start Lesson
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow p-0">
              <CardHeader
                className="p-0 rounded-t-lg"
                style={{
                  backgroundImage: `url(${Openings})`,
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
                <CardTitle className="text-lg mb-2">
                  Crafting Compelling Openings
                </CardTitle>
                <CardDescription className="text-sm mb-3">
                  Learn techniques to start your presentations and conversations
                  with impact.
                </CardDescription>
                <p className="text-xs text-gray-500 mb-3">18 min lesson</p>
                <Button variant="link" className="p-0 h-auto text-blue-600">
                  Start Lesson
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Articles Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-left">
            Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow p-0">
              <CardHeader
                className="p-0 rounded-t-lg"
                style={{
                  backgroundImage: `url(${PublicSpeaking})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                  height: "12rem",
                }}
              ></CardHeader>
              <CardContent className="p-4 text-left">
                <div className="flex gap-2 mb-2">
                  <Badge variant="secondary">Article</Badge>
                  <Badge variant="outline">Intermediate</Badge>
                </div>
                <CardTitle className="text-lg mb-2">
                  Overcoming Public Speaking Anxiety
                </CardTitle>
                <CardDescription className="text-sm mb-3">
                  Strategies and tips to manage nerves and deliver confident
                  presentations.
                </CardDescription>
                <p className="text-xs text-gray-500 mb-3">
                  By Dr. Eleanor Vance
                </p>
                <Button variant="link" className="p-0 h-auto text-blue-600">
                  Read Article
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow p-0">
              <CardHeader
                className="p-0 rounded-t-lg"
                style={{
                  backgroundImage: `url(${ActiveListening})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                  height: "12rem",
                }}
              ></CardHeader>
              <CardContent className="p-4 text-left">
                <div className="flex gap-2 mb-2">
                  <Badge variant="secondary">Article</Badge>
                  <Badge variant="outline">Intermediate</Badge>
                </div>
                <CardTitle className="text-lg mb-2">
                  The Power of Active Listening
                </CardTitle>
                <CardDescription className="text-sm mb-3">
                  Understand how active listening can transform your
                  communication skills.
                </CardDescription>
                <p className="text-xs text-gray-500 mb-3">
                  By Communications Today
                </p>
                <Button variant="link" className="p-0 h-auto text-blue-600">
                  Read Article
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow p-0">
              <CardHeader
                className="p-0 rounded-t-lg"
                style={{
                  backgroundImage: `url(${VoiceTraining})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                  height: "12rem",
                }}
              ></CardHeader>
              <CardContent className="p-4 text-left">
                <div className="flex gap-2 mb-2">
                  <Badge variant="secondary">Article</Badge>
                  <Badge variant="outline">Advanced</Badge>
                </div>
                <CardTitle className="text-lg mb-2">
                  Building Charisma in Your Voice
                </CardTitle>
                <CardDescription className="text-sm mb-3">
                  Tips and exercises to develop a more engaging and impactful
                  speaking voice.
                </CardDescription>
                <p className="text-xs text-gray-500 mb-3">By Voice Magazine</p>
                <Button variant="link" className="p-0 h-auto text-blue-600">
                  Read Article
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow p-0">
              <CardHeader
                className="p-0 rounded-t-lg"
                style={{
                  backgroundImage: `url(${Persuasion})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                  height: "12rem",
                }}
              ></CardHeader>
              <CardContent className="p-4 text-left">
                <div className="flex gap-2 mb-2">
                  <Badge variant="secondary">Article</Badge>
                  <Badge variant="outline">Advanced</Badge>
                </div>
                <CardTitle className="text-lg mb-2">
                  The Art of Persuasion in Daily Life
                </CardTitle>
                <CardDescription className="text-sm mb-3">
                  How to apply persuasive speaking principles in everyday
                  interactions.
                </CardDescription>
                <p className="text-xs text-gray-500 mb-3">
                  By Communication Skills Blog
                </p>
                <Button variant="link" className="p-0 h-auto text-blue-600">
                  Read Article
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Videos Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-left">
            Videos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow p-0">
              <CardHeader
                className="p-0 rounded-t-lg"
                style={{
                  backgroundImage: `url(${Storytelling})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                  height: "12rem",
                }}
              ></CardHeader>
              <CardContent className="p-4 text-left">
                <div className="flex gap-2 mb-2">
                  <Badge variant="secondary">Video</Badge>
                  <Badge variant="outline">Advanced</Badge>
                </div>
                <CardTitle className="text-lg mb-2">
                  Effective Storytelling Techniques
                </CardTitle>
                <CardDescription className="text-sm mb-3">
                  Learn how to captivate your audience using compelling
                  narrative structures.
                </CardDescription>
                <p className="text-xs text-gray-500 mb-3">12 min video</p>
                <Button variant="link" className="p-0 h-auto text-blue-600">
                  Start Video
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow p-0">
              <CardHeader
                className="p-0 rounded-t-lg"
                style={{
                  backgroundImage: `url(${BodyLanguage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                  height: "12rem",
                }}
              ></CardHeader>
              <CardContent className="p-4 text-left">
                <div className="flex gap-2 mb-2">
                  <Badge variant="secondary">Video</Badge>
                  <Badge variant="outline">Advanced</Badge>
                </div>
                <CardTitle className="text-lg mb-2">
                  Body Language for Confident Speakers
                </CardTitle>
                <CardDescription className="text-sm mb-3">
                  Unlock the secrets of non-verbal communication for a powerful
                  presence.
                </CardDescription>
                <p className="text-xs text-gray-500 mb-3">8 min video</p>
                <Button variant="link" className="p-0 h-auto text-blue-600">
                  Start Video
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow p-0">
              <CardHeader
                className="p-0 rounded-t-lg"
                style={{
                  backgroundImage: `url(${FillerWords})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                  height: "12rem",
                }}
              ></CardHeader>
              <CardContent className="p-4 text-left">
                <div className="flex gap-2 mb-2">
                  <Badge variant="secondary">Video</Badge>
                  <Badge variant="outline">Beginner</Badge>
                </div>
                <CardTitle className="text-lg mb-2">
                  Common Filler Word Elimination
                </CardTitle>
                <CardDescription className="text-sm mb-3">
                  Practical strategies to reduce "um," "uh," and "like" from
                  your speech patterns.
                </CardDescription>
                <p className="text-xs text-gray-500 mb-3">7 min video</p>
                <Button variant="link" className="p-0 h-auto text-blue-600">
                  Start Video
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow p-0">
              <CardHeader
                className="p-0 rounded-t-lg"
                style={{
                  backgroundImage: `url(${Accents})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                  height: "12rem",
                }}
              ></CardHeader>
              <CardContent className="p-4 text-left">
                <div className="flex gap-2 mb-2">
                  <Badge variant="secondary">Video</Badge>
                  <Badge variant="outline">Beginner</Badge>
                </div>
                <CardTitle className="text-lg mb-2">
                  Managing Accents for Global Communication
                </CardTitle>
                <CardDescription className="text-sm mb-3">
                  Strategies for clear communication across diverse linguistic
                  backgrounds.
                </CardDescription>
                <p className="text-xs text-gray-500 mb-3">14 min video</p>
                <Button variant="link" className="p-0 h-auto text-blue-600">
                  Start Video
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16 bg-white rounded-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Apply What You've Learned?
          </h2>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
          >
            Start Practicing Now
          </Button>
        </section>
      </main>
    </div>
  );
}
