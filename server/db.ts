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

- **Call Options**: Give you the right to BUY the underlying asset
  - Use when you expect the price to rise
  - **Risk**: Limited to the premium paid
  - **Example**: Buy a $100 call on stock trading at $95

- **Put Options**: Give you the right to SELL the underlying asset
  - Use when you expect the price to fall
  - **Risk**: Limited to the premium paid
  - **Example**: Buy a $100 put on stock trading at $105

- **Premium**: The price you pay for the option contract
  - This is the maximum loss for option buyers
  - Determined by intrinsic and extrinsic value

### Why Trade Options?

- **Leverage**: Control 100 shares with one contract for a fraction of the cost

- **Flexibility**: Profit from up, down, or sideways markets

- **Income Generation**: Sell options to collect premium income

- **Risk Management**: Hedge existing positions against losses`,
      },
      {
        title: "Options Greeks Mastery",
        content: `## Understanding the Greeks

The **Greeks** are risk metrics that measure how an option's price responds to various market factors. Mastering these is essential for successful options trading.

### Delta (Δ)

- Measures the rate of change in option price per $1 move in the underlying
  - **Call Delta**: Ranges from 0 to 1 (or 0% to 100%)
  - **Put Delta**: Ranges from -1 to 0 (or -100% to 0%)
  - **Example**: A call with 0.50 delta gains $0.50 when stock rises $1

- **Position Delta** tells you your directional exposure
  - **Positive delta**: Profits when stock rises
  - **Negative delta**: Profits when stock falls
  - **Delta-neutral**: Minimally affected by small price moves

### Gamma (Γ)

- Measures the rate of change of **Delta**
  - Shows how much delta will change per $1 move in stock
  - **High gamma**: Delta changes rapidly (near ATM options)
  - **Low gamma**: Delta changes slowly (deep ITM/OTM options)

### Theta (Θ)

- Measures **time decay** - how much value the option loses per day
  - Always negative for long options
  - Accelerates as expiration approaches
  - **Risk**: Options lose value even if the stock doesn't move
  - **Example**: -0.05 theta means losing $5/day per contract

### Vega (ν)

- Measures sensitivity to changes in **implied volatility**
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

- **When to use**: Neutral to slightly bullish outlook

- **Maximum profit**: Premium received + stock gains up to strike

- **Risk**: Missing out on gains above strike price

- **Example**: Own 100 shares at $50, sell $55 call for $2 premium

### Cash-Secured Put

Sell put options while holding cash to buy the stock if assigned.

- **When to use**: Want to buy stock at a lower price

- **Capital requirement**: Must have cash equal to strike × 100

- **Income strategy**: Collect premium while waiting to buy

- **Risk**: Required to buy stock at strike if price drops

- **Example**: Sell $45 put on $50 stock, collect $2 premium

### Protective Put

Buy put options to protect long stock positions from downside risk.

- **When to use**: Own stock but worried about short-term decline

- **Maximum loss**: Limited to strike price minus stock price

- **Cost**: Premium paid reduces overall profit

- **Example**: Own stock at $50, buy $48 put for downside protection`,
      },
      {
        title: "Spread Strategies",
        content: `## Spread Strategies for Risk Management

Spreads combine multiple options to reduce cost and define risk clearly.

### Vertical Spreads

Buy and sell options of the same type with different strike prices.

**Bull Call Spread**

- Buy lower strike call, sell higher strike call

- **Maximum profit**: Difference in strikes minus premium paid

- **Maximum loss**: Premium paid

- **Risk**: Limited on both sides

- **Example**: Buy $50 call, sell $55 call

**Bear Put Spread**

- Buy higher strike put, sell lower strike put

- Profits from downward movement

- **Maximum profit**: Difference in strikes minus premium paid

- **Risk**: Limited to premium paid

### Calendar Spreads (Horizontal)

- Sell near-term option, buy longer-term option at same strike

- Profits from **time decay** differences

- **When to use**: Expect low volatility short-term

- **Risk**: Increases if underlying moves significantly

### Diagonal Spreads

- Combines vertical and calendar spread concepts

- Different strikes AND different expirations

- More flexible for adjusting to market conditions

- **Advanced strategy**: Requires active management`,
      },
      {
        title: "Advanced Multi-Leg Strategies",
        content: `## Complex Strategies for Consistent Income

These advanced strategies offer defined risk/reward profiles for experienced traders.

### Iron Condor

Combines a **bear call spread** and a **bull put spread** to profit from low volatility.

