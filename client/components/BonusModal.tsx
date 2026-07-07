import { useEffect, useState } from "react";
import { X, Zap } from "lucide-react";

export function BonusModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(() => {
    // Check if modal was already shown in this session
    return localStorage.getItem("bonusModalShown") === "true";
  });

  useEffect(() => {
    if (hasShown) return;

    // Show modal after 30 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
      localStorage.setItem("bonusModalShown", "true");
      setHasShown(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, [hasShown]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClaimBonus = () => {
    window.location.href = "/register";
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative bg-gradient-to-br from-[#0a0f19] to-[#070b14] rounded-3xl border border-[#39ff14]/20 shadow-2xl max-w-md w-full overflow-hidden neon-border">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#39ff14]/10 transition-colors text-gray-400 hover:text-[#39ff14] z-10"
          >
            <X size={24} />
          </button>

          {/* Content */}
          <div className="p-8 text-center">
            {/* Icon */}
            <div className="mb-4 flex justify-center">
              <div className="p-4 rounded-full bg-gradient-to-br from-[#39ff14]/20 to-[#39ff14]/5 border border-[#39ff14]/30">
                <Zap className="w-8 h-8 text-[#39ff14]" />
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-bold text-white mb-2">
              Special Bonus
            </h2>
            <p className="text-[#39ff14] font-semibold text-lg mb-4">
              100% Welcome Bonus
            </p>

            {/* Description */}
            <p className="text-gray-400 mb-6 leading-relaxed">
              Unlock exclusive premium predictions and double your betting power with our welcome bonus up to 1,000 USDT.
            </p>

            {/* Benefits */}
            <div className="space-y-2 mb-8 text-left">
              <div className="flex items-center gap-3 text-gray-300">
                <span className="text-[#39ff14]">✓</span>
                <span>Instant 100% match bonus</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <span className="text-[#39ff14]">✓</span>
                <span>Access to premium tips</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <span className="text-[#39ff14]">✓</span>
                <span>No wagering requirements</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleClaimBonus}
                className="w-full bg-[#39ff14] hover:bg-[#39ff14]/90 text-black font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Claim Your Bonus
              </button>
              <button
                onClick={handleClose}
                className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold py-3 rounded-xl transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-[#39ff14]/5 border-t border-[#39ff14]/10 text-center text-xs text-gray-500">
            Limited time offer. 18+ Gamble Responsibly.
          </div>
        </div>
      </div>
    </>
  );
}
