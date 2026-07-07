import { Link, useLocation } from "react-router-dom";
import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "./ui/sidebar";

export function Sidebar() {
  const location = useLocation();
  const { isMobile } = useSidebar();

  const navItems = [
    { href: "/", label: "Today's Predictions", icon: "🏠" },
    { href: "/stats", label: "Stats", icon: "📈" },
    { href: "/past-predictions", label: "History", icon: "📊" },
    { href: "/live", label: "Live Matches", icon: "⚡" },
    { href: "/accumulators", label: "Accumulators", icon: "🏆" },
    { href: "/news", label: "News", icon: "📰" },
    { href: "/betting-guides", label: "Guides", icon: "📚" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {isMobile && <SidebarTrigger className="fixed top-4 left-4" />}
      <UISidebar
        className="bg-[#070b14] border-gray-800"
        style={{
          "--sidebar-background": "#070b14",
          "--sidebar-foreground": "#ffffff",
        } as React.CSSProperties}
      >
        <SidebarHeader className="border-0 p-6 pb-4">
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="text-4xl font-black text-[#39ff14]">⚽</div>
            <div>
              <h1 className="text-xl font-bold text-white">ScorePredicted</h1>
              <p className="text-xs text-gray-400">Predictions</p>
            </div>
          </Link>
        </SidebarHeader>

        <SidebarContent className="p-6 pt-0 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${
                isActive(item.href)
                  ? "bg-[#39ff14]/15 border-l-4 border-[#39ff14] text-[#39ff14] font-semibold"
                  : "text-gray-400 hover:bg-[#39ff14]/8 hover:text-gray-200"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </SidebarContent>

        <SidebarFooter className="p-6 pt-4 border-0">
          <div className="bg-gradient-to-br from-[#39ff14]/20 to-black p-5 rounded-3xl border border-[#39ff14]/20">
            <p className="text-white font-semibold text-lg">Bonus</p>
            <p className="text-gray-400 text-sm mt-1">100% up to 1,000</p>
            <button className="mt-4 w-full bg-[#39ff14] hover:bg-[#39ff14]/90 text-black font-bold px-5 py-2 rounded-full transition-colors">
              Get Started
            </button>
          </div>
        </SidebarFooter>
      </UISidebar>
    </>
  );
}