- **Structure**: Sell OTM call + put, buy further OTM call + put

- **Maximum profit**: Total premium collected

- **Maximum loss**: Difference in strikes minus premium

- **When to use**: Expect the stock to stay within a range

- **Risk**: Losses if stock breaks out of the range

- **Example**: Sell $55 call and $45 put, buy $60 call and $40 put

### Butterfly Spread

Three strike prices with equal spacing to profit from minimal movement.

- **Structure**: Buy 1 ITM, sell 2 ATM, buy 1 OTM

- **Maximum profit**: At center strike at expiration

- **Risk**: Limited to premium paid

- **When to use**: Very low volatility expected

### Ratio Spreads

Unequal number of long and short options for asymmetric risk/reward.

- **Call Ratio Spread**: Buy 1 call, sell 2+ higher strike calls

- Profits if stock rises moderately

- **Risk**: Unlimited if stock rises too much

- **Advanced technique**: Requires careful position sizing`,
      },
      {
        title: "Risk Management Essentials",
        content: `## Protecting Your Capital

Proper risk management separates successful traders from the rest.

### Position Sizing Rules

- **Never risk more than 2-5% of capital on a single trade**

- Determine position size based on your account size

- **Example**: $10,000 account → Max $500 risk per trade

- Scale into positions gradually

### Stop Loss Strategies

- **Percentage-based**: Exit at 20-50% loss on premium

- **Time-based**: Close positions at certain days to expiration

- **Technical levels**: Use support/resistance as exit points

- **Risk**: Avoid letting small losses become large ones

### Portfolio Management

- **Diversification**: Don't put all capital in one strategy

- **Delta management**: Monitor total portfolio delta

- **Theta optimization**: Balance short-term vs long-term positions

- **Correlation awareness**: Avoid multiple positions on correlated stocks

### Common Mistakes to Avoid

- **Overleveraging**: Using too much capital on high-risk trades

- **Ignoring Greeks**: Not understanding your position's sensitivities

- **Revenge trading**: Trying to recover losses with bigger bets

- **No exit plan**: Always know when to take profits or cut losses

### Professional Tips

- Keep a **trading journal** to track and learn from every trade

- Review positions daily and adjust as needed

- Set profit targets before entering trades

- **Risk-reward ratio**: Aim for at least 1:2 ratio`,
      },
      {
        title: "Technical Analysis for Options",
        content: `## Using Charts to Time Options Trades

Technical analysis helps you identify optimal entry and exit points for options positions.

### Key Support and Resistance

- **Support**: Price level where stock tends to find buying pressure

- **Resistance**: Price level where stock tends to find selling pressure

- **Example**: Stock bounces at $50 support repeatedly

- Use these levels to set strike prices for options

### Trend Analysis

- **Uptrend**: Higher highs and higher lows

- **Downtrend**: Lower highs and lower lows

- **Sideways**: Trading within a range

- Match your option strategy to the trend

### Moving Averages

- **20-day MA**: Short-term trend indicator

- **50-day MA**: Medium-term trend indicator

- **200-day MA**: Long-term trend support/resistance

- Crossovers signal potential trend changes

### Volume Analysis

- **High volume**: Confirms price moves are significant

- **Low volume**: Moves may lack conviction

- **Example**: Breakout with high volume = more reliable

- Use volume to validate your option trades`,
      },
      {
        title: "Earnings Plays Strategy",
        content: `## Trading Options Around Earnings

Earnings season offers explosive profit potential but requires careful risk management.

### Before Earnings

- **IV Crush risk**: Implied volatility drops sharply after earnings

- **Direction unknown**: Stock can gap up or down unpredictably

- **Premium pricing**: Options are expensive before earnings

- Consider selling premium instead of buying

### Straddle Strategy for Earnings

- Buy both call and put at same strike

- Profits if stock moves significantly in either direction

- **Risk**: IV crush can hurt both positions

- Best for expecting large move but unsure of direction

### Strangle Strategy

- Buy OTM call and OTM put

- Lower cost than straddle

- Requires bigger move to profit

- **Example**: Stock at $100, buy $105 call and $95 put

### Selling Premium Before Earnings

- **Iron Condor**: Collect premium betting on small move

- **Covered Calls**: Generate income on stocks you own

- **Risk**: Unlimited losses if stock gaps beyond your strikes

- Only for experienced traders with risk management`,
      },
      {
        title: "Implied Volatility Deep Dive",
        content: `## Understanding and Trading Volatility

