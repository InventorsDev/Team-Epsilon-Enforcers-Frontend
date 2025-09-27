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
        "Curiosity is a spark. It begins quietly, like a question whispered inside the mind: What if? Why not? How does this work? And from that spark, entire worlds can ignite. Every discovery, every invention, every breakthrough began with someone refusing to silence that inner voice. Yet curiosity is fragile. In childhood, it flows freely, unafraid of mistakes. As adults, however, we often bury it under schedules, rules, and the fear of being wrong. But what if we treated curiosity as a daily practice, as vital as eating or breathing? What if, instead of closing conversations with certainty, we opened them with wonder? Fluency in speech is like fluency in thought—the more curious you are, the more your words expand, adapt, and connect. When you speak with curiosity, your voice carries possibility. And possibility is magnetic. It pulls people closer, it invites them to listen, and it gives your ideas wings. So the next time you speak, let curiosity guide your tone. Ask aloud, even if you already know the answer. Invite others into your wonder. Because fluent speech is not only about how you sound—it is about how deeply you make others feel that the journey of your words is worth following.",
      image: TongueTwisters,
      badges: ["Lesson", "Beginner"],
      description:
        "Practice flowing expression and dramatic tone shufts to expand fluenecy and engage listeners",
      duration: "15 min lesson",
    },
    {
      title: "Argument Practice",
      prompt: "There is a growing debate in the world today: should technology continue racing forward at lightning speed, or should we pause, reflect, and slow it down? On one hand, innovation has lifted millions out of poverty, cured diseases, and connected humanity in ways unimaginable just a century ago. Faster progress means more solutions, more efficiency, and more opportunities to solve problems that once seemed permanent. On the other hand, unchecked speed can be dangerous. Artificial intelligence, genetic engineering, and powerful new weapons raise questions we are not yet prepared to answer. Should we build simply because we can, or should we consider whether we should? Too often, progress runs ahead while wisdom lags behind. So where does that leave us? The answer may not be to stop technology, but to balance it. To create guardrails that encourage innovation while protecting humanity. To demand responsibility alongside creativity. In the end, the real question is not whether technology should slow down—it is whether we can learn to keep our ethics, our laws, and our compassion moving just as fast.",
      image: RolePlays,
      badges: ["Lesson", "Beginner"],
      description:
        "Develop logical structure , persuasive rhythm, and strong emphasis to sharpen fluenecy and conviction.",
      duration: "10 min lesson",
    },
    {
      title: "Conversation Practice",
      prompt:
        "Hey, have you ever noticed how some of the best conversations happen in coffee shops?” I asked, leaning back in my chair.'You mean the way strangers just… open up?” you replied.'Exactly. There’s something about the smell of coffee, the sound of cups clinking, and the low hum of chatter that makes people more honest. You sit across from someone, and suddenly you’re talking about dreams, fears, even crazy ideas you wouldn’t normally share.''Maybe it’s the environment. It feels safe, casual. Nobody’s rushing to judge.' 'True. And maybe that’s why I love it so much. Fluency isn’t just about polished speeches. It’s about being able to sit here, sip slowly, and let words tumble out naturally—without overthinking. Because sometimes the most powerful sentences aren’t rehearsed. They’re just spoken, simply, in the moment.",
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
                      navigate("/dashboard/practice-area", {
                        state: { prompt: lesson.prompt},
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
