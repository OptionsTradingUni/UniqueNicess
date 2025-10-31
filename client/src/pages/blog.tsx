import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, TrendingUp, Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  useEffect(() => {
    document.title = "Options Trading Blog - Expert Tips, Strategies & Market Insights | Options Trading University";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", 
        "Learn options trading strategies, technical analysis, and market insights from expert traders. Discover how to make money with options, day trading tips, passive income strategies, and more."
      );
    }

    const metaKeywords = document.createElement('meta');
    metaKeywords.name = "keywords";
    metaKeywords.content = "options trading, how to trade options, options strategies, day trading, passive income, stock market, trading for beginners, options Greeks, technical analysis, 0DTE trading, covered calls, iron condor, options income";
    document.head.appendChild(metaKeywords);

    const ogTitle = document.createElement('meta');
    ogTitle.setAttribute("property", "og:title");
    ogTitle.content = "Options Trading Blog - Expert Trading Strategies & Market Analysis";
    document.head.appendChild(ogTitle);

    const ogDescription = document.createElement('meta');
    ogDescription.setAttribute("property", "og:description");
    ogDescription.content = "Master options trading with expert insights, proven strategies, and actionable market analysis. Learn from successful traders.";
    document.head.appendChild(ogDescription);

    return () => {
      const keywords = document.querySelector('meta[name="keywords"]');
      if (keywords) keywords.remove();
      const ogT = document.querySelector('meta[property="og:title"]');
      if (ogT) ogT.remove();
      const ogD = document.querySelector('meta[property="og:description"]');
      if (ogD) ogD.remove();
    };
  }, []);

  const categories = posts
    ? ["All", ...Array.from(new Set(posts.map((post) => post.category)))]
    : ["All"];

  const filteredPosts = posts?.filter((post) => {
    const matchesSearch =
      searchTerm === "" ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts?.[0];
  const regularPosts = filteredPosts?.slice(1);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header with SEO-rich content */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Options Trading Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Master options trading with expert strategies, market analysis, and proven techniques. 
            Learn from successful traders and grow your trading knowledge.
          </p>
          <div className="flex flex-wrap gap-2 justify-center pt-4">
            <Badge variant="outline" className="text-sm">Options Strategies</Badge>
            <Badge variant="outline" className="text-sm">Day Trading</Badge>
            <Badge variant="outline" className="text-sm">Technical Analysis</Badge>
            <Badge variant="outline" className="text-sm">Passive Income</Badge>
            <Badge variant="outline" className="text-sm">Market Insights</Badge>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search trading strategies, options tips, market analysis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-lg border-2 focus-visible:ring-primary"
              data-testid="input-search-blog"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                className={selectedCategory === category ? "bg-gradient-to-r from-primary to-secondary" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          {searchTerm && (
            <p className="text-center text-muted-foreground">
              Found {filteredPosts?.length || 0} {filteredPosts?.length === 1 ? 'article' : 'articles'}
            </p>
          )}
        </div>

        {/* Featured Post */}
        {featuredPost && !searchTerm && (
          <div className="relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 text-sm font-bold">
                ⭐ Featured Article
              </Badge>
            </div>
            <Card 
              className="border-2 border-primary/50 hover-elevate transition-all overflow-hidden"
              data-testid={`card-featured-post-${featuredPost.id}`}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="secondary" data-testid={`badge-category-${featuredPost.id}`}>
                    {featuredPost.category}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <CardTitle className="text-3xl md:text-4xl font-black leading-tight hover:text-primary transition-colors" data-testid={`title-post-${featuredPost.id}`}>
                  {featuredPost.title}
                </CardTitle>
                <CardDescription className="text-lg leading-relaxed" data-testid={`excerpt-post-${featuredPost.id}`}>
                  {featuredPost.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4" />
                  <span>By {featuredPost.author}</span>
                </div>
                <Button 
                  className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  data-testid={`button-read-${featuredPost.id}`}
                  asChild
                >
                  <Link href={`/blog/${featuredPost.id}`}>
                    Read Full Article
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Blog Posts Grid */}
        {regularPosts && regularPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <Card
                key={post.id}
                className="border-card-border hover-elevate transition-all flex flex-col"
                data-testid={`card-post-${post.id}`}
              >
                <CardHeader className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Badge variant="outline" className="text-xs" data-testid={`badge-category-${post.id}`}>
                      {post.category}
                    </Badge>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold leading-tight hover:text-primary transition-colors line-clamp-2" data-testid={`title-post-${post.id}`}>
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 text-sm" data-testid={`excerpt-post-${post.id}`}>
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="text-xs">{post.author}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full group"
                    data-testid={`button-read-${post.id}`}
                    asChild
                  >
                    <Link href={`/blog/${post.id}`}>
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredPosts?.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-bold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                data-testid="button-clear-filters"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* SEO Footer Content */}
        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="py-8 text-center space-y-4">
            <h2 className="text-2xl font-bold">Learn Options Trading from the Experts</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Our blog covers everything from options trading for beginners to advanced strategies used by professional traders. 
              Whether you're learning how to trade options, looking for passive income strategies, or mastering technical analysis, 
              we provide actionable insights to help you succeed in the markets.
            </p>
            <div className="flex flex-wrap gap-2 justify-center pt-4">
              <span className="text-sm text-muted-foreground">Popular topics:</span>
              <Badge variant="outline">Options Greeks</Badge>
              <Badge variant="outline">Day Trading 0DTE</Badge>
              <Badge variant="outline">Covered Calls</Badge>
              <Badge variant="outline">Iron Condors</Badge>
              <Badge variant="outline">Small Account Trading</Badge>
              <Badge variant="outline">Risk Management</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
