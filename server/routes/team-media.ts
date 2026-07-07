import { RequestHandler } from "express";

export const handleTeamMedia: RequestHandler = async (req, res) => {
  const { teamId } = req.params;

  if (!teamId) {
    return res.status(400).json({ error: "Team ID is required" });
  }

  const apiKey = process.env.ALLSPORTS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }
  const apiHost = "allsportsapi2.p.rapidapi.com";

  const url = `https://allsportsapi2.p.rapidapi.com/api/team/${teamId}/media`;

  const options = {
    method: "GET" as const,
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": apiHost,
      "Content-Type": "application/json",
    },
  };

  try {
    console.log(`Fetching team ${teamId} media from AllSports API...`);
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `AllSports API error: ${response.status} ${response.statusText}`,
        errorText,
      );
      return res.status(response.status).json({
        error: `Failed to fetch team media: ${response.statusText}`,
        status: response.status,
      });
    }

    const data = await response.json();

    console.log(
      `Team ${teamId} media fetched successfully`,
    );
    res.json(data);
  } catch (error) {
    console.error("Error fetching team media:", error);
    res.status(500).json({
      error: "Failed to fetch team media",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
