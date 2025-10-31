import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Users, Award, Target, CheckCircle2 } from "lucide-react";
import { TestimonialsSlideshow } from "@/components/testimonials-slideshow";
import { LiveTradingFeed } from "@/components/live-trading-feed";
import { TelegramContactModal } from "@/components/telegram-contact-modal";
import { ContactCTA } from "@/components/ContactFloatingButtons";
import { TeamProfiles } from "@/components/team-profiles";
import type { Stats, Testimonial } from "@shared/schema";

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return { count, ref };
}

function StatCard({ value, label, icon: Icon, prefix = "", suffix = "", testId }: {
  value: number;
  label: string;
  icon: any;
  prefix?: string;
  suffix?: string;
  testId: string;
}) {
  const { count, ref } = useCountUp(value);

  return (
    <Card ref={ref} className="relative overflow-hidden hover-elevate border-card-border bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm" data-testid={testId}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Icon className="w-8 h-8 text-primary" />
          <Badge variant="secondary" className="font-bold" data-testid={`${testId}-badge`}>LIVE</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-black text-foreground mb-1 animate-count-up" data-testid={`${testId}-value`}>
          {prefix}{count.toLocaleString()}{suffix}
        </div>
        <p className="text-sm text-muted-foreground font-medium" data-testid={`${testId}-label`}>{label}</p>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const [showTelegramModal, setShowTelegramModal] = useState(false);

  const { data: stats } = useQuery<Stats>({
    queryKey: ["/api/stats"],
  });

  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const handleContactClick = () => {
    setShowTelegramModal(true);
  };

  const telegramUsername = "@thewealthprince0";
  const telegramUrl = "https://t.me/thewealthprince0";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 animate-gradient-shift bg-[length:400%_400%]" />
        
        <div className="relative max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <Badge variant="outline" className="text-sm font-semibold px-4 py-1.5 border-primary/50" data-testid="badge-member-count">
            ⚡ Join 1,500+ Successful Traders
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
              Master Options Trading
            </span>
            <br />
            <span className="text-foreground">with Expert Mentorship</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Stop chasing hype. Learn proven strategies, master technical analysis, and grow with a community of traders who win together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <div className="flex flex-col gap-2">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                data-testid="button-become-member"
                onClick={handleContactClick}
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-2"
              data-testid="link-success-stories"
              asChild
            >
              <Link href="/testimonials">
                Success Stories
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Live Trading Feed */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <LiveTradingFeed />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              value={stats?.tradesCalled || 2489}
              label="Trades Called in Our Community"
              icon={TrendingUp}
              suffix="+"
              testId="stat-trades-called"
            />
            <StatCard
              value={stats?.avgProfit || 789}
              label="Avg Profit Per Win"
              icon={Award}
              prefix="$"
              testId="stat-avg-profit"
            />
            <StatCard
              value={stats?.winRate || 76}
              label="Community Win Rate (30 Days)"
              icon={Target}
              suffix="%"
              testId="stat-win-rate"
            />
          </div>
        </div>
      </section>

      {/* Team Profiles */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <TeamProfiles onContactClick={handleContactClick} />
        </div>
      </section>

      {/* Testimonials Slideshow */}
      <section className="py-12 px-6 bg-muted/20">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-4xl font-black mb-2">What Our Members Say</h2>
            <p className="text-lg text-muted-foreground">Real results from real traders</p>
          </div>
          <TestimonialsSlideshow />
        </div>
      </section>

      {/* What You Get - Combined Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4">What You Get as a Member</h2>
            <p className="text-xl text-muted-foreground">Everything you need to become a successful options trader</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <Card className="border-card-border hover-elevate" data-testid="card-expert-guidance">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Award className="w-6 h-6 text-primary" />
                  Expert Guidance & Strategy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  Stop chasing hype. Learn proven strategies from mentors with over 28 years combined experience and a 77% average win rate.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex gap-2 items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm">Detailed trading plans for swings and day trades</p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm">Clear entries, profit targets, and stop losses</p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm">Technical analysis training (support/resistance, Elliott Wave, oscillators)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Column */}
            <Card className="border-card-border hover-elevate" data-testid="card-community-support">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Users className="w-6 h-6 text-primary" />
                  Active Community & Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  Join 1,500+ members in our private trading community. Learn from others, share ideas, and get direct mentor access.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex gap-2 items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm">Private Telegram day trade room with 3-9 trades per week</p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm">Direct mentor support during trading hours</p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm">Daily premarket hitlist and analysis</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Full Width Bottom Card */}
          <Card className="border-card-border bg-gradient-to-br from-primary/5 to-secondary/5" data-testid="card-resources">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Educational Resources & Live Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <div className="text-4xl font-black text-primary">100+</div>
                  <p className="text-sm text-muted-foreground font-semibold">Training Videos</p>
                  <p className="text-xs text-muted-foreground">Beginner to advanced strategies</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-4xl font-black text-primary">Live</div>
                  <p className="text-sm text-muted-foreground font-semibold">Streaming Sessions</p>
                  <p className="text-xs text-muted-foreground">Premarket prep & day trading</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-4xl font-black text-primary">Daily</div>
                  <p className="text-sm text-muted-foreground font-semibold">Trade Ideas</p>
                  <p className="text-xs text-muted-foreground">Calls, puts & educational content</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact CTA */}
      <ContactCTA onContactClick={handleContactClick} />

      {/* Telegram Contact Modal */}
      <TelegramContactModal
        open={showTelegramModal}
        onOpenChange={setShowTelegramModal}
        telegramUsername={telegramUsername}
        telegramUrl={telegramUrl}
      />
    </div>
  );
}
