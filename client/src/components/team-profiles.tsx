import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Award, TrendingUp, BookOpen, Send, ChevronLeft, ChevronRight } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

import mentor1 from "@assets/stock_images/ment1.jpeg";
import mentor2 from "@assets/stock_images/ment2.jpeg";
import mentor3 from "@assets/stock_images/ment3.jpeg";
import mentor4 from "@assets/stock_images/ment4.jpeg";
import mentor5 from "@assets/stock_images/ment5.jpeg";
import mentor6 from "@assets/stock_images/ment6.jpeg";
import mentor7 from "@assets/stock_images/ment7.jpeg";
import mentor8 from "@assets/stock_images/ment8.jpeg";
import mentor9 from "@assets/stock_images/ment9.jpeg";
import mentor10 from "@assets/stock_images/ment10.jpeg";

const mentors = [
  {
    id: 1,
    name: "The Wealth King",
    role: "Lead Mentor & Founder",
    experience: "11+ Years",
    specialty: "Options Trading & Technical Analysis",
    image: mentor1,
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
    color: "from-primary to-primary",
  },
  {
    id: 2,
    name: "Andrew Diaz",
    role: "Options Strategy Expert",
    experience: "8+ Years",
    specialty: "0DTE & Weekly Options",
    image: mentor2,
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
    color: "from-primary to-primary",
  },
  {
    id: 3,
    name: "Marcus Chen",
    role: "Portfolio Strategy Mentor",
    experience: "9+ Years",
    specialty: "Risk Management & Position Sizing",
    image: mentor3,
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
    color: "from-primary to-primary",
  },
  {
    id: 4,
    name: "Kevin Powell",
    role: "Day Trading Specialist",
    experience: "7+ Years",
    specialty: "Scalping & Momentum Trading",
    image: mentor4,
    achievements: [
      "Expert in Intraday Price Action",
      "78% Win Rate on Day Trades",
      "Former Prop Trader",
      "Specializes in High-Volume Setups",
    ],
    stats: {
      trades: "1,600+",
      students: "750+",
      winRate: "78%",
    },
    color: "from-primary to-primary",
  },
  {
    id: 5,
    name: "David Thompson",
    role: "Technical Analysis Coach",
    experience: "10+ Years",
    specialty: "Chart Patterns & Indicators",
    image: mentor5,
    achievements: [
      "Master of Elliott Wave Theory",
      "Advanced Fibonacci Specialist",
      "Published Technical Analyst",
      "Trained 800+ Traders in TA",
    ],
    stats: {
      trades: "2,200+",
      students: "800+",
      winRate: "73%",
    },
    color: "from-primary to-primary",
  },
  {
    id: 6,
    name: "Kentrell hill",
    role: "Swing Trading Expert",
    experience: "6+ Years",
    specialty: "Multi-Week Position Trading",
    image: mentor6,
    achievements: [
      "Swing Trading Specialist",
      "81% Win Rate on Weekly Trades",
      "Options Greeks Expert",
      "Risk-Reward Optimization Pro",
    ],
    stats: {
      trades: "1,400+",
      students: "650+",
      winRate: "81%",
    },
    color: "from-primary to-primary",
  },
  {
    id: 7,
    name: "Robert Johnson",
    role: "Income Strategy Mentor",
    experience: "12+ Years",
    specialty: "Covered Calls & Cash-Secured Puts",
    image: mentor7,
    achievements: [
      "Passive Income Specialist",
      "Wheel Strategy Pioneer",
      "Managing $2M+ Portfolio",
      "Consistent Monthly Income Focus",
    ],
    stats: {
      trades: "2,600+",
      students: "1,100+",
      winRate: "75%",
    },
    color: "from-primary to-primary",
  },
  {
    id: 8,
    name: "Josh Tracey",
    role: "Volatility Trading Coach",
    experience: "8+ Years",
    specialty: "VIX & Earnings Plays",
    image: mentor8,
    achievements: [
      "Volatility Expert",
      "Earnings Season Specialist",
      "83% Win Rate on Vol Plays",
      "Former Market Maker",
    ],
    stats: {
      trades: "1,900+",
      students: "700+",
      winRate: "83%",
    },
    color: "from-primary to-primary",
  },
  {
    id: 9,
    name: "James Wilson",
    role: "Spreads & Multi-Leg Expert",
    experience: "9+ Years",
    specialty: "Complex Option Strategies",
    image: mentor9,
    achievements: [
      "Iron Butterfly Master",
      "Calendar Spread Specialist",
      "Advanced Strategy Architect",
      "Risk-Defined Trade Expert",
    ],
    stats: {
      trades: "2,000+",
      students: "850+",
      winRate: "77%",
    },
    color: "from-primary to-primary",
  },
  {
    id: 10,
    name: "Michael Steinbach",
    role: "Fundamental Analysis Coach",
    experience: "11+ Years",
    specialty: "Earnings & Company Analysis",
    image: mentor10,
    achievements: [
      "MBA in Finance",
      "Earnings Report Specialist",
      "Long-Term Strategy Focus",
      "LEAPS Options Expert",
    ],
    stats: {
      trades: "2,300+",
      students: "950+",
      winRate: "76%",
    },
    color: "from-primary to-primary",
  },
];

export function TeamProfiles({ onContactClick }: { onContactClick?: () => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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

      {/* Mentor Cards Carousel */}
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                <Card
                  className="relative overflow-hidden border-card-border hover-elevate transition-all group h-full"
                  data-testid={`card-mentor-${mentor.id}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${mentor.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                  
                  {/* Profile Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={mentor.image} 
                      alt={mentor.name}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent`} />
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
              </div>
            ))}
          </div>
        </div>
        
        {/* Carousel Navigation */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background/95 backdrop-blur-sm hover:bg-background z-10 shadow-lg"
          onClick={scrollPrev}
          data-testid="button-prev-mentor"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background/95 backdrop-blur-sm hover:bg-background z-10 shadow-lg"
          onClick={scrollNext}
          data-testid="button-next-mentor"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Call to Action */}
      <Card className="bg-muted/30 border-border">
        <CardContent className="py-10 text-center space-y-6">
          <div className="space-y-3">
            <h3 className="text-3xl font-black">Connect With Our Mentors</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get personalized mentorship and real-time trade alerts from professional traders.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8"
              onClick={onContactClick}
              data-testid="button-contact-mentors"
            >
              <Send className="mr-2 w-5 h-5" />
              Message a Mentor
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
