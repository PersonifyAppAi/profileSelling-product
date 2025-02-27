import { NextApiRequest, NextApiResponse } from "next";
import { ProfileData } from "@/models/Profile";
import { getSimilarProfiles } from "@/services/profileService";

interface SimilarApiResponse {
  profiles: ProfileData[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SimilarApiResponse | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const profile = req.body.profile as ProfileData;
    if (!profile) {
      return res.status(400).json({ error: "Missing profile data" });
    }

    const similarProfiles = await getSimilarProfiles(profile);
    return res.status(200).json({ profiles: similarProfiles });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to find similar profiles" });
  }
} 