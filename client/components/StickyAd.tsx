import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

interface Ad {
  text: string;
  link: string;
  image?: string;
}

const ads: Ad[] = [
  {
    text: "🔥 hot deals ",
    link: "https://s.click.aliexpress.com/e/_c4OM9Bmt",
    image: "//ae01.alicdn.com/kf/Sa90d5456d1ad40ea81ba2f8327c98dd7G.jpg_80x80.jp",
  },
  {
    text: "💼 Hire top freelancers today",
    link: "https://s.click.aliexpress.com/e/_c3a5TKdx",
    image: "https://ae01.alicdn.com/kf/S78ca92465bfa40e8b93d86842181f71eD.jpg_80x80.jp",
  },
  {
    text: "🚀 Grow your brand with us",
    link: "https://example.com/ad3",
    image: "//ae01.alicdn.com/kf/S2ac02034c0b440b69182d0693e438ff3M.jpg_350x350.jpg",
  },
   {
    text: "🚀 Grow your brand with us",
    link: "https://example.com/ad3",
    image: "//ae01.alicdn.com/kf/S2ac02034c0b440b69182d0693e438ff3M.jpg_350x350.jpg",
  },
   {
    text: "🚀 Grow your brand with us",
    link: "https://example.com/ad3",
    image: "//ae01.alicdn.com/kf/S2ac02034c0b440b69182d0693e438ff3M.jpg_350x350.jpg",
  },
   {
    text: "🚀Top On Sale Product Recommendations! ",
    link: " https://s.click.aliexpress.com/e/_c2woyBQ1",
    image: "//ae01.alicdn.com/kf/Sf132d1d8d1c74aaeac4855543ed8f1d4Y.jpg_350x350.jpg",
  },
   {
    text: "🚀 Grow your brand with us",
    link: "https://s.click.aliexpress.com/e/_c4PniHP7",
    image: "//ae01.alicdn.com/kf/S2ac02034c0b440b69182d0693e438ff3M.jpg_350x350.jpg",
  },
];

export const StickyAd = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const ad = ads[currentAd];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white z-50 shadow-2xl">
      {/* Main Ad Section */}
      <div className="flex items-center justify-center gap-4 px-4 sm:px-6 py-3">
        <span className="text-xs opacity-70 font-medium hidden sm:inline">Sponsored</span>
        <a
          href={ad.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center gap-3 hover:opacity-90 transition-opacity"
        >
          {ad.image && (
            <img
              src={ad.image}
              alt={ad.text}
              className="h-12 sm:h-16 w-auto object-cover rounded flex-shrink-0"
            />
          )}
          <span className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors text-sm sm:text-base">
            {ad.text}
          </span>
        </a>
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 text-white hover:text-slate-300 transition-colors p-1"
          aria-label="Close ad"
        >
          <X size={20} />
        </button>
      </div>

      {/* Embedded Links Section */}
      <div className="border-t border-slate-700 px-4 sm:px-6 py-2">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs">
          <Link
            to="/live"
            className="text-slate-300 hover:text-blue-400 transition-colors font-medium"
          >
            Live Matches
          </Link>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <Link
            to="/betting-guides"
            className="text-slate-300 hover:text-blue-400 transition-colors font-medium"
          >
            Betting Guides
          </Link>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <Link
            to="/stats"
            className="text-slate-300 hover:text-blue-400 transition-colors font-medium"
          >
            Statistics
          </Link>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <Link
            to="/about"
            className="text-slate-300 hover:text-blue-400 transition-colors font-medium"
          >
            About
          </Link>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <Link
            to="/contact"
            className="text-slate-300 hover:text-blue-400 transition-colors font-medium"
          >
            Contact
          </Link>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <Link
            to="/privacy"
            className="text-slate-300 hover:text-blue-400 transition-colors font-medium"
          >
            Privacy
          </Link>
        </div>
      </div>
    </div>
  );
};
