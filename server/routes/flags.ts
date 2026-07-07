import { RequestHandler } from "express";

export const handleGetFlag: RequestHandler = async (req, res) => {
  try {
    const { countryId } = req.query;

    if (!countryId) {
      res.status(400).json({ error: "countryId parameter required" });
      return;
    }

    const apiKey = process.env.RAPIDAPI_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "API key not configured" });
      return;
    }

    const url = `https://allscores.p.rapidapi.com/api/allscores/img/flag/country/${countryId}`;
    const options = {
      method: "GET" as const,
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "allscores.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    const result = await response.text();

    res.setHeader("Content-Type", "image/*");
    res.send(result);
  } catch (error) {
    console.error("Flag fetch error:", error);
    res.status(500).json({
      error: "Failed to fetch flag",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
