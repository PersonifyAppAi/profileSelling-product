/**
 * Data model for a profile record.
 * This interface matches the spec you described.
 */

export interface AcademicStats {
  gpaWeighted: number;
  gpaUnweighted: number;
  gpaScale: number;
  act: number;
  sat: number;
  numberOfAPCourses: number;
}

export interface ExtracurricularActivity {
  name: string;
  description: string;
}

export interface APScore {
  subjectName: string;
  score: number;
}

export interface Award {
  name: string;
  description: string;
}

export interface Essay {
  prompt: string;
  essayText: string;
  wordCount: number;
}

export interface Essays {
  [schoolName: string]: Essay[];
}

export interface ProfileData {
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

  academicStats: AcademicStats;

  extracurricularActivities: ExtracurricularActivity[]; // max 15
  apScores: APScore[];
  awards: Award[];

  acceptedSchools: string[];
  essays: Essays;
}

/**
 * Filters interface for queries & pagination.
 */
export interface ProfileFilters {
  schoolType?: string;
  major?: string;
  race?: string;
  gender?: string;
  legacy?: boolean;
  lowIncomeStatus?: boolean;
  firstGenerationStatus?: boolean;
  internationalStatus?: boolean;
  recruitedAthlete?: boolean;

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

  page?: number;
  limit?: number; // 7-8
} 