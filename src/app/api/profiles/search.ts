import { NextApiRequest, NextApiResponse } from "next";
import { getFilteredProfiles, getFilteredProfilesCount } from "@src/services/profileService";
import { ProfileData, ProfileFilters } from "@src/models/Profile";

interface SearchApiResponse {
  profiles: ProfileData[];
  totalPages: number;
  currentPage: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchApiResponse | { error: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const searchQuery = req.query.query as string;
    
    const filters: ProfileFilters = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 8,
      // Potentially parse other filtering criteria from the query string
    };

    const profiles = await getFilteredProfiles(filters);
    const totalResults = await getFilteredProfilesCount(filters);

    const totalPages = Math.ceil(totalResults / (filters.limit || 8));
    const currentPage = filters.page || 1;

    return res.status(200).json({
      profiles,
      totalPages,
      currentPage
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to search profiles" });
  }
} 