import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function TikTokDetector() {
  const [showTikTokModal, setShowTikTokModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    const isTikTok = userAgent.includes("TikTok") || userAgent.includes("musical_ly");
    
    if (isTikTok) {
      setTimeout(() => setShowTikTokModal(true), 13000);
    }
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Paste this link in your browser to continue",
    });
  };

  const telegramLink = "https://t.me/thewealthprince0";
  const discordLink = "https://discord.gg/zruqE5wB";

  const copyTelegramLink = () => {
    navigator.clipboard.writeText(telegramLink);
    toast({
      title: "Telegram Link Copied!",
      description: "Open Telegram and paste this link to message a mentor",
    });
  };

  const copyDiscordLink = () => {
    navigator.clipboard.writeText(discordLink);
    toast({
      title: "Discord Link Copied!",
      description: "Open Discord and paste this link to join our community",
    });
  };

  return (
    <Dialog open={showTikTokModal} onOpenChange={setShowTikTokModal}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-tiktok">
        <DialogHeader>
          <DialogTitle>Connect With Us!</DialogTitle>
          <DialogDescription>
            Join our trading community - choose your preferred platform below
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Card className="bg-muted">
            <CardContent className="pt-6 space-y-3">
              <p className="text-sm font-medium">Option 1: Copy & Open in Browser</p>
              <Button
                className="w-full"
                onClick={copyLink}
                data-testid="button-copy-link"
              >
                <Copy className="mr-2 w-4 h-4" />
                Copy Website Link
              </Button>
              <p className="text-xs text-muted-foreground">
                Tap the ⋯ menu → Open in Browser
              </p>
            </CardContent>
          </Card>

          <Card className="bg-primary/10">
            <CardContent className="pt-6 space-y-3">
              <p className="text-sm font-medium">Option 2: Message a Mentor on Telegram</p>
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600"
                onClick={copyTelegramLink}
                data-testid="button-copy-telegram"
              >
                <Copy className="mr-2 w-4 h-4" />
                Copy Telegram Link
              </Button>
              <p className="text-xs text-muted-foreground">
                Get instant 1-on-1 support from our trading mentors
              </p>
            </CardContent>
          </Card>

          <Card className="bg-secondary/10">
            <CardContent className="pt-6 space-y-3">
              <p className="text-sm font-medium">Option 3: Join Discord Community</p>
              <Button
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600"
                onClick={copyDiscordLink}
                data-testid="button-copy-discord"
              >
                <Copy className="mr-2 w-4 h-4" />
                Copy Discord Link
              </Button>
              <p className="text-xs text-muted-foreground">
                Connect with 1,500+ traders and share strategies
              </p>
            </CardContent>
          </Card>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowTikTokModal(false)}
            data-testid="button-close-tiktok-modal"
          >
            I'll Browse Here First
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
