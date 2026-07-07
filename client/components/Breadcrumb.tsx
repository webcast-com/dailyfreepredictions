import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  path: string;
}

export function Breadcrumb() {
  const location = useLocation();

  const pathMap: Record<string, string> = {
    "/": "Home",
    "/stats": "Stats",
    "/past-predictions": "History",
    "/previous-results": "Results",
    "/live": "Live Matches",
    "/accumulators": "Accumulators",
    "/diagnostics": "Diagnostics",
    "/about": "About",
    "/contact": "Contact",
    "/privacy": "Privacy",
    "/terms": "Terms",
    "/betting-guides": "Betting Guides",
    "/news": "News",
  };

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = location.pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "Home", path: "/" },
    ];

    let currentPath = "";
    paths.forEach((path) => {
      currentPath += `/${path}`;
      const label = pathMap[currentPath] || path.charAt(0).toUpperCase() + path.slice(1);
      breadcrumbs.push({ label, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumb on home page
  if (location.pathname === "/") {
    return null;
  }

  return (
    <nav className="mb-6 flex items-center gap-2 text-sm">
      <Link
        to="/"
        className="flex items-center gap-1 text-slate-400 hover:text-[#39ff14] transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </Link>

      {breadcrumbs.slice(1).map((item, index) => (
        <div key={item.path} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-slate-600" />
          {index === breadcrumbs.length - 2 ? (
            <span className="text-[#39ff14] font-semibold">{item.label}</span>
          ) : (
            <Link
              to={item.path}
              className="text-slate-400 hover:text-[#39ff14] transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
