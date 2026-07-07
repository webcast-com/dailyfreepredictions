import { RequestHandler } from "express";

export const handlePredictions: RequestHandler = async (req, res) => {
  const apiKey = process.env.PREDICTIONS_KEY;

  if (!apiKey) {
    console.warn("PREDICTIONS_KEY not configured, returning mock data");
    // Return mock data when API key is not configured
    return res.json({
      data: [
        {
          id: 1,
          start_date: new Date().toISOString(),
          home_team: "Arsenal",
          away_team: "Manchester United",
          prediction: "1",
          status: "upcoming",
          odds: { "1": 1.85, "X": 3.50, "2": 4.20 },
          competition_name: "Premier League",
          competition_cluster: "England",
          federation: "England",
          season: "2024/2025",
          is_expired: false,
          market: "classic",
          result: "",
          last_update_at: new Date().toISOString()
        },
        {
          id: 2,
          start_date: new Date().toISOString(),
          home_team: "Liverpool",
          away_team: "Chelsea",
          prediction: "1X",
          status: "upcoming",
          odds: { "1": 1.95, "X": 3.40, "2": 3.80 },
          competition_name: "Premier League",
          competition_cluster: "England",
          federation: "England",
          season: "2024/2025",
          is_expired: false,
          market: "classic",
          result: "",
          last_update_at: new Date().toISOString()
        },
        {
          id: 3,
          start_date: new Date().toISOString(),
          home_team: "Manchester City",
          away_team: "Tottenham",
          prediction: "2",
          status: "upcoming",
          odds: { "1": 2.10, "X": 3.60, "2": 3.40 },
          competition_name: "Premier League",
          competition_cluster: "England",
          federation: "England",
          season: "2024/2025",
          is_expired: false,
          market: "classic",
          result: "",
          last_update_at: new Date().toISOString()
        }
      ]
    });
  }

  const url =
    "https://football-prediction-api.p.rapidapi.com/api/v2/predictions?market=classic";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "football-prediction-api.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Predictions API error: ${response.status} ${response.statusText}`, errorText);
      return res.status(response.status).json({
        error: `Failed to fetch predictions: ${response.statusText}`,
        status: response.status
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching predictions:", error);
    res.status(500).json({
      error: "Failed to fetch predictions",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
