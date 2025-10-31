import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation, Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, TrendingUp, ArrowLeft, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { marked } from "marked";
import type { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const postId = params.id ? parseInt(params.id) : null;

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const post = posts?.find((p) => p.id === postId);

  // Convert markdown content to HTML with proper spacing
  const htmlContent = useMemo(() => {
    if (!post?.content) return "";
    
    // Configure marked for better formatting
    marked.setOptions({
      breaks: true,
      gfm: true,
    });
    
    return marked.parse(post.content);
  }, [post?.content]);

  useEffect(() => {
    if (post) {
      const previousTitle = document.title;
      document.title = `${post.title} | Options Trading University Blog`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      const previousDescription = metaDescription?.getAttribute("content") || "";
      if (metaDescription) {
        metaDescription.setAttribute("content", post.excerpt);
      }

      let ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
      const hadOgTitle = !!ogTitle;
      const previousOgTitle = ogTitle?.content || "";
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute("property", "og:title");
        document.head.appendChild(ogTitle);
      }
      ogTitle.content = post.title;

      let ogDescription = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
      const hadOgDescription = !!ogDescription;
      const previousOgDescription = ogDescription?.content || "";
      if (!ogDescription) {
        ogDescription = document.createElement('meta');
        ogDescription.setAttribute("property", "og:description");
        document.head.appendChild(ogDescription);
      }
      ogDescription.content = post.excerpt;

      const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.excerpt,
        "author": {
          "@type": "Person",
          "name": post.author
        },
        "datePublished": post.date,
        "publisher": {
          "@type": "Organization",
          "name": "Options Trading University",
          "logo": {
            "@type": "ImageObject",
            "url": window.location.origin + "/favicon.ico"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": window.location.href
        }
      };
      
      const schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.setAttribute('data-blog-post-schema', 'true');
      schemaScript.textContent = JSON.stringify(schema);
      document.head.appendChild(schemaScript);

      return () => {
        const blogSchema = document.querySelector('script[data-blog-post-schema="true"]');
        if (blogSchema && blogSchema.parentNode) {
          blogSchema.remove();
        }
        document.title = previousTitle;
        if (metaDescription && previousDescription) {
          metaDescription.setAttribute("content", previousDescription);
        }
        
        const ogT = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
        if (ogT) {
          if (hadOgTitle && previousOgTitle) {
            ogT.content = previousOgTitle;
          } else if (!hadOgTitle) {
            ogT.remove();
          }
        }
        
        const ogD = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
        if (ogD) {
          if (hadOgDescription && previousOgDescription) {
            ogD.content = previousOgDescription;
          } else if (!hadOgDescription) {
            ogD.remove();
          }
        }
      };
    }
  }, [post]);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "Blog post link has been copied to your clipboard.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6 space-y-4">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold">Article Not Found</h2>
            <p className="text-muted-foreground">
              Sorry, we couldn't find the article you're looking for.
            </p>
            <Button
              onClick={() => setLocation("/blog")}
              className="bg-gradient-to-r from-primary to-secondary"
              data-testid="button-back-to-blog"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Blog
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => setLocation("/blog")}
          className="mb-4"
          data-testid="button-back"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Blog
        </Button>

        {/* Article Header */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="text-sm" data-testid="badge-category">
              {post.category}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span data-testid="text-date">{post.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span data-testid="text-read-time">{post.readTime}</span>
            </div>
          </div>

          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight"
            data-testid="title-post"
          >
            {post.title}
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed" data-testid="text-excerpt">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="font-semibold" data-testid="text-author">By {post.author}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              data-testid="button-share"
            >
              <Share2 className="mr-2 w-4 h-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Article Content */}
        <Card className="border-2">
          <CardContent className="pt-8">
            <div 
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-foreground
                prose-h1:text-4xl prose-h1:mt-10 prose-h1:mb-6
                prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-5
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
                prose-strong:text-foreground prose-strong:font-bold
                prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
                prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
                prose-li:text-muted-foreground prose-li:mb-3 prose-li:leading-relaxed prose-li:text-lg
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-code:text-primary prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-6"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
              data-testid="content-post"
            />
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="py-8 text-center space-y-4">
            <h3 className="text-2xl font-bold">Ready to Master Options Trading?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of traders learning proven strategies and earning consistent profits with our expert mentorship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                onClick={() => setLocation("/")}
                data-testid="button-get-started"
              >
                Get Started Today
              </Button>
              <Button
                variant="outline"
                onClick={() => setLocation("/blog")}
                data-testid="button-more-articles"
              >
                Read More Articles
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
