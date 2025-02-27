import { ProfileData, ProfileFilters } from "@src/models/Profile";
import { getFirestore, collection, query, where, limit, startAfter, getDocs } from "firebase/firestore"; 
import { initializeApp } from "firebase/app";

/**
 * Normally you'd configure your Firebase project and export the Firestore instance.
 * For demonstration, let's inline an example config.
 */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  // etc...
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Utility function for building Firestore queries based on dynamic filters.
 */
export async function getFilteredProfiles(filters: ProfileFilters): Promise<ProfileData[]> {
  let q = query(collection(db, "profiles")); // 'profiles' is your Firestore collection

  // Example: chain queries only if the filter is provided
  if (filters.major) {
    q = query(q, where("major", "==", filters.major));
  }
  if (filters.race) {
    q = query(q, where("race", "==", filters.race));
  }
  if (filters.gender) {
    q = query(q, where("gender", "==", filters.gender));
  }
  // Add more "where" clauses as needed...

  // NOTE: Firestore has some limitations:
  // - You can only filter on a single inequality field
  // - You can't do range queries on multiple fields in the same query
  // For more complex filtering, you might need alternate approaches or a search index.

  // For demonstration, we won't show advanced pagination
  // with "startAfter" docs, but here's how you'd do a limit:
  q = query(q, limit(filters.limit ?? 8));

  // Fetch
  const snapshot = await getDocs(q);
  const results: ProfileData[] = [];
  snapshot.forEach((doc) => {
    results.push(doc.data() as ProfileData);
  });

  return results;
}

/**
 * Example function for counting total results (to calculate totalPages).
 */
export async function getFilteredProfilesCount(filters: ProfileFilters): Promise<number> {
  // Implementation would repeat a query with the same filters, 
  // but no "limit", to count all matching documents or use 
  // a special index/aggregations
  // For demonstration, return a stub value:
  return 42;
}

/**
 * Fetch one profile by ID.
 */
export async function getProfileById(id: string): Promise<ProfileData | null> {
  // Perform a query to retrieve a single profile by ID
  // For example, doc(db, "profiles", id) ...
  // For demonstration, return a stub:
  return null; 
}

/**
 * Example function to find "similar" profiles.
 * You might compare fields from 'profile' to filters or do more advanced logic.
 */
export async function getSimilarProfiles(profile: ProfileData): Promise<ProfileData[]> {
  // For demonstration, we'll do a naive approach:
  const filters: ProfileFilters = {
    major: profile.major,
    race: profile.race,
    gender: profile.gender,
    limit: 5
  };

  const results = await getFilteredProfiles(filters);
  // Optionally remove the original profile from results if it appears
  return results.filter((p) => p.id !== profile.id);
} 