"use client"

import React, { useState } from "react"
import { ProfileData } from "@/models/Profile"

export default function Search() {
  const [major, setMajor] = useState("")
  const [results, setResults] = useState<ProfileData[] | null>(null)

  const handleSearch = async () => {
    // Example: call the /api/profiles/search endpoint with query parameters
    const queryParams = new URLSearchParams({
      major: major,
      page: "1",
      limit: "8",
    })

    const res = await fetch(`/api/profiles/search?${queryParams}`, {
      method: "GET",
    })
    const data = await res.json()
    setResults(data.profiles || [])
  }

  return (
    <div style={{ margin: "1rem 0" }}>
      <label>Search by Major: </label>
      <input 
        type="text" 
        value={major} 
        onChange={(e) => setMajor(e.target.value)} 
        style={{ marginRight: "1rem" }} 
      />
      <button onClick={handleSearch}>Search</button>

      {results && (
        <div>
          <h3>Search Results</h3>
          {results.map((profile) => (
            <div key={profile.id} style={{ padding: "0.5rem 0" }}>
              <strong>{profile.name}</strong> - {profile.major}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
