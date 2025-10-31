import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { TelegramContactModal } from "@/components/telegram-contact-modal";

export function FloatingJoinButton() {
  const [showTelegramModal, setShowTelegramModal] = useState(false);

  const handleClick = () => {
    setShowTelegramModal(true);
  };

  const telegramUsername = "@thewealthprince0";
  const telegramUrl = "https://t.me/thewealthprince0";

  return (
    <>
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-[100]">
        <Button
          size="sm"
          className="rounded-full shadow-lg bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-all duration-300 px-4 py-2 opacity-90 hover:opacity-100"
          data-testid="button-floating-join"
          onClick={handleClick}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          <span className="font-semibold text-sm">Join</span>
        </Button>
      </div>

      <TelegramContactModal
        open={showTelegramModal}
        onOpenChange={setShowTelegramModal}
        telegramUsername={telegramUsername}
        telegramUrl={telegramUrl}
      />
    </>
  );
}
