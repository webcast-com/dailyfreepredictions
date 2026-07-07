import { RequestHandler } from "express";

interface NewsResponse {
  news: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    source?: string;
    timestamp?: number;
    link?: string;
  }>;
}

export const handleGetNews: RequestHandler = async (req, res) => {
  try {
    const { sport = "1", timezone = "America/Chicago", langId = "1" } = req.query;

    const apiKey = process.env.RAPIDAPI_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "API key not configured" });
      return;
    }

    const url = `https://allscores.p.rapidapi.com/api/allscores/news?sport=${sport}&timezone=${encodeURIComponent(timezone as string)}&langId=${langId}`;
    const options = {
      method: "GET" as const,
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "allscores.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const result: NewsResponse = await response.json();
    res.json(result);
  } catch (error) {
    console.error("News fetch error:", error);
    res.status(500).json({
      error: "Failed to fetch news",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
