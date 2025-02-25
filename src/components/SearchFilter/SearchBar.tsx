"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/shadcn/ui/input"
import { Button } from "@/components/shadcn/ui/button"

interface SearchBarProps {
  onSearch: (query: string) => void
  initialQuery?: string
}

export default function SearchBar({ onSearch, initialQuery = "" }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="search"
          className="pl-10 py-6 border-2 border-gray-300 rounded-lg text-base focus-visible:ring-personifyAccent5"
          placeholder="You can type an activity (e.g., debate/nonprofit/research), essay content (e.g., volunteering), or an award (e.g., ISEF)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button 
          type="submit" 
          className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-personifyAccent3 hover:bg-personifyAccent4 text-white font-medium rounded-md"
        >
          Search
        </Button>
      </div>
    </form>
  )
} 