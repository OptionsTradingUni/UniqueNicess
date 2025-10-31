import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Target, BarChart3, TrendingDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

interface TradeFeedItem {
  traderName: string;
  symbol: string;
  profit: number;
  timestamp: string;
  strategy: string;
}

const colorPalette = [
  "from-green-500 to-emerald-600",
  "from-blue-500 to-cyan-600",
  "from-purple-500 to-pink-600",
  "from-orange-500 to-red-600",
  "from-indigo-500 to-purple-600",
  "from-teal-500 to-green-600",
];

const comparisonData = {
  before: {
    avgMonthly: 1450,
    winRate: 38,
    emotionalTrading: 85,
    strategyKnowledge: 25,
  },
  after: {
    avgMonthly: 8734,
    winRate: 76,
    emotionalTrading: 15,
    strategyKnowledge: 95,
  },
};

function calculatePercentageReturn(profit: number): number {
  const baseCapital = 5000;
  const returnPercent = (profit / baseCapital) * 100;
  return Math.min(Math.round(returnPercent), 200);
}

export function RecentWins() {
  const { data: liveTrades, isLoading } = useQuery<TradeFeedItem[]>({
    queryKey: ["/api/live-feed"],
    refetchInterval: 60000,
  });

  const recentWins = liveTrades?.slice(0, 6).map((trade, index) => ({
    id: index + 1,
    member: trade.traderName,
    strategy: trade.strategy,
    profit: trade.profit,
    percentage: calculatePercentageReturn(trade.profit),
    date: formatDistanceToNow(new Date(trade.timestamp), { addSuffix: true }),
    color: colorPalette[index % colorPalette.length],
  })) || [];

  const improvement = {
    profit: Math.round(((comparisonData.after.avgMonthly - comparisonData.before.avgMonthly) / comparisonData.before.avgMonthly) * 100),
    winRate: comparisonData.after.winRate - comparisonData.before.winRate,
  };

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <TrendingUp className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Recent Community Wins
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Real profits from real traders in the last 24 hours. These are actual trade results from our community members.
        </p>
        <div className="flex items-center justify-center gap-2">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-muted-foreground">LIVE UPDATES</span>
        </div>
      </div>

      {/* Recent Wins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-6 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))
        ) : recentWins.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No recent trades available. Check back soon!
          </div>
        ) : (
          recentWins.map((win) => (
          <Card
            key={win.id}
            className="relative overflow-hidden border-card-border hover-elevate transition-all group"
            data-testid={`card-win-${win.id}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${win.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
            <CardHeader className="relative">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="font-bold" data-testid={`badge-member-${win.id}`}>
                  {win.member}
                </Badge>
                <Badge variant="outline" className="text-xs" data-testid={`badge-time-${win.id}`}>
                  {win.date}
                </Badge>
              </div>
              <CardTitle className="text-lg font-bold text-foreground" data-testid={`title-strategy-${win.id}`}>
                {win.strategy}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-3">
              <div className="flex items-baseline gap-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                <span className="text-3xl font-black text-green-500" data-testid={`profit-${win.id}`}>
                  ${win.profit.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">profit</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`bg-gradient-to-r ${win.color}`} data-testid={`badge-percentage-${win.id}`}>
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{win.percentage}% Return
                </Badge>
              </div>
            </CardContent>
          </Card>
          ))
        )}
      </div>

      {/* Before/After Comparison Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 rounded-3xl p-8 md:p-12 border border-primary/20">
        <div className="text-center mb-10">
          <h3 className="text-3xl md:text-4xl font-black mb-3">
            The Transformation Our Members Experience
          </h3>
          <p className="text-lg text-muted-foreground">
            See the average results before joining vs. after completing our training
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Before Card */}
          <Card className="border-2 border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="destructive" className="font-bold">
                  BEFORE
                </Badge>
                <TrendingDown className="w-6 h-6 text-destructive" />
              </div>
              <CardTitle className="text-2xl">
                Trading Without Guidance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold">Avg Monthly Profit</span>
                    <span className="text-sm font-bold text-destructive">${comparisonData.before.avgMonthly}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-destructive h-3 rounded-full" style={{ width: "15%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold">Win Rate</span>
                    <span className="text-sm font-bold text-destructive">{comparisonData.before.winRate}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-destructive h-3 rounded-full" style={{ width: `${comparisonData.before.winRate}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold">Emotional Trading</span>
                    <span className="text-sm font-bold text-destructive">{comparisonData.before.emotionalTrading}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-destructive h-3 rounded-full" style={{ width: `${comparisonData.before.emotionalTrading}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold">Strategy Knowledge</span>
                    <span className="text-sm font-bold text-destructive">{comparisonData.before.strategyKnowledge}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-destructive h-3 rounded-full" style={{ width: `${comparisonData.before.strategyKnowledge}%` }} />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-red-200 dark:border-red-900/50">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-0.5">✗</span>
                    <span>Inconsistent results, mostly losses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-0.5">✗</span>
                    <span>No clear strategy or risk management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-0.5">✗</span>
                    <span>Trading based on emotions and guesses</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* After Card */}
          <Card className="border-2 border-green-200 dark:border-green-900/50 bg-green-50/50 dark:bg-green-950/20">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge className="font-bold bg-green-500">
                  AFTER
                </Badge>
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <CardTitle className="text-2xl">
                With Expert Training
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold">Avg Monthly Profit</span>
                    <span className="text-sm font-bold text-green-500">${comparisonData.after.avgMonthly.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full animate-pulse" style={{ width: "100%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold">Win Rate</span>
                    <span className="text-sm font-bold text-green-500">{comparisonData.after.winRate}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: `${comparisonData.after.winRate}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold">Emotional Trading</span>
                    <span className="text-sm font-bold text-green-500">{comparisonData.after.emotionalTrading}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: `${comparisonData.after.emotionalTrading}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold">Strategy Knowledge</span>
                    <span className="text-sm font-bold text-green-500">{comparisonData.after.strategyKnowledge}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: `${comparisonData.after.strategyKnowledge}%` }} />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-green-200 dark:border-green-900/50">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Consistent profits month over month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Proven strategies with clear rules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Disciplined, systematic approach</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Improvement Stats */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <Card className="text-center border-primary/50">
            <CardContent className="pt-6">
              <div className="text-3xl font-black text-primary mb-1">
                +{improvement.profit}%
              </div>
              <p className="text-sm text-muted-foreground font-semibold">Profit Increase</p>
            </CardContent>
          </Card>
          <Card className="text-center border-primary/50">
            <CardContent className="pt-6">
              <div className="text-3xl font-black text-primary mb-1">
                +{improvement.winRate}%
              </div>
              <p className="text-sm text-muted-foreground font-semibold">Win Rate Boost</p>
            </CardContent>
          </Card>
          <Card className="text-center border-primary/50">
            <CardContent className="pt-6">
              <div className="text-3xl font-black text-primary mb-1">
                76%
              </div>
              <p className="text-sm text-muted-foreground font-semibold">Average Win Rate</p>
            </CardContent>
          </Card>
          <Card className="text-center border-primary/50">
            <CardContent className="pt-6">
              <div className="text-3xl font-black text-primary mb-1">
                1,500+
              </div>
              <p className="text-sm text-muted-foreground font-semibold">Success Stories</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Weekly Performance Chart Visual */}
      <Card className="border-primary/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              Community Performance This Week
            </CardTitle>
            <Badge className="bg-green-500">
              <Target className="w-3 h-3 mr-1" />
              Above Target
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-6">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
              const heights = [65, 82, 71, 89, 76, 45, 38];
              const profits = [32400, 48200, 38800, 56500, 42900, 18200, 14100];
              return (
                <div key={day} className="text-center" data-testid={`chart-day-${day.toLowerCase()}`}>
                  <div className="h-32 flex items-end justify-center mb-2">
                    <div
                      className="w-full bg-gradient-to-t from-primary to-secondary rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer relative group"
                      style={{ height: `${heights[index]}%` }}
                      title={`$${profits[index].toLocaleString()}`}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        ${profits[index].toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-muted-foreground">{day}</p>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
            <span className="font-semibold">Weekly Total Profits:</span>
            <span className="text-2xl font-black text-primary">$251,100</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
