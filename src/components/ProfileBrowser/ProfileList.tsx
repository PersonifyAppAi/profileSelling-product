"use client"

import { Button } from "@/components/shadcn/ui/button"
import { Skeleton } from "@/components/shadcn/ui/skeleton"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ProfileCard, { ProfileData } from "./ProfileCard"

interface ProfileListProps {
  profiles: ProfileData[]
  totalProfiles: number
  currentPage: number
  totalPages: number
  isLoading?: boolean
  onPageChange: (page: number) => void
}

export default function ProfileList({
  profiles,
  totalProfiles,
  currentPage,
  totalPages,
  isLoading = false,
  onPageChange
}: ProfileListProps) {
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className="mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-personifyAccent3">Student Profiles</h2>
        <div className="flex gap-2 items-center">
          <p className="text-sm text-gray-600">
            {totalProfiles.toLocaleString()} applications - Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-1">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePrevPage}
              disabled={currentPage <= 1 || isLoading}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft size={16} />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleNextPage}
              disabled={currentPage >= totalPages || isLoading}
              className="h-8 w-8 p-0"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>

      {isLoading ? (
        // Loading skeletons
        Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="w-full mb-4 border-2 border-black rounded-lg p-4 shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div>
                <Skeleton className="h-5 w-40 mb-2" />
                <Skeleton className="h-4 w-60" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-2" />
              </div>
              <div>
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-2" />
              </div>
            </div>
          </div>
        ))
      ) : profiles.length > 0 ? (
        // Profile cards
        <div className="space-y-4">
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      ) : (
        // No results
        <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">No profiles found</h3>
          <p className="text-gray-600">Try adjusting your search filters</p>
        </div>
      )}

      {/* Bottom pagination for longer lists */}
      {profiles.length > 3 && (
        <div className="flex justify-center mt-8">
          <div className="flex gap-1">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePrevPage}
              disabled={currentPage <= 1 || isLoading}
            >
              <ChevronLeft size={16} className="mr-1" />
              Prev
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
              // Show pages around current page
              let pageNum = currentPage - 2 + index
              if (pageNum <= 0) pageNum = index + 1
              if (pageNum > totalPages) return null
              
              return (
                <Button 
                  key={pageNum}
                  variant={pageNum === currentPage ? "default" : "outline"} 
                  size="sm"
                  onClick={() => onPageChange(pageNum)}
                  disabled={isLoading}
                  className={pageNum === currentPage ? "bg-personifyAccent3 hover:bg-personifyAccent4" : ""}
                >
                  {pageNum}
                </Button>
              )
            })}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleNextPage}
              disabled={currentPage >= totalPages || isLoading}
            >
              Next
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
} 