import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';
import * as schema from "@shared/schema";
import { generateRandomTestimonial, EXPANDED_WATCHLIST } from "./seed-data";

// Configure WebSocket for Neon database connection
// In development (Replit workspace): use ws library
// In production (Cloud Run): native WebSocket is available globally
if (process.env.NODE_ENV !== 'production') {
  // Development environment - configure ws library for Node.js
  neonConfig.webSocketConstructor = ws;
}
// Production: Native WebSocket is available, no configuration needed

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });

// Seed the database with realistic initial data
export async function seedDatabase() {
  try {
    // Check if already seeded
    const existingStats = await db.query.stats.findFirst();
    if (existingStats) {
      console.log("Database already seeded");
      return;
    }

    console.log("Seeding database with realistic data...");

    // Insert stats
    await db.insert(schema.stats).values({
      memberCount: 1547,
      tradesCalled: 2489,
      totalProfit: 1490508.51,
      avgProfit: 8734,
      winRate: 76,
      successRate: 89,
    });

    // Insert 20 realistic testimonials with unique names, dates, and ratings
    const testimonials = Array.from({ length: 20 }, (_, i) => generateRandomTestimonial(i));
    await db.insert(schema.testimonials).values(testimonials);

    // Insert expanded watchlist (20 stocks)
    await db.insert(schema.stocks).values(EXPANDED_WATCHLIST);

    // Insert realistic video lessons
    await db.insert(schema.videoLessons).values([
      {
        title: "Options Trading Fundamentals",
        description: "Master the basics of call and put options, Greeks, and how options contracts work.",
        duration: "45:23",
        category: "Beginner",
        locked: false,
        thumbnail: null,
        videoUrl: null,
        youtubeId: null,
      },
      {
        title: "Understanding the Greeks",
        description: "Deep dive into Delta, Gamma, Theta, and Vega - how they affect your positions.",
        duration: "38:15",
        category: "Beginner",
        locked: false,
        thumbnail: null,
        videoUrl: null,
        youtubeId: null,
      },
      {
        title: "Vertical Spread Strategies",
        description: "Learn to build bull call spreads and bear put spreads for defined risk trading.",
        duration: "52:40",
        category: "Intermediate",
        locked: false,
        thumbnail: null,
        videoUrl: null,
        youtubeId: null,
      },
      {
        title: "Iron Condors Masterclass",
        description: "Advanced strategy for range-bound markets. Maximize theta decay profit.",
        duration: "1:08:25",
        category: "Advanced",
        locked: true,
        thumbnail: null,
        videoUrl: null,
        youtubeId: null,
      },
      {
        title: "0DTE Options Trading",
        description: "Same-day expiration trades on SPY and QQQ. High risk, high reward strategies.",
        duration: "42:18",
        category: "Advanced",
        locked: true,
        thumbnail: null,
        videoUrl: null,
        youtubeId: null,
      },
      {
        title: "Covered Call Strategy",
        description: "Generate monthly income from your stock holdings with this conservative strategy.",
        duration: "35:50",
        category: "Beginner",
        locked: false,
        thumbnail: null,
        videoUrl: null,
        youtubeId: null,
      },
      {
        title: "Put Credit Spreads",
        description: "Collect premium while defining your risk. Perfect for bullish bias trades.",
        duration: "44:33",
        category: "Intermediate",
        locked: false,
        thumbnail: null,
        videoUrl: null,
        youtubeId: null,
      },
      {
        title: "Technical Analysis for Options",
        description: "Use support, resistance, and indicators to time your options entries.",
        duration: "56:12",
        category: "Intermediate",
        locked: true,
        thumbnail: null,
        videoUrl: null,
        youtubeId: null,
      },
      {
        title: "Earnings Plays Strategy",
        description: "How to trade options around earnings announcements safely and profitably.",
        duration: "48:27",
        category: "Advanced",
        locked: true,
        thumbnail: null,
        videoUrl: null,
        youtubeId: null,
      },
      {
        title: "Position Sizing & Risk Management",
        description: "Critical lesson on protecting your capital and managing winners and losers.",
        duration: "39:55",
        category: "Beginner",
        locked: false,
        thumbnail: null,
        videoUrl: null,
        youtubeId: null,
      },
      {
        title: "Calendar Spreads Explained",
        description: "Profit from time decay differences between option expiration dates.",
        duration: "51:40",
        category: "Advanced",
        locked: true,
        thumbnail: null,
        videoUrl: null,
        youtubeId: null,
      },
      {
        title: "Butterfly Spreads Deep Dive",
        description: "Advanced multi-leg strategy for precise directional betting with limited risk.",
        duration: "1:02:18",
        category: "Advanced",
        locked: true,
        thumbnail: null,
        videoUrl: null,
        youtubeId: null,
      },
      {
        title: "Straddles and Strangles",
        description: "Profit from big moves in either direction. Perfect for high volatility events.",
        duration: "46:55",
        category: "Intermediate",
        locked: true,
        thumbnail: null,
        videoUrl: null,
        youtubeId: null,
      },
      {
        title: "Reading Options Chains",
        description: "Understand bid/ask, open interest, and volume to make smarter trades.",
        duration: "32:45",
        category: "Beginner",
        locked: false,
        thumbnail: null,
        videoUrl: null,
        youtubeId: null,
      },
      {
        title: "Volatility Trading Strategies",
        description: "How to use VIX and implied volatility to your advantage in options trading.",
        duration: "54:20",
        category: "Advanced",
        locked: true,
        thumbnail: null,
        videoUrl: null,
        youtubeId: null,
      },
    ]);

    // Insert training modules
    await db.insert(schema.modules).values([
      {
        title: "Introduction to Options",
        content: `## What Are Options?

Options are financial contracts that give you the **right**, but not the **obligation**, to buy or sell an underlying asset at a predetermined price (**strike price**) before a specific date (**expiration date**).

### Key Concepts

• **Call Options**: Give you the right to BUY the underlying asset
  - Use when you expect the price to rise
  - **Risk**: Limited to the premium paid
  - **Example**: Buy a $100 call on stock trading at $95

• **Put Options**: Give you the right to SELL the underlying asset
  - Use when you expect the price to fall
  - **Risk**: Limited to the premium paid
  - **Example**: Buy a $100 put on stock trading at $105

• **Premium**: The price you pay for the option contract
  - This is the maximum loss for option buyers
  - Determined by intrinsic and extrinsic value

### Why Trade Options?

• **Leverage**: Control 100 shares with one contract for a fraction of the cost
• **Flexibility**: Profit from up, down, or sideways markets
• **Income Generation**: Sell options to collect premium income
• **Risk Management**: Hedge existing positions against losses`,
      },
      {
        title: "Options Greeks Mastery",
        content: `## Understanding the Greeks

The **Greeks** are risk metrics that measure how an option's price responds to various market factors. Mastering these is essential for successful options trading.

### Delta (Δ)

• Measures the rate of change in option price per $1 move in the underlying
  - **Call Delta**: Ranges from 0 to 1 (or 0% to 100%)
  - **Put Delta**: Ranges from -1 to 0 (or -100% to 0%)
  - **Example**: A call with 0.50 delta gains $0.50 when stock rises $1

• **Position Delta** tells you your directional exposure
  - **Positive delta**: Profits when stock rises
  - **Negative delta**: Profits when stock falls
  - **Delta-neutral**: Minimally affected by small price moves

### Gamma (Γ)

• Measures the rate of change of **Delta**
  - Shows how much delta will change per $1 move in stock
  - **High gamma**: Delta changes rapidly (near ATM options)
  - **Low gamma**: Delta changes slowly (deep ITM/OTM options)

### Theta (Θ)

• Measures **time decay** - how much value the option loses per day
  - Always negative for long options
  - Accelerates as expiration approaches
  - **Risk**: Options lose value even if the stock doesn't move
  - **Example**: -0.05 theta means losing $5/day per contract

### Vega (ν)

• Measures sensitivity to changes in **implied volatility**
  - **High vega**: Option price very sensitive to IV changes
  - Longer-dated options have higher vega
  - **Example**: Vega of 0.10 means $10 gain per 1% IV increase`,
      },
      {
        title: "Basic Strategy Guide",
        content: `## Foundational Options Strategies

Start with these time-tested strategies that offer controlled risk and clear profit potential.

### Covered Call

Sell call options against stock you already own to generate income.

• **When to use**: Neutral to slightly bullish outlook
• **Maximum profit**: Premium received + stock gains up to strike
• **Risk**: Missing out on gains above strike price
• **Example**: Own 100 shares at $50, sell $55 call for $2 premium

### Cash-Secured Put

Sell put options while holding cash to buy the stock if assigned.

• **When to use**: Want to buy stock at a lower price
• **Capital requirement**: Must have cash equal to strike × 100
• **Income strategy**: Collect premium while waiting to buy
• **Risk**: Required to buy stock at strike if price drops
• **Example**: Sell $45 put on $50 stock, collect $2 premium

### Protective Put

Buy put options to protect long stock positions from downside risk.

• **When to use**: Own stock but worried about short-term decline
• **Maximum loss**: Limited to strike price minus stock price
• **Cost**: Premium paid reduces overall profit
• **Example**: Own stock at $50, buy $48 put for downside protection`,
      },
      {
        title: "Spread Strategies",
        content: `## Spread Strategies for Risk Management

Spreads combine multiple options to reduce cost and define risk clearly.

### Vertical Spreads

Buy and sell options of the same type with different strike prices.

**Bull Call Spread**
• Buy lower strike call, sell higher strike call
• **Maximum profit**: Difference in strikes minus premium paid
• **Maximum loss**: Premium paid
• **Risk**: Limited on both sides
• **Example**: Buy $50 call, sell $55 call

**Bear Put Spread**
• Buy higher strike put, sell lower strike put
• Profits from downward movement
• **Maximum profit**: Difference in strikes minus premium paid
• **Risk**: Limited to premium paid

### Calendar Spreads (Horizontal)

• Sell near-term option, buy longer-term option at same strike
• Profits from **time decay** differences
• **When to use**: Expect low volatility short-term
• **Risk**: Increases if underlying moves significantly

### Diagonal Spreads

• Combines vertical and calendar spread concepts
• Different strikes AND different expirations
• More flexible for adjusting to market conditions
• **Advanced strategy**: Requires active management`,
      },
      {
        title: "Advanced Multi-Leg Strategies",
        content: `## Complex Strategies for Consistent Income

These advanced strategies offer defined risk/reward profiles for experienced traders.

### Iron Condor

Combines a **bear call spread** and a **bull put spread** to profit from low volatility.

• **Structure**: Sell OTM call + put, buy further OTM call + put
• **Maximum profit**: Total premium collected
• **Maximum loss**: Difference in strikes minus premium
• **When to use**: Expect the stock to stay within a range
• **Risk**: Losses if stock breaks out of the range
• **Example**: Sell $55 call and $45 put, buy $60 call and $40 put

### Butterfly Spread

Three strike prices with equal spacing to profit from minimal movement.

• **Structure**: Buy 1 ITM, sell 2 ATM, buy 1 OTM
• **Maximum profit**: At center strike at expiration
• **Risk**: Limited to premium paid
• **When to use**: Very low volatility expected

### Ratio Spreads

Unequal number of long and short options for asymmetric risk/reward.

• **Call Ratio Spread**: Buy 1 call, sell 2+ higher strike calls
• Profits if stock rises moderately
• **Risk**: Unlimited if stock rises too much
• **Advanced technique**: Requires careful position sizing`,
      },
      {
        title: "Risk Management Essentials",
        content: `## Protecting Your Capital

Proper risk management separates successful traders from the rest.

### Position Sizing Rules

• **Never risk more than 2-5% of capital on a single trade**
• Determine position size based on your account size
• **Example**: $10,000 account → Max $500 risk per trade
• Scale into positions gradually

### Stop Loss Strategies

• **Percentage-based**: Exit at 20-50% loss on premium
• **Time-based**: Close positions at certain days to expiration
• **Technical levels**: Use support/resistance as exit points
• **Risk**: Avoid letting small losses become large ones

### Portfolio Management

• **Diversification**: Don't put all capital in one strategy
• **Delta management**: Monitor total portfolio delta
• **Theta optimization**: Balance short-term vs long-term positions
• **Correlation awareness**: Avoid multiple positions on correlated stocks

### Common Mistakes to Avoid

• **Overleveraging**: Using too much capital on high-risk trades
• **Ignoring Greeks**: Not understanding your position's sensitivities
• **Revenge trading**: Trying to recover losses with bigger bets
• **No exit plan**: Always know when to take profits or cut losses

### Professional Tips

• Keep a **trading journal** to track and learn from every trade
• Review positions daily and adjust as needed
• Set profit targets before entering trades
• **Risk-reward ratio**: Aim for at least 1:2 ratio`,
      },
    ]);

    // Insert glossary terms
    await db.insert(schema.glossaryTerms).values([
      { term: "Call Option", definition: "A contract giving the buyer the right, but not obligation, to purchase an asset at a specified price within a specific time period." },
      { term: "Put Option", definition: "A contract giving the buyer the right, but not obligation, to sell an asset at a specified price within a specific time period." },
      { term: "Strike Price", definition: "The predetermined price at which the option contract can be exercised." },
      { term: "Expiration Date", definition: "The last day an option contract can be exercised before it becomes worthless." },
      { term: "Premium", definition: "The price paid by the buyer to purchase an option contract." },
      { term: "In The Money (ITM)", definition: "An option that has intrinsic value. For calls, when stock price > strike price. For puts, when stock price < strike price." },
      { term: "Out of The Money (OTM)", definition: "An option with no intrinsic value. For calls, when stock price < strike price. For puts, when stock price > strike price." },
      { term: "At The Money (ATM)", definition: "An option whose strike price is equal or very close to the current stock price." },
      { term: "Delta", definition: "Measures the rate of change in an option's price relative to a $1 change in the underlying asset." },
      { term: "Gamma", definition: "Measures the rate of change in Delta for a $1 change in the underlying asset." },
      { term: "Theta", definition: "Measures the rate of decline in an option's value due to the passage of time (time decay)." },
      { term: "Vega", definition: "Measures sensitivity to volatility. Shows how much an option's price changes for a 1% change in implied volatility." },
      { term: "Implied Volatility", definition: "The market's forecast of a likely movement in the underlying asset's price, reflected in option prices." },
      { term: "Intrinsic Value", definition: "The actual value of an option if exercised immediately. Difference between stock price and strike price for ITM options." },
      { term: "Extrinsic Value", definition: "The portion of an option's price that exceeds its intrinsic value. Also called time value." },
      { term: "Covered Call", definition: "Strategy where you own the stock and sell call options against it to generate income from premiums." },
      { term: "Cash-Secured Put", definition: "Selling put options while holding enough cash to purchase the stock if assigned." },
      { term: "Vertical Spread", definition: "Buying and selling options of the same type with the same expiration but different strike prices." },
      { term: "Iron Condor", definition: "Advanced strategy combining a bear call spread and bull put spread to profit from low volatility." },
      { term: "Assignment", definition: "When an option seller is required to fulfill their obligation (sell stock for calls, buy stock for puts)." },
    ]);

    console.log("Database seeded successfully with 20 unique testimonials and expanded watchlist!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
