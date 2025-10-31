import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Award, TrendingUp, BookOpen, Send } from "lucide-react";
import { SiDiscord } from "react-icons/si";

const mentors = [
  {
    id: 1,
    name: "The Wealth Prince",
    role: "Lead Mentor & Founder",
    experience: "11+ Years",
    specialty: "Options Trading & Technical Analysis",
    achievements: [
      "76% Win Rate on Swing Trades",
      "Trained 1,500+ Successful Traders",
      "$8,734 Average Profit Per Win",
      "Certified Technical Analyst",
    ],
    stats: {
      trades: "2,400+",
      students: "1,500+",
      winRate: "76%",
    },
    color: "from-primary to-secondary",
  },
  {
    id: 2,
    name: "Senior Trading Coach",
    role: "Options Strategy Expert",
    experience: "8+ Years",
    specialty: "0DTE & Weekly Options",
    achievements: [
      "Specialized in Same-Day Expiration Trades",
      "82% Win Rate on 0DTE Strategies",
      "Former Wall Street Analyst",
      "Master of Iron Condor & Credit Spreads",
    ],
    stats: {
      trades: "1,800+",
      students: "900+",
      winRate: "82%",
    },
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: 3,
    name: "Risk Management Specialist",
    role: "Portfolio Strategy Mentor",
    experience: "9+ Years",
    specialty: "Risk Management & Position Sizing",
    achievements: [
      "Expert in Portfolio Diversification",
      "Wheel Strategy Specialist",
      "CFA Level II Candidate",
      "Helped Members Grow $500 to $50K+",
    ],
    stats: {
      trades: "2,100+",
      students: "1,200+",
      winRate: "74%",
    },
    color: "from-purple-500 to-pink-600",
  },
];

export function TeamProfiles({ onContactClick }: { onContactClick?: () => void }) {
  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Users className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Meet Your Expert Mentors
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Learn from proven professionals with decades of combined trading experience and thousands of successful students.
        </p>
      </div>

      {/* Mentor Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {mentors.map((mentor) => (
          <Card
            key={mentor.id}
            className="relative overflow-hidden border-card-border hover-elevate transition-all group"
            data-testid={`card-mentor-${mentor.id}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${mentor.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
            
            {/* Profile Image Placeholder */}
            <div className="relative h-48 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
              <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${mentor.color} flex items-center justify-center shadow-2xl`}>
                <Users className="w-16 h-16 text-white" />
              </div>
            </div>

            <CardHeader className="relative text-center pb-3">
              <Badge className="mx-auto mb-3 bg-primary" data-testid={`badge-experience-${mentor.id}`}>
                {mentor.experience} Experience
              </Badge>
              <CardTitle className="text-2xl font-black" data-testid={`title-name-${mentor.id}`}>
                {mentor.name}
              </CardTitle>
              <p className="text-sm font-semibold text-primary" data-testid={`text-role-${mentor.id}`}>
                {mentor.role}
              </p>
              <p className="text-sm text-muted-foreground mt-2" data-testid={`text-specialty-${mentor.id}`}>
                Specializes in {mentor.specialty}
              </p>
            </CardHeader>

            <CardContent className="relative space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 bg-muted/50 rounded-lg">
                  <div className="text-xl font-black text-primary" data-testid={`stat-trades-${mentor.id}`}>
                    {mentor.stats.trades}
                  </div>
                  <div className="text-xs text-muted-foreground font-semibold">Trades</div>
                </div>
                <div className="text-center p-2 bg-muted/50 rounded-lg">
                  <div className="text-xl font-black text-primary" data-testid={`stat-students-${mentor.id}`}>
                    {mentor.stats.students}
                  </div>
                  <div className="text-xs text-muted-foreground font-semibold">Students</div>
                </div>
                <div className="text-center p-2 bg-muted/50 rounded-lg">
                  <div className="text-xl font-black text-green-500" data-testid={`stat-winrate-${mentor.id}`}>
                    {mentor.stats.winRate}
                  </div>
                  <div className="text-xs text-muted-foreground font-semibold">Win Rate</div>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  Key Achievements
                </h4>
                <ul className="space-y-2">
                  {mentor.achievements.map((achievement, index) => (
                    <li
                      key={index}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                      data-testid={`achievement-${mentor.id}-${index}`}
                    >
                      <span className="text-primary mt-0.5">✓</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
        <CardContent className="py-12 text-center space-y-6">
          <div className="space-y-3">
            <h3 className="text-3xl font-black">Learn Directly From the Experts</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get personalized mentorship, real-time trade alerts, and 24/7 access to our team of professional traders.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8"
              onClick={onContactClick}
              data-testid="button-contact-mentors"
            >
              <Send className="mr-2 w-5 h-5" />
              Message a Mentor on Telegram
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-500 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-950 px-8"
              onClick={() => window.open("https://discord.gg/zruqE5wB", "_blank")}
              data-testid="button-join-discord"
            >
              <SiDiscord className="mr-2 w-5 h-5" />
              Join Our Discord Community
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-primary/20">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-black text-primary">28+</div>
              <p className="text-sm text-muted-foreground font-semibold">Years Combined Experience</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-black text-primary">3,600+</div>
              <p className="text-sm text-muted-foreground font-semibold">Students Trained</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-black text-primary">77%</div>
              <p className="text-sm text-muted-foreground font-semibold">Avg Team Win Rate</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-black text-primary">100+</div>
              <p className="text-sm text-muted-foreground font-semibold">Training Videos</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
