import { NextApiRequest, NextApiResponse } from "next";

// Academic Stats Interface
interface AcademicStats {
  gpaWeighted: number;
  gpaUnweighted: number;
  gpaScale: number;
  act: number;
  sat: number;
  numberOfAPCourses: number;
}

// Extracurricular Activity Interface
interface ExtracurricularActivity {
  name: string;
  description: string;
}

// AP Score Interface
interface APScore {
  subjectName: string;
  score: number;
}

// Award Interface
interface Award {
  name: string;
  description: string;
}

// Essay Interface
interface Essay {
  prompt: string;
  essayText: string;
  wordCount: number;
}

// Essays by School Interface
interface Essays {
  [schoolName: string]: Essay[];
}

// Complete Profile Data Interface
interface ProfileData {
  // General Information
  id: string;
  name: string;
  bio: string;
  race: string;
  gender: string;
  schoolType: string;
  legacy: boolean;
  lowIncomeStatus: boolean;
  firstGenerationStatus: boolean;
  internationalStatus: boolean;
  recruitedAthlete: boolean;
  major: string;

  // Academic Information
  academicStats: AcademicStats;
  
  // Activities and Achievements
  extracurricularActivities: ExtracurricularActivity[]; // max 15
  apScores: APScore[];
  awards: Award[];
  
  // Schools and Essays
  acceptedSchools: string[];
  essays: Essays;
}

// Filter Interface for searching profiles
interface ProfileFilters {
  // School and Academic Filters
  schoolType?: string;
  major?: string;
  
  // Demographic Filters
  race?: string;
  gender?: string;
  
  // Status Filters
  legacy?: boolean;
  lowIncomeStatus?: boolean;
  firstGenerationStatus?: boolean;
  internationalStatus?: boolean;
  recruitedAthlete?: boolean;
  
  // Academic Stat Filters
  academicStats?: {
    minGpaWeighted?: number;
    maxGpaWeighted?: number;
    minGpaUnweighted?: number;
    maxGpaUnweighted?: number;
    minACT?: number;
    maxACT?: number;
    minSAT?: number;
    maxSAT?: number;
  };
  
  // Pagination
  page?: number;
  limit?: number; // Should be 7-8
}

// API Response Interface
interface ProfileApiResponse {
  profiles: ProfileData[];
  totalPages: number;
  currentPage: number;
}

// API handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileApiResponse | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // TODO: Implement the actual database query logic here
    // Remember to only fetch 7-8 profiles at a time based on the current page
    // Apply filters at the database level, not in memory
    
    // Placeholder response
    res.status(200).json({
      profiles: [],
      totalPages: 0,
      currentPage: 1
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
}