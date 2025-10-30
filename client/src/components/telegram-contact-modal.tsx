import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

interface TelegramContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  telegramUsername: string;
  telegramUrl: string;
}

export function TelegramContactModal({ open, onOpenChange, telegramUsername, telegramUrl }: TelegramContactModalProps) {
  const { toast } = useToast();
  const discordLink = "https://discord.gg/zruqE5wB";

  const copyUsername = () => {
    navigator.clipboard.writeText(telegramUsername);
    toast({
      title: "Copied!",
      description: "Telegram username copied to clipboard",
    });
  };

  const copyDiscordLink = () => {
    navigator.clipboard.writeText(discordLink);
    toast({
      title: "Discord Link Copied!",
      description: "Paste this link to join our community",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-testid="modal-telegram-contact">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Let's Connect!
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <p className="text-center text-muted-foreground">
            Choose your preferred way to connect with our mentors
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-bold text-lg">📱 Message a Mentor on Telegram</h3>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={telegramUsername}
                  className="text-center font-mono"
                  data-testid="input-telegram-username"
                />
                <Button
                  variant="default"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90"
                  onClick={copyUsername}
                  data-testid="button-copy-telegram-username"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 text-lg py-6"
                asChild
                data-testid="button-open-telegram"
              >
                <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
                  Open on Telegram
                </a>
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Get instant 1-on-1 support and trade alerts
              </p>
            </div>

            <div className="border-t pt-4 space-y-2">
              <h3 className="font-bold text-lg">💬 Join Our Discord Community</h3>
              <Button
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-lg py-6"
                onClick={copyDiscordLink}
                data-testid="button-copy-discord-link"
              >
                <Copy className="mr-2 w-4 h-4" />
                Copy Discord Link
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Connect with 1,500+ successful traders
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
