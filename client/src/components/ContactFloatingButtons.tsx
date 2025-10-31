import { useState } from "react";
import { MessageCircle, Send, Copy, Check, ExternalLink } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { useLocation } from "wouter";
import { trackTelegramClick, trackDiscordClick } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export function ContactFloatingButtons() {
  const [location] = useLocation();
  const [telegramOpen, setTelegramOpen] = useState(false);
  const [discordOpen, setDiscordOpen] = useState(false);
  const [telegramCopied, setTelegramCopied] = useState(false);
  const [discordCopied, setDiscordCopied] = useState(false);
  const { toast } = useToast();

  const telegramUsername = "@thewealthprince0";
  const telegramLink = "https://t.me/thewealthprince0";
  const discordInvite = "https://discord.gg/zruqE5wB";

  const handleTelegramClick = () => {
    trackTelegramClick(location);
    setTelegramOpen(true);
  };

  const handleDiscordClick = () => {
    trackDiscordClick(location);
    setDiscordOpen(true);
  };

  const copyToClipboard = async (text: string, type: "telegram" | "discord") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "telegram") {
        setTelegramCopied(true);
        setTimeout(() => setTelegramCopied(false), 2000);
      } else {
        setDiscordCopied(true);
        setTimeout(() => setDiscordCopied(false), 2000);
      }
      toast({
        title: "Copied!",
        description: `${type === "telegram" ? "Telegram username" : "Discord invite link"} copied to clipboard.`,
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try copying manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="fixed bottom-24 right-4 md:right-6 z-40 flex flex-row md:flex-col gap-2">
        <Button
          onClick={handleTelegramClick}
          size="icon"
          className="h-10 w-10 md:h-11 md:w-11 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all duration-300 hover:scale-105 opacity-90 hover:opacity-100 group"
          data-testid="floating-telegram-button"
          title="Message on Telegram"
        >
          <Send className="h-4 w-4 md:h-5 md:w-5 text-white" />
        </Button>
        
        <Button
          onClick={handleDiscordClick}
          size="icon"
          className="h-10 w-10 md:h-11 md:w-11 rounded-full shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 dark:from-indigo-600 dark:to-purple-700 dark:hover:from-indigo-700 dark:hover:to-purple-800 transition-all duration-300 hover:scale-105 opacity-90 hover:opacity-100 group"
          data-testid="floating-discord-button"
          title="Join Discord Community"
        >
          <SiDiscord className="h-4 w-4 md:h-5 md:w-5 text-white" />
        </Button>
      </div>

      <Dialog open={telegramOpen} onOpenChange={setTelegramOpen}>
        <DialogContent className="sm:max-w-md" data-testid="telegram-modal">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                <Send className="h-5 w-5 text-white" />
              </div>
              Message on Telegram
            </DialogTitle>
            <DialogDescription>
              Copy the username below to message us on Telegram or click to open directly.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 p-3 bg-muted dark:bg-muted/50 rounded-lg font-mono text-sm">
                {telegramUsername}
              </div>
              <Button
                size="icon"
                variant="outline"
                onClick={() => copyToClipboard(telegramUsername, "telegram")}
                data-testid="copy-telegram-button"
              >
                {telegramCopied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              onClick={() => {
                window.open(telegramLink, "_blank");
                setTelegramOpen(false);
              }}
              data-testid="open-telegram-button"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Open Telegram
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={discordOpen} onOpenChange={setDiscordOpen}>
        <DialogContent className="sm:max-w-md" data-testid="discord-modal">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <SiDiscord className="h-5 w-5 text-white" />
              </div>
              Join Discord Community
            </DialogTitle>
            <DialogDescription>
              Copy the invite link below or click to join our Discord community.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 p-3 bg-muted dark:bg-muted/50 rounded-lg font-mono text-sm break-all">
                {discordInvite}
              </div>
              <Button
                size="icon"
                variant="outline"
                onClick={() => copyToClipboard(discordInvite, "discord")}
                data-testid="copy-discord-button"
              >
                {discordCopied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              onClick={() => {
                window.open(discordInvite, "_blank");
                setDiscordOpen(false);
              }}
              data-testid="open-discord-button"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Join Discord
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function ContactCTA({ onContactClick }: { onContactClick?: () => void }) {
  const [location] = useLocation();

  const handleTelegramClick = () => {
    trackTelegramClick(location);
    if (onContactClick) {
      onContactClick();
    }
  };

  const handleDiscordClick = () => {
    trackDiscordClick(location);
    window.open("https://discord.gg/zruqE5wB", "_blank");
  };

  return (
    <div className="relative w-full overflow-hidden mb-24">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/90 dark:from-primary/70 dark:via-primary/60 dark:to-secondary/70" />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.2),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(0,0,0,0))]" />
      
      <div className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-6 mb-10">
            <div className="inline-flex items-center gap-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm px-6 py-2 rounded-full border border-white/30 dark:border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white dark:text-white font-bold text-sm">🔥 1,500+ Active Traders Online Now</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white dark:text-white leading-tight drop-shadow-2xl">
              Ready to Join the Winners?
            </h2>
            
            <p className="text-xl md:text-2xl text-white/95 dark:text-white/90 max-w-3xl mx-auto font-semibold leading-relaxed">
              Get instant access to expert trade alerts, live mentorship, and a community of profitable traders.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto mb-8">
            <Button
              onClick={handleTelegramClick}
              size="lg"
              className="group relative overflow-hidden bg-white hover:bg-gray-50 dark:bg-white dark:hover:bg-gray-100 text-primary font-black px-8 py-8 text-xl shadow-2xl transition-all duration-300 hover:scale-105"
              data-testid="cta-telegram-button"
            >
              <div className="relative flex items-center justify-center gap-3">
                <Send className="h-7 w-7" />
                <div className="text-left">
                  <div className="text-xl font-black">Message a Mentor</div>
                  <div className="text-xs font-semibold opacity-80">Get Started on Telegram</div>
                </div>
              </div>
            </Button>
            
            <Button
              onClick={handleDiscordClick}
              size="lg"
              className="group relative overflow-hidden bg-[#5865F2] hover:bg-[#4752C4] dark:bg-[#5865F2] dark:hover:bg-[#4752C4] text-white font-black px-8 py-8 text-xl shadow-2xl transition-all duration-300 hover:scale-105"
              data-testid="cta-discord-button"
            >
              <div className="relative flex items-center justify-center gap-3">
                <SiDiscord className="h-7 w-7" />
                <div className="text-left">
                  <div className="text-xl font-black">Join Discord</div>
                  <div className="text-xs font-semibold opacity-90">Community & Trade Alerts</div>
                </div>
              </div>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-6">
            <div className="bg-white/15 dark:bg-black/25 backdrop-blur-sm rounded-lg p-4 border border-white/25 dark:border-white/15 text-center">
              <div className="text-3xl font-black text-white dark:text-white mb-1">76%</div>
              <div className="text-sm text-white/95 dark:text-white/90 font-semibold">Win Rate</div>
            </div>
            <div className="bg-white/15 dark:bg-black/25 backdrop-blur-sm rounded-lg p-4 border border-white/25 dark:border-white/15 text-center">
              <div className="text-3xl font-black text-white dark:text-white mb-1">$8,734</div>
              <div className="text-sm text-white/95 dark:text-white/90 font-semibold">Avg Profit/Win</div>
            </div>
            <div className="bg-white/15 dark:bg-black/25 backdrop-blur-sm rounded-lg p-4 border border-white/25 dark:border-white/15 text-center">
              <div className="text-3xl font-black text-white dark:text-white mb-1">11+</div>
              <div className="text-sm text-white/95 dark:text-white/90 font-semibold">Years Experience</div>
            </div>
          </div>

          <div className="text-center space-y-3">
            <div className="flex flex-wrap justify-center gap-3 text-white/95 dark:text-white/90 text-sm md:text-base font-bold">
              <span className="flex items-center gap-1">✅ Instant Access</span>
              <span className="hidden md:inline text-white/50 dark:text-white/40">•</span>
              <span className="flex items-center gap-1">✅ Real-Time Alerts</span>
              <span className="hidden md:inline text-white/50 dark:text-white/40">•</span>
              <span className="flex items-center gap-1">✅ Expert Mentors</span>
              <span className="hidden md:inline text-white/50 dark:text-white/40">•</span>
              <span className="flex items-center gap-1">✅ Proven Strategies</span>
            </div>
            <p className="text-white/95 dark:text-white/90 text-lg font-black">
              ⚡ Our next winning trade could be minutes away!
            </p>
          </div>
        </div>
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
