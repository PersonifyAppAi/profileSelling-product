"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/shadcn/ui/card"
import { Badge } from "@/components/shadcn/ui/badge"
import { Button } from "@/components/shadcn/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export interface ProfileStats {
  essays: number
  colleges: number
  awards: number
  activities: number
  qAndAs: number
  apIBs: number
}

export interface ProfileData {
  id: string
  name: string
  avatar?: string
  major: string
  university: string
  scholarshipAmount?: string
  background?: string
  academicInterests: string[]
  testScores?: {
    act?: number
    sat?: number
  }
  gpa?: {
    weighted?: number
    unweighted?: number
  }
  acceptances: string[]
  additionalInfo?: string
  stats?: ProfileStats
}

interface ProfileCardProps {
  profile: ProfileData
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const router = useRouter();
  
  // Function to get university logo (placeholder)
  const getUniversityLogo = (university: string) => {
    const logoMap: Record<string, string> = {
      "Princeton": "/logos/princeton.png",
      "Harvard": "/logos/harvard.png",
      "Yale": "/logos/yale.png",
      "Duke": "/logos/duke.png",
      "UPenn": "/logos/upenn.png",
      "Stanford": "/logos/stanford.png",
      "MIT": "/logos/mit.png"
    };
    
    // Return a default logo if not found
    return logoMap[university] || "/logos/university.png";
  };

  // Get first 5 acceptances for display
  const topAcceptances = profile.acceptances.slice(0, 5);
  
  // Navigate to profile detail page
  const navigateToProfile = () => {
    router.push(`/profiles/${profile.id}`);
  };

  return (
    <Card 
      className="w-full border-2 border-black rounded-lg shadow-[rgb(12,74,110)_-5px_5px_0px] bg-slate-50 overflow-hidden cursor-pointer hover:shadow-[rgb(12,74,110)_-7px_7px_0px] transition-all"
      onClick={navigateToProfile}
    >
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold">
            {profile.avatar || profile.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{profile.name}</CardTitle>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <CardDescription className="text-sm">
              {profile.additionalInfo}
            </CardDescription>
          </div>
        </div>
        <button 
          className="text-gray-400 hover:text-gray-600"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="border-t border-b border-gray-200 py-3 grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-1">Background:</p>
            <p className="text-sm">{profile.background}</p>
          </div>
          
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-1">Academic Interests:</p>
            <p className="text-sm">{profile.academicInterests.join(", ")}</p>
          </div>
          
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-1">College Acceptances</p>
            <div className="flex -space-x-2">
              {topAcceptances.map((school, index) => (
                <div key={index} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-white">
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs">
                    {school.charAt(0)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-3 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-800">{profile.stats?.essays || 0}</p>
            <p className="text-sm text-gray-600">essays</p>
          </div>
          
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-800">{profile.stats?.colleges || profile.acceptances.length}</p>
            <p className="text-sm text-gray-600">colleges</p>
          </div>
          
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-800">{profile.stats?.awards || 0}</p>
            <p className="text-sm text-gray-600">awards</p>
          </div>
        </div>
        
        <div className="mt-2 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-800">{profile.stats?.activities || 0}</p>
            <p className="text-sm text-gray-600">activities</p>
          </div>
          
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-800">{profile.stats?.qAndAs || 0}</p>
            <p className="text-sm text-gray-600">Q&As</p>
          </div>
          
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-800">{profile.stats?.apIBs || 0}</p>
            <p className="text-sm text-gray-600">AP/IBs</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <div className="w-full">
          <p className="text-sm text-gray-600 mb-2">Want to see how your applications stack up to {profile.name}'s?</p>
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs border-gray-300"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click
              }}
            >
              <span className="flex items-center gap-1">
                Compare your applications
                <ChevronRight size={14} />
              </span>
            </Button>
            
            <Link href={`/profiles/${profile.id}`} onClick={(e) => e.stopPropagation()}>
              <Button className="bg-purple-500 hover:bg-purple-600 text-white text-xs">
                <span className="flex items-center gap-1">
                  Read {profile.name}'s applications
                  <ChevronRight size={14} />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
} 