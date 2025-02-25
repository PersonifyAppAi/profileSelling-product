"use client"

import { useState, useEffect } from "react"
import ProfileList from "./ProfileList"
import { ProfileData } from "./ProfileCard"

interface ProfileBrowserProps {
  profiles: ProfileData[]
  totalProfiles: number
  currentPage: number
  totalPages: number
  isLoading?: boolean
  onPageChange: (page: number) => void
}

export default function ProfileBrowser({
  profiles,
  totalProfiles,
  currentPage,
  totalPages,
  isLoading = false,
  onPageChange
}: ProfileBrowserProps) {
  return (
    <div className="mt-8">
      <ProfileList
        profiles={profiles}
        totalProfiles={totalProfiles}
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isLoading}
        onPageChange={onPageChange}
      />
    </div>
  )
} 