"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, FileText } from "lucide-react"
import { Checkbox } from "@/components/shadcn/ui/checkbox"
import { Label } from "@/components/shadcn/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import SearchBar from "./SearchBar"
import FilterAccordion from "./FilterAccordion"

export interface FilterState {
  school?: string
  major?: string
  testOptional?: boolean
  notTestOptional?: boolean
  highSchoolType?: string
  domestic?: boolean
  international?: boolean
  country?: string
  state?: string
  legacy?: boolean
  notLegacy?: boolean
  firstGen?: boolean
  athlete?: boolean
  lowIncome?: boolean
  gender?: string
  race?: string[]
}

interface SearchFilterProps {
  onSearch: (query: string) => void
  onFilterChange: (filters: FilterState) => void
  initialQuery?: string
  initialFilters?: FilterState
}

export default function SearchFilter({ 
  onSearch, 
  onFilterChange, 
  initialQuery = "", 
  initialFilters = {} 
}: SearchFilterProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [showFreeOnly, setShowFreeOnly] = useState(false)
  const [filters, setFilters] = useState<FilterState>(initialFilters)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const handleFilterChange = (newFilters: FilterState) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const handleFreeOnlyChange = (checked: boolean) => {
    setShowFreeOnly(checked)
    // Add this to filters
    handleFilterChange({ freeOnly: checked })
  }

  return (
    <div className="border-2 border-black rounded-lg shadow-[rgb(12,74,110)_-5px_5px_0px] bg-white overflow-hidden">
      {/* Collapsible header */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors"
        onClick={toggleExpand}
      >
        <div className="flex items-center gap-2">
          <FileText className="text-personifyAccent3" size={20} />
          <span className="font-bold text-lg">Full-text search</span>
        </div>
        <motion.button 
          className="text-gray-500 hover:text-gray-700"
          onClick={(e) => {
            e.stopPropagation();
            toggleExpand();
          }}
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={20} />
        </motion.button>
      </div>

      {/* Collapsible content with animation */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className="border-t border-gray-200"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4">
              <SearchBar onSearch={onSearch} initialQuery={initialQuery} />

              <div className="mt-4 flex items-center space-x-2">
                <Checkbox 
                  id="free-only" 
                  checked={showFreeOnly}
                  onCheckedChange={(checked) => handleFreeOnlyChange(checked === true)}
                />
                <Label htmlFor="free-only" className="text-sm text-gray-700 cursor-pointer">
                  Only show profiles eligible for a free profile unlock
                </Label>
              </div>

              <div className="mt-4 flex flex-wrap gap-4">
                <FilterAccordion 
                  title="Dream School" 
                  icon="🎓" 
                  onFilterChange={handleFilterChange}
                  filterKey="school"
                />
                
                <FilterAccordion 
                  title="Major Interests" 
                  icon="🧬" 
                  onFilterChange={handleFilterChange}
                  filterKey="major"
                />
                
                <FilterAccordion 
                  title="Stats & Tests" 
                  icon="📚" 
                  onFilterChange={handleFilterChange}
                  filterType="test"
                />
                
                <FilterAccordion 
                  title="High School Type" 
                  icon="🏫" 
                  onFilterChange={handleFilterChange}
                  filterKey="highSchoolType"
                />
                
                <FilterAccordion 
                  title="Geography" 
                  icon="📍" 
                  onFilterChange={handleFilterChange}
                  filterType="geography"
                />
                
                <FilterAccordion 
                  title="Background" 
                  icon="👤" 
                  onFilterChange={handleFilterChange}
                  filterType="background"
                />
                
                <FilterAccordion 
                  title="Gender" 
                  icon="👫" 
                  onFilterChange={handleFilterChange}
                  filterType="gender"
                />
                
                <FilterAccordion 
                  title="Race" 
                  icon="🌍" 
                  onFilterChange={handleFilterChange}
                  filterType="race"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 