**Implied Volatility (IV)** is the market's expectation of future price movement.

### What IV Tells You

- **High IV**: Market expects big moves, options are expensive

- **Low IV**: Market expects stability, options are cheap

- **IV Rank**: Where current IV stands vs 52-week range

- **Example**: IV Rank of 80% means in top 20% of annual range

### Trading High IV

- **Sell premium**: Collect high premiums from expensive options

- **Iron Condors**: Profit from IV crush and time decay

- **Credit spreads**: Defined risk premium selling

- **Risk**: Stock can move more than expected

### Trading Low IV

- **Buy options**: Cheap premiums for directional bets

- **Long straddles**: Position for volatility expansion

- **Calendar spreads**: Benefit from future IV increase

- **Example**: Buy calls when IV is in bottom 20% of range

### IV Crush Events

- **Earnings**: IV drops 30-50% after announcement

- **FDA approvals**: Biotech stocks see massive IV changes

- **Elections**: Political uncertainty drives IV higher

- Plan your exits before these events`,
      },
      {
        title: "Options Chain Reading",
        content: `## Decoding the Options Chain

Learn to extract valuable information from options chains to make better trades.

### Bid-Ask Spread

- **Tight spread**: Liquid options, easy to enter/exit

- **Wide spread**: Illiquid, harder to get fair pricing

- **Example**: $0.05 spread is good, $0.50 spread is poor

- Always check spread before trading

### Open Interest

- **High open interest**: Many traders hold this strike

- **Low open interest**: Illiquid, avoid if possible

- **Significance**: Over 1,000 contracts is good liquidity

- Changes show where traders are positioning

### Volume

- **Today's trading activity** in each contract

- High volume = active trading and interest

- Compare to open interest for context

- **Example**: 5,000 volume on 10,000 OI shows activity

### The Greeks in Action

- **Delta**: Shows probability of expiring ITM

- **Theta**: Daily time decay amount

- **Vega**: Sensitivity to IV changes

- Compare across strikes to find best value`,
      },
      {
        title: "LEAPS Strategy",
        content: `## Long-Term Options for Leverage

**LEAPS** (Long-Term Equity Anticipation Securities) are options expiring 1+ years out.

### Why Use LEAPS

- **Lower capital requirement**: Control 100 shares for fraction of cost

- **More time**: Theta decay is slower on long-dated options

- **Leverage**: Magnified returns compared to stock ownership

- **Example**: $10,000 in LEAPS vs $10,000 in stock

### LEAPS as Stock Replacement

- Buy deep ITM calls (0.80+ delta)

- Acts similar to owning stock

- **Capital freed up**: Invest difference elsewhere

- **Risk**: Still can expire worthless unlike stock

### Selling Calls Against LEAPS

- Own LEAPS call, sell shorter-term calls against it

- Generate income like covered calls

- **Poor Man's Covered Call** strategy

- **Example**: Own Jan 2026 $50 call, sell weekly $55 calls

### LEAPS Diagonal Spreads

- Buy LEAPS, sell near-term options at higher strikes

- Collect premium monthly while maintaining long position

- Reduces cost basis over time

- **Risk**: Called away if stock surges past short strike`,
      },
      {
        title: "Weekly Options Strategy",
        content: `## Trading Short-Dated Options

Weekly options offer unique opportunities but require active management.

### Characteristics of Weeklies

- **Expire every Friday**: Fast-paced trading

- **High theta**: Rapid time decay accelerates profits/losses

- **Lower premiums**: Cheaper to enter positions

- **Risk**: Can lose 100% in days, not weeks

### Selling Weekly Premium

- **Cash-secured puts**: Generate weekly income

- **Covered calls**: Income on stocks you own

- **Credit spreads**: Defined risk premium collection

- **Example**: Sell Friday puts on Monday for quick profit

### Buying Weekly Calls/Puts

- **News-driven trades**: React to catalysts quickly

- **Technical breakouts**: Capitalize on momentum

- **Risk**: Time decay works against you rapidly

- Only hold for 1-3 days typically

### 0DTE (Zero Days to Expiration)

- **Options expiring today**: Extreme risk and reward

- **Gamma risk**: Prices move wildly near expiration

- **For advanced traders only**: Can lose everything in hours

- Small position sizes are crucial`,
      },
      {
        title: "Index Options Trading",
        content: `## Trading SPX, SPY, and Major Indices

Index options offer unique advantages over individual stock options.

### SPX vs SPY

