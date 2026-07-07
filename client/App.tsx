import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollUpButton } from "@/components/ScrollUpButton";
import { StickyAd } from "@/components/StickyAd";
import { BonusModal } from "@/components/BonusModal";
import { CookieConsent } from "@/components/CookieConsent";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useGoogleTagManager } from "@/hooks/useGoogleTagManager";
import { Layout } from "@/components/Layout";
import PreviousResults from "./pages/PreviousResults";
import Index from "./pages/Index";
import Stats from "./pages/Stats";
import Accumulators from "./pages/Accumulators";
import PastPredictions from "./pages/PastPredictions";
import Diagnostics from "./pages/Diagnostics";
import LiveScores from "./pages/LiveScores";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import BettingGuides from "./pages/BettingGuides";
import News from "./pages/News";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  useScrollToTop();
  useGoogleTagManager("GTM-NH77PDSF");

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/previous-results" element={<PreviousResults />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/past-predictions" element={<PastPredictions />} />
        <Route path="/live" element={<LiveScores />} />
        <Route path="/accumulators" element={<Accumulators />} />
        <Route path="/diagnostics" element={<Diagnostics />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/betting-guides" element={<BettingGuides />} />
        <Route path="/news" element={<News />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
        <ScrollUpButton />
        <StickyAd />
        <BonusModal />
        <CookieConsent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
