import { RequestHandler } from "express";

export const handleLiveMatches: RequestHandler = async (req, res) => {
  const apiKey = process.env.ALLSPORTS_API_KEY;

  if (!apiKey) {
    console.warn("ALLSPORTS_API_KEY not configured, returning mock live matches");
    // Return mock live match data when API key is not configured
    return res.json([
      {
        id: 1,
        homeTeam: { name: "Manchester City", shortName: "MCI" },
        awayTeam: { name: "Liverpool", shortName: "LIV" },
        homeScore: { current: 2, display: 2 },
        awayScore: { current: 1, display: 1 },
        status: { description: "2nd half", type: "inprogress" },
        tournament: { name: "Premier League" },
        startTimestamp: Math.floor(Date.now() / 1000),
        slug: "manchester-city-vs-liverpool"
      },
      {
        id: 2,
        homeTeam: { name: "Arsenal", shortName: "ARS" },
        awayTeam: { name: "Chelsea", shortName: "CHE" },
        homeScore: { current: 1, display: 1 },
        awayScore: { current: 1, display: 1 },
        status: { description: "Halftime", type: "inprogress" },
        tournament: { name: "Premier League" },
        startTimestamp: Math.floor(Date.now() / 1000),
        slug: "arsenal-vs-chelsea"
      }
    ]);
  }

  const apiHost = "allsportsapi2.p.rapidapi.com";

  const url = "https://allsportsapi2.p.rapidapi.com/api/matches/live";

  const options = {
    method: "GET" as const,
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": apiHost,
      "Content-Type": "application/json",
    },
  };

  try {
    console.log("Fetching live matches from AllSports API...");
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `AllSports API error: ${response.status} ${response.statusText}`,
        errorText,
      );
      return res.status(response.status).json({
        error: `Failed to fetch live matches: ${response.statusText}`,
        status: response.status,
      });
    }

    const data = await response.json();

    // Transform the API response to match our expected format
    const matches = Array.isArray(data.events) ? data.events : [];

    console.log(
      `Live matches fetched: ${matches.length} events`,
    );
    res.json(matches);
  } catch (error) {
    console.error("Error fetching live matches:", error);
    res.status(500).json({
      error: "Failed to fetch live matches",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