- **SPX**: Cash-settled, European-style, Section 1256 tax treatment

- **SPY**: Stock-settled, American-style, standard capital gains

- **Multiplier**: SPX is 10x SPY (SPX $500 vs SPY $50)

- **Liquidity**: Both highly liquid with tight spreads

### Benefits of Index Options

- **Diversification**: Not subject to single-stock risk

- **Tax advantages**: SPX has 60/40 tax treatment

- **Cash settlement**: No assignment risk on SPX

- **Earnings immunity**: Indices don't report earnings

### Popular Index Strategies

- **Iron Condors**: Profit from range-bound markets

- **Credit spreads**: High probability income trades

- **0DTE trades**: Daily income opportunities on SPX

- **Example**: Sell SPX iron condor for $200 credit

### Risk Management

- **Position sizing**: Never risk more than 2% per trade

- **Defined risk**: Use spreads instead of naked options

- **Market hours**: SPX trades 15 extra hours per week

- **Volatility awareness**: Watch VIX for risk assessment`,
      },
      {
        title: "Assignment and Exercise",
        content: `## Understanding Assignment Risk

Know what happens when options are assigned and how to avoid surprises.

### When Assignment Happens

- **ITM options at expiration**: High probability of assignment

- **Early assignment**: Can occur anytime with American-style options

- **Dividends**: Calls assigned before ex-dividend date

- **Deep ITM options**: May be exercised early

### Assignment on Short Calls

- **You must sell 100 shares** at the strike price

- **If you don't own shares**: Forced to sell short

- **Margin requirement**: Can be substantial

- **Example**: Sold $50 call, stock at $60, must sell at $50

### Assignment on Short Puts

- **You must buy 100 shares** at the strike price

- **Capital requirement**: Strike price × 100

- **Margin or cash**: Must be in account

- **Example**: Sold $50 put, assigned, buy 100 shares at $50

### Avoiding Unwanted Assignment

- **Close positions before expiration**: Buy back short options

- **Roll positions**: Move to next expiration

- **Monitor ITM options**: Especially day of expiration

- **Dividends**: Close short calls before ex-div date`,
      },
      {
        title: "Options Tax Treatment",
        content: `## Tax Implications of Options Trading

Understand the tax consequences of your options strategies.

### Short-Term vs Long-Term

- **Most options**: Treated as short-term capital gains

- **Held less than 1 year**: Taxed at ordinary income rates

- **Long-term treatment**: Very rare with options

- **Example**: Profit on 30-day option = short-term gain

### Section 1256 Contracts

- **SPX, RUT, NDX**: Index options with special tax treatment

- **60/40 rule**: 60% long-term, 40% short-term automatically

- **Lower tax rate**: Significant savings for active traders

- **Example**: $10,000 profit on SPX options gets preferential tax

### Wash Sale Rules

- **Cannot claim loss** if you buy substantially identical position within 30 days

- **Applies to options too**: Buying call after selling call

- **Loss deferred**: Added to cost basis of replacement position

- **Plan carefully**: Time loss harvesting appropriately

### Record Keeping

- **Track every trade**: Date, strike, premium, expiration

- **Broker statements**: Use for tax preparation

- **Trading journal**: Supplement broker records

- **Tax software**: Consider options-specific tools`,
      },
      {
        title: "Position Adjustment Techniques",
        content: `## Managing Losing and Winning Positions

Learn when and how to adjust options positions for better outcomes.

### When to Adjust

- **Position moved against you**: Strike price threatened

- **Volatility changed**: IV expanded or crushed

- **Time running out**: Approaching expiration

- **Profit target reached early**: Consider taking profits

### Rolling Techniques

- **Roll out**: Extend to later expiration date

- **Roll up**: Move to higher strike price

- **Roll down**: Move to lower strike price

- **Diagonal roll**: Change both strike and expiration

### Reducing Cost Basis

- **Sell premium against position**: Turn loss into credit spread

- **Add additional legs**: Convert to spread

- **Average down**: Only if thesis still valid

- **Example**: Losing call → sell higher call (call spread)

### Profit Taking Strategies

- **50% profit rule**: Close when you've made 50% of max profit

- **Time-based**: Close at 21 days before expiration

- **Technical levels**: Exit at resistance/support

- **Risk-reward shift**: When risk/reward becomes unfavorable`,
      },
      {
        title: "Sector Rotation with Options",
        content: `## Using Options to Trade Sector Moves

Capitalize on sector rotations with leveraged ETF options strategies.

### Understanding Sector Rotation

