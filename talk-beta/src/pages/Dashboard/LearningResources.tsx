
import { useState } from "react";
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
  const [filter, setFilter] = useState<'All' | 'Lesson' | 'Article' | 'Video'>('All');

  // Resource data
  const lessons = [
    {
      type: 'Lesson',
      image: Mastering,
      title: 'Mastering Pronunciation of "Th"',
      description: 'A comprehensive guide to correctly pronouncing the often tricky "th" sound in English.',
      level: 'Beginner',
      duration: '15 min lesson',
    },
    {
      type: 'Lesson',
      image: Pacing,
      title: 'Pacing Your Speech for Clarity',
      description: 'Discover how to vary your speaking speed to enhance comprehension and impact.',
      level: 'Beginner',
      duration: '10 min lesson',
    },
    {
      type: 'Lesson',
      image: Intonation,
      title: 'Intonation and Stress Patterns',
      description: 'Learn to use pitch and emphasis to bring meaning and emotion effectively.',
      level: 'Intermediate',
      duration: '20 min lesson',
    },
    {
      type: 'Lesson',
      image: Openings,
      title: 'Crafting Compelling Openings',
      description: 'Learn techniques to start your presentations and conversations with impact.',
      level: 'Intermediate',
      duration: '18 min lesson',
    },
  ];

  const articles = [
    {
      type: 'Article',
      image: PublicSpeaking,
      title: 'Overcoming Public Speaking Anxiety',
      description: 'Strategies and tips to manage nerves and deliver confident presentations.',
      level: 'Intermediate',
      author: 'Dr. Eleanor Vance',
    },
    {
      type: 'Article',
      image: ActiveListening,
      title: 'The Power of Active Listening',
      description: 'Understand how active listening can transform your communication skills.',
      level: 'Intermediate',
      author: 'Communications Today',
    },
    {
      type: 'Article',
      image: VoiceTraining,
      title: 'Building Charisma in Your Voice',
      description: 'Tips and exercises to develop a more engaging and impactful speaking voice.',
      level: 'Advanced',
      author: 'Voice Magazine',
    },
    {
      type: 'Article',
      image: Persuasion,
      title: 'The Art of Persuasion in Daily Life',
      description: 'How to apply persuasive speaking principles in everyday interactions.',
      level: 'Advanced',
      author: 'Communication Skills Blog',
    },
  ];

  const videos = [
    {
      type: 'Video',
      image: Storytelling,
      title: 'Effective Storytelling Techniques',
      description: 'Learn how to captivate your audience using compelling narrative structures.',
      level: 'Advanced',
      duration: '12 min video',
    },
    {
      type: 'Video',
      image: BodyLanguage,
      title: 'Body Language for Confident Speakers',
      description: 'Unlock the secrets of non-verbal communication for a powerful presence.',
      level: 'Advanced',
      duration: '8 min video',
    },
    {
      type: 'Video',
      image: FillerWords,
      title: 'Common Filler Word Elimination',
      description: 'Practical strategies to reduce "um," "uh," and "like" from your speech patterns.',
      level: 'Beginner',
      duration: '7 min video',
    },
    {
      type: 'Video',
      image: Accents,
      title: 'Managing Accents for Global Communication',
      description: 'Strategies for clear communication across diverse linguistic backgrounds.',
      level: 'Beginner',
      duration: '14 min video',
    },
  ];

  // Filter logic
  const showLessons = filter === 'All' || filter === 'Lesson';
  const showArticles = filter === 'All' || filter === 'Article';
  const showVideos = filter === 'All' || filter === 'Video';

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
            <Button
              variant={filter === 'All' ? 'default' : 'outline'}
              className={filter === 'All' ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
              onClick={() => setFilter('All')}
            >
              All
            </Button>
            <Button
              variant={filter === 'Lesson' ? 'default' : 'outline'}
              className={filter === 'Lesson' ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
              onClick={() => setFilter('Lesson')}
            >
              Lesson
            </Button>
            <Button
              variant={filter === 'Article' ? 'default' : 'outline'}
              className={filter === 'Article' ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
              onClick={() => setFilter('Article')}
            >
              Article
            </Button>
            <Button
              variant={filter === 'Video' ? 'default' : 'outline'}
              className={filter === 'Video' ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
              onClick={() => setFilter('Video')}
            >
              Video
            </Button>
          </div>
        </div>

        {/* Lessons Section */}
        {showLessons && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-left">
              Lessons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {lessons.map((lesson, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow p-0">
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
                      <Badge variant="secondary">Lesson</Badge>
                      <Badge variant="outline">{lesson.level}</Badge>
                    </div>
                    <CardTitle className="text-lg mb-2">{lesson.title}</CardTitle>
                    <CardDescription className="text-sm mb-3">{lesson.description}</CardDescription>
                    <p className="text-xs text-gray-500 mb-3">{lesson.duration}</p>
                    <Button variant="link" className="p-0 h-auto text-blue-600 text-center">
                      Start Lesson
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Articles Section */}
        {showArticles && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-left">
              Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {articles.map((article, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow p-0">
                  <CardHeader
                    className="p-0 rounded-t-lg"
                    style={{
                      backgroundImage: `url(${article.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "top",
                      height: "12rem",
                    }}
                  ></CardHeader>
                  <CardContent className="p-4 text-left">
                    <div className="flex gap-2 mb-2">
                      <Badge variant="secondary">Article</Badge>
                      <Badge variant="outline">{article.level}</Badge>
                    </div>
                    <CardTitle className="text-lg mb-2">{article.title}</CardTitle>
                    <CardDescription className="text-sm mb-3">{article.description}</CardDescription>
                    <p className="text-xs text-gray-500 mb-3">By {article.author}</p>
                    <Button variant="link" className="p-0 h-auto text-blue-600">
                      Read Article
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Videos Section */}
        {showVideos && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-left">
              Videos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {videos.map((video, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow p-0">
                  <CardHeader
                    className="p-0 rounded-t-lg"
                    style={{
                      backgroundImage: `url(${video.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "top",
                      height: "12rem",
                    }}
                  ></CardHeader>
                  <CardContent className="p-4 text-left">
                    <div className="flex gap-2 mb-2">
                      <Badge variant="secondary">Video</Badge>
                      <Badge variant="outline">{video.level}</Badge>
                    </div>
                    <CardTitle className="text-lg mb-2">{video.title}</CardTitle>
                    <CardDescription className="text-sm mb-3">{video.description}</CardDescription>
                    <p className="text-xs text-gray-500 mb-3">{video.duration}</p>
                    <Button variant="link" className="p-0 h-auto text-blue-600">
                      Start Video
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

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