import { RequestHandler } from "express";

export interface PageInfo {
  path: string;
  title: string;
}

export interface PagesResponse {
  pages: PageInfo[];
}

export const handlePages: RequestHandler = (_req, res) => {
  const pages: PageInfo[] = [
    { path: "/", title: "Home" },
    { path: "/previous-results", title: "Previous Results" },
    { path: "/stats", title: "Stats" },
    { path: "/past-predictions", title: "Past Predictions" },
    { path: "/live", title: "Live Scores" },
    { path: "/diagnostics", title: "Diagnostics" },
    { path: "/about", title: "About" },
    { path: "/contact", title: "Contact" },
    { path: "/privacy", title: "Privacy" },
    { path: "/terms", title: "Terms" },
    { path: "/betting-guides", title: "Betting Guides" },
  ];

  const response: PagesResponse = {
    pages,
  };

  res.json(response);
};
