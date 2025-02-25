"use client"

import Navbar from "@/components/Navbar";
import { Raleway } from 'next/font/google';
import SearchFilter, { FilterState } from "@/components/SearchFilter";
import ProfileBrowser from "@/components/ProfileBrowser";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProfileData } from "@/components/ProfileBrowser/ProfileCard";
import { MOCK_PROFILES } from "@/lib/mock-data";

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '700', '900'], 
});

export default function ProfilesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("q") || "");
  const [filters, setFilters] = useState<FilterState>({});
  
  // State for profiles and pagination
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [totalProfiles, setTotalProfiles] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(parseInt(searchParams.get("page") || "1"));
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to update URL with search params
  const updateUrlParams = (query: string, page: number, filterParams: FilterState) => {
    const params = new URLSearchParams();
    
    if (query) params.set("q", query);
    if (page > 1) params.set("page", page.toString());
    
    // Add filter params to URL
    Object.entries(filterParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            params.set(key, value.join(","));
          }
        } else {
          params.set(key, value.toString());
        }
      }
    });
    
    const newUrl = params.toString() ? `?${params.toString()}` : "";
    router.push(`/profiles${newUrl}`, { scroll: false });
  };

  // Placeholder API request function with all filters implemented
  const fetchProfiles = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Filter mock data based on search query
      let filteredProfiles = [...MOCK_PROFILES];
      
      // Full-text search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredProfiles = filteredProfiles.filter(profile => 
          profile.name.toLowerCase().includes(query) ||
          profile.major.toLowerCase().includes(query) ||
          profile.university.toLowerCase().includes(query) ||
          profile.academicInterests.some(interest => interest.toLowerCase().includes(query)) ||
          profile.additionalInfo?.toLowerCase().includes(query) ||
          profile.background?.toLowerCase().includes(query) ||
          profile.acceptances.some(school => school.toLowerCase().includes(query))
        );
      }
      
      // Free profile unlock filter
      if (filters.freeOnly) {
        // Placeholder logic - in a real app, you'd have a property indicating if a profile is free
        filteredProfiles = filteredProfiles.filter((_, index) => index % 3 === 0); // Every 3rd profile is "free"
      }
      
      // Dream School filter
      if (filters.school) {
        filteredProfiles = filteredProfiles.filter(profile => 
          profile.university.toLowerCase().includes(filters.school!.toLowerCase()) ||
          profile.acceptances.some(school => school.toLowerCase().includes(filters.school!.toLowerCase()))
        );
      }
      
      // Major Interests filter
      if (filters.major) {
        filteredProfiles = filteredProfiles.filter(profile => 
          profile.major.toLowerCase().includes(filters.major!.toLowerCase()) ||
          profile.academicInterests.some(interest => 
            interest.toLowerCase().includes(filters.major!.toLowerCase())
          )
        );
      }
      
      // Stats & Tests filters
      if (filters.testOptional) {
        // Placeholder: consider profiles with no SAT/ACT as test-optional
        filteredProfiles = filteredProfiles.filter(profile => 
          !profile.testScores?.sat && !profile.testScores?.act
        );
      }
      
      if (filters.notTestOptional) {
        // Placeholder: consider profiles with SAT/ACT as not test-optional
        filteredProfiles = filteredProfiles.filter(profile => 
          profile.testScores?.sat || profile.testScores?.act
        );
      }
      
      // High School Type filter
      if (filters.highSchoolType) {
        // Placeholder - in a real app, you'd have high school type data
        const hsTypeMap: Record<string, string[]> = {
          "public": ["1", "3", "5", "7"], // IDs of profiles with public schools
          "private": ["2", "4", "6", "8"], // IDs of profiles with private schools
          "charter": ["1", "6"], // IDs of profiles with charter schools
          "boarding": ["4", "8"], // IDs of profiles with boarding schools
          "international": ["3", "7"] // IDs of profiles with international schools
        };
        
        const validIds = hsTypeMap[filters.highSchoolType.toLowerCase()] || [];
        filteredProfiles = filteredProfiles.filter(profile => validIds.includes(profile.id));
      }
      
      // Geography filters
      if (filters.domestic) {
        filteredProfiles = filteredProfiles.filter(profile => 
          profile.background?.toLowerCase().includes("usa") ||
          profile.background?.toLowerCase().includes("united states") ||
          profile.background?.toLowerCase().includes("from") && 
          !profile.background?.toLowerCase().includes("international")
        );
      }
      
      if (filters.international) {
        filteredProfiles = filteredProfiles.filter(profile => 
          profile.background?.toLowerCase().includes("international") ||
          (!profile.background?.toLowerCase().includes("usa") &&
           !profile.background?.toLowerCase().includes("united states") &&
           !profile.background?.toLowerCase().includes("from"))
        );
      }
      
      if (filters.country) {
        filteredProfiles = filteredProfiles.filter(profile => 
          profile.background?.toLowerCase().includes(filters.country!.toLowerCase())
        );
      }
      
      if (filters.state) {
        filteredProfiles = filteredProfiles.filter(profile => 
          profile.background?.toLowerCase().includes(filters.state!.toLowerCase())
        );
      }
      
      // Background filters
      if (filters.legacy) {
        // Placeholder - in a real app, you'd have legacy status data
        filteredProfiles = filteredProfiles.filter((_, index) => index % 4 === 0); // Every 4th profile is "legacy"
      }
      
      if (filters.notLegacy) {
        // Placeholder - in a real app, you'd have legacy status data
        filteredProfiles = filteredProfiles.filter((_, index) => index % 4 !== 0); // Every 4th profile is "legacy"
      }
      
      if (filters.firstGen) {
        // Placeholder - in a real app, you'd have first-gen status data
        filteredProfiles = filteredProfiles.filter(profile => 
          profile.additionalInfo?.toLowerCase().includes("first-gen") ||
          profile.additionalInfo?.toLowerCase().includes("first generation")
        );
      }
      
      if (filters.athlete) {
        // Placeholder - in a real app, you'd have athlete status data
        filteredProfiles = filteredProfiles.filter(profile => 
          profile.additionalInfo?.toLowerCase().includes("athlete") ||
          profile.additionalInfo?.toLowerCase().includes("team") ||
          profile.additionalInfo?.toLowerCase().includes("sport")
        );
      }
      
      if (filters.lowIncome) {
        // Placeholder - in a real app, you'd have income status data
        filteredProfiles = filteredProfiles.filter((_, index) => index % 5 === 0); // Every 5th profile is "low income"
      }
      
      // Gender filter
      if (filters.gender) {
        const genderMap: Record<string, string> = {
          "male": "male",
          "female": "female",
          "nonbinary": "nonbinary"
        };
        
        filteredProfiles = filteredProfiles.filter(profile => 
          profile.background?.toLowerCase().includes(genderMap[filters.gender!])
        );
      }
      
      // Race filter
      if (filters.race && filters.race.length > 0) {
        filteredProfiles = filteredProfiles.filter(profile => 
          filters.race!.some(race => {
            const lowerRace = race.toLowerCase();
            return profile.background?.toLowerCase().includes(lowerRace) ||
                  (lowerRace === "asian" && profile.background?.toLowerCase().includes("asian")) ||
                  (lowerRace === "white" && profile.background?.toLowerCase().includes("white")) ||
                  (lowerRace === "hispanic" && profile.background?.toLowerCase().includes("hispanic")) ||
                  (lowerRace === "black or african american" && 
                    (profile.background?.toLowerCase().includes("black") || 
                     profile.background?.toLowerCase().includes("african")));
          })
        );
      }
      
      // Pagination
      const itemsPerPage = 10;
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      
      const paginatedProfiles = filteredProfiles.slice(startIndex, endIndex);
      
      setProfiles(paginatedProfiles);
      setTotalProfiles(filteredProfiles.length);
      setTotalPages(Math.max(1, Math.ceil(filteredProfiles.length / itemsPerPage)));
    } catch (error) {
      console.error("Error fetching profiles:", error);
      setProfiles([]);
      setTotalProfiles(0);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search query change
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
    updateUrlParams(query, 1, filters);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page on filter change
    updateUrlParams(searchQuery, 1, newFilters);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateUrlParams(searchQuery, page, filters);
  };

  // Fetch profiles when search, filters, or page changes
  useEffect(() => {
    fetchProfiles();
  }, [searchQuery, filters, currentPage]);

  // Initialize from URL params on first load
  useEffect(() => {
    const query = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || "1");
    
    // Extract filter params from URL
    const urlFilters: FilterState = {};
    
    // School
    if (searchParams.has("school")) {
      urlFilters.school = searchParams.get("school") || undefined;
    }
    
    // Major
    if (searchParams.has("major")) {
      urlFilters.major = searchParams.get("major") || undefined;
    }
    
    // High School Type
    if (searchParams.has("highSchoolType")) {
      urlFilters.highSchoolType = searchParams.get("highSchoolType") || undefined;
    }
    
    // Geography
    if (searchParams.has("country")) {
      urlFilters.country = searchParams.get("country") || undefined;
    }
    
    if (searchParams.has("state")) {
      urlFilters.state = searchParams.get("state") || undefined;
    }
    
    // Boolean filters
    [
      "testOptional", "notTestOptional", "domestic", "international", 
      "legacy", "notLegacy", "firstGen", "athlete", "lowIncome", "freeOnly"
    ].forEach(key => {
      if (searchParams.has(key)) {
        urlFilters[key as keyof FilterState] = searchParams.get(key) === "true";
      }
    });
    
    // Gender
    if (searchParams.has("gender")) {
      urlFilters.gender = searchParams.get("gender") || undefined;
    }
    
    // Race (comma-separated list)
    if (searchParams.has("race")) {
      const raceParam = searchParams.get("race");
      if (raceParam) {
        urlFilters.race = raceParam.split(",");
      }
    }
    
    setSearchQuery(query);
    setCurrentPage(page);
    setFilters(urlFilters);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background grid-pattern">
      <div className="container mx-auto max-w-[78rem]">
        <Navbar />
        <div className={raleway.className}>
          <div className="mb-20 space-y-7 pt-[105px]">
            <h1 className="text-8xl font-black text-center">
              <span className="bg-gradient-to-br from-personifyAccent1 via-personifyAccent4 to-personifyAccent6 text-transparent bg-clip-text">Get in</span>
              <span className="bg-gradient-to-t from-gray-800 to-gray-400 text-transparent bg-clip-text">spired.</span>
            </h1>
            <h3 className="text-4xl font-bold text-center text-personifyAccent3">
              Thousands of verified applications. Take your pick.
            </h3>
          </div>
          
          <SearchFilter 
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            initialQuery={searchQuery}
            initialFilters={filters}
          />
          
          <ProfileBrowser
            profiles={profiles}
            totalProfiles={totalProfiles}
            currentPage={currentPage}
            totalPages={totalPages}
            isLoading={isLoading}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
