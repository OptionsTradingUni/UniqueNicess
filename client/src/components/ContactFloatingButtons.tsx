import { MessageCircle, Send } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { useLocation } from "wouter";
import { trackTelegramClick, trackDiscordClick } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

export function ContactFloatingButtons() {
  const [location] = useLocation();

  const handleTelegramClick = () => {
    trackTelegramClick(location);
    window.open("https://t.me/thewealthprince0", "_blank");
  };

  const handleDiscordClick = () => {
    trackDiscordClick(location);
    window.open("https://discord.gg/zruqE5wB", "_blank");
  };

  return (
    <div className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-40 flex flex-row md:flex-col gap-3">
      <Button
        onClick={handleTelegramClick}
        size="lg"
        className="h-12 w-12 md:h-14 md:w-14 rounded-full shadow-2xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all duration-300 hover:scale-110 group"
        data-testid="floating-telegram-button"
        title="Message on Telegram"
      >
        <Send className="h-5 w-5 md:h-6 md:w-6 text-white group-hover:rotate-12 transition-transform" />
      </Button>
      
      <Button
        onClick={handleDiscordClick}
        size="lg"
        className="h-12 w-12 md:h-14 md:w-14 rounded-full shadow-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 dark:from-indigo-600 dark:to-purple-700 dark:hover:from-indigo-700 dark:hover:to-purple-800 transition-all duration-300 hover:scale-110 group"
        data-testid="floating-discord-button"
        title="Join Discord Community"
      >
        <SiDiscord className="h-5 w-5 md:h-6 md:w-6 text-white group-hover:scale-110 transition-transform" />
      </Button>
    </div>
  );
}

export function ContactCTA() {
  const [location] = useLocation();

  const handleTelegramClick = () => {
    trackTelegramClick(location);
    window.open("https://t.me/thewealthprince0", "_blank");
  };

  const handleDiscordClick = () => {
    trackDiscordClick(location);
    window.open("https://discord.gg/zruqE5wB", "_blank");
  };

  return (
    <div className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-700 dark:via-purple-700 dark:to-pink-700 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Start Your Trading Journey?
        </h2>
        <p className="text-xl text-white/90 mb-8">
          Join our community of successful traders. Get personalized mentorship, proven strategies, and real-time trade alerts!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={handleTelegramClick}
            size="lg"
            className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 dark:bg-white dark:text-blue-700 dark:hover:bg-blue-50 font-bold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            data-testid="cta-telegram-button"
          >
            <Send className="mr-2 h-5 w-5" />
            Message Me on Telegram
          </Button>
          
          <Button
            onClick={handleDiscordClick}
            size="lg"
            variant="outline"
            className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white/10 dark:border-white dark:text-white dark:hover:bg-white/10 font-bold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            data-testid="cta-discord-button"
          >
            <SiDiscord className="mr-2 h-5 w-5" />
            Join Discord Community
          </Button>
        </div>
        
        <p className="mt-6 text-white/80 text-sm">
          💬 Get instant responses • 📱 Mobile-friendly • 🔥 Active community 24/7
        </p>
      </div>
    </div>
  );
}

export function InlineContactButtons({ variant = "default" }: { variant?: "default" | "compact" }) {
  const [location] = useLocation();

  const handleTelegramClick = () => {
    trackTelegramClick(location);
    window.open("https://t.me/thewealthprince0", "_blank");
  };

  const handleDiscordClick = () => {
    trackDiscordClick(location);
    window.open("https://discord.gg/zruqE5wB", "_blank");
  };

  if (variant === "compact") {
    return (
      <div className="flex gap-2">
        <Button
          onClick={handleTelegramClick}
          size="sm"
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          data-testid="inline-telegram-button"
        >
          <Send className="mr-1 h-4 w-4" />
          Telegram
        </Button>
        <Button
          onClick={handleDiscordClick}
          size="sm"
          variant="outline"
          className="border-purple-500 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-950"
          data-testid="inline-discord-button"
        >
          <SiDiscord className="mr-1 h-4 w-4" />
          Discord
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        onClick={handleTelegramClick}
        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800"
        data-testid="inline-telegram-button-full"
      >
        <Send className="mr-2 h-4 w-4" />
        Message on Telegram
      </Button>
      <Button
        onClick={handleDiscordClick}
        variant="outline"
        className="border-purple-500 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-950"
        data-testid="inline-discord-button-full"
      >
        <SiDiscord className="mr-2 h-4 w-4" />
        Join Discord
      </Button>
    </div>
  );
}
