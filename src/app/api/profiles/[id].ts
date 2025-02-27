import { NextApiRequest, NextApiResponse } from "next";
import { getProfileById } from "@src/services/profileService";
import { ProfileData } from "@src/models/Profile";

interface FetchApiResponse {
  profile: ProfileData | null;
  isLocked: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FetchApiResponse | { error: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id } = req.query;
    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Missing or invalid profile ID" });
    }

    const profile = await getProfileById(id);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    // For demonstration, we'll just pretend everything is locked. 
    // In your real logic, you might check the user's subscription or other conditions.
    const isLocked = true;

    return res.status(200).json({ profile, isLocked });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch profile" });
  }
} 