- **Economic cycles**: Different sectors lead at different times

- **Growth vs Value**: Rotation between growth and defensive sectors

- **Interest rates**: Rising rates favor financials, hurt tech

- **Example**: XLF (financials) vs XLK (technology)

### Sector ETF Options

- **High liquidity**: Popular ETFs have tight spreads

- **Diversified exposure**: Avoid single-stock risk

- **Clear themes**: Trade macro trends

- **Examples**: XLE (energy), XLV (healthcare), XLF (financials)

### Pairing Trades

- **Long one sector, short another**: Profit from rotation

- **Example**: Long XLF calls, short XLK calls

- **Reduces market risk**: Focus on relative performance

- **Requires correlation analysis**: Understand relationships

### Timing Sector Trades

- **Fed policy changes**: Interest rate environments

- **Economic data**: GDP, employment, inflation

- **Seasonal patterns**: Energy in summer, retail in Q4

- **Technical breakouts**: Relative strength indicators`,
      },
      {
        title: "Advanced Greeks Management",
        content: `## Mastering Portfolio Greeks

Take your trading to the next level by managing total portfolio Greeks.

### Portfolio Delta

- **Net directional exposure**: Sum of all position deltas

- **Neutral portfolio**: Close to zero delta

- **Positive delta**: Profits from market rise

- **Example**: +500 delta = 500 shares long equivalent

### Portfolio Gamma

- **Rate of delta change**: How fast your delta moves

- **Long gamma**: Delta increases as market moves favorably

- **Short gamma**: Delta works against you with movement

- **Risk assessment**: High gamma = high risk and reward

### Portfolio Theta

- **Daily P&L decay**: How much you make/lose per day

- **Positive theta**: Time working for you

- **Negative theta**: Paying for time

- **Income strategies**: Aim for positive theta portfolio

### Portfolio Vega

- **Volatility exposure**: Sensitivity to IV changes

- **Long vega**: Profit from rising volatility

- **Short vega**: Profit from falling volatility

- **VIX correlation**: Hedge vega with VIX products`,
      },
      {
        title: "Hedge Strategies",
        content: `## Protecting Your Portfolio with Options

Use options to hedge against downside risk while maintaining upside potential.

### Portfolio Insurance

- **Protective puts**: Buy puts on stocks you own

- **Index puts**: Hedge entire portfolio with SPY/SPX puts

- **Cost**: Pay premium for protection

- **Example**: Own 1000 shares, buy 10 puts for insurance

### Collar Strategy

- Buy protective put, sell covered call to offset cost

- **Zero cost collar**: Premiums offset each other

- **Limited upside**: Capped at call strike

- **Limited downside**: Protected at put strike

### Tail Risk Hedging

- **Far OTM puts**: Cheap insurance against crashes

- **Low probability**: Most expire worthless

- **High payoff**: Massive returns in crashes

- **Example**: Buy SPY $300 puts when SPY at $450

### Dynamic Hedging

- **Adjust hedges** based on market conditions

- **VIX-based**: Increase hedges when VIX is low

- **Delta hedging**: Maintain neutral exposure

- **Rebalance regularly**: Weekly or monthly reviews`,
      },
      {
        title: "Building a Trading Plan",
        content: `## Creating Your Personal Options Trading Strategy

Develop a comprehensive trading plan for consistent success.

### Define Your Goals

- **Income generation**: Weekly premium collection

- **Growth**: Leveraged directional plays

- **Capital preservation**: Conservative spreads

- **Example**: Target 2-3% monthly returns with max 5% drawdown

### Strategy Selection

- **Match strategies to goals**: Income → sell premium

- **Account size**: Spreads need less capital than naked options

- **Risk tolerance**: Define maximum acceptable loss

- **Time commitment**: Day trading vs position trading

### Entry Rules

- **Technical signals**: Specific chart patterns or indicators

- **Fundamental triggers**: Earnings, economic data

- **Volatility criteria**: Only trade when IV is favorable

- **Example**: Only sell premium when IV Rank > 50%

### Exit Rules

- **Profit targets**: Close at 50% of max profit

- **Stop losses**: Exit at 2x credit received

- **Time-based**: Close 21 days before expiration

- **Adjustment triggers**: When to roll vs close

### Performance Tracking

- **Win rate**: Percentage of profitable trades

- **Average P&L**: Expected value per trade

- **Max drawdown**: Largest peak-to-trough decline

- **Monthly reviews**: Analyze what's working and adjust`,
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
