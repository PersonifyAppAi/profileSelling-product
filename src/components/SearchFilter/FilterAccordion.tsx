"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Input } from "@/components/shadcn/ui/input"
import { Badge } from "@/components/shadcn/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { FilterState } from "./index"

interface FilterAccordionProps {
  title: string
  icon: string
  onFilterChange: (filters: FilterState) => void
  filterKey?: keyof FilterState
  filterType?: "test" | "geography" | "background" | "gender" | "race"
}

export default function FilterAccordion({ 
  title, 
  icon, 
  onFilterChange,
  filterKey,
  filterType
}: FilterAccordionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const toggleOption = (option: string) => {
    let newSelected: string[]
    
    if (selectedOptions.includes(option)) {
      newSelected = selectedOptions.filter(item => item !== option)
    } else {
      newSelected = [...selectedOptions, option]
    }
    
    setSelectedOptions(newSelected)
    
    // Handle different filter types
    if (filterType === "race") {
      onFilterChange({ race: newSelected.length > 0 ? newSelected : undefined })
    } else if (filterType === "gender") {
      onFilterChange({ gender: newSelected.length > 0 ? newSelected[0] : undefined })
    } else if (filterType === "test") {
      if (option === "test-optional") {
        onFilterChange({ testOptional: newSelected.includes("test-optional") })
      } else if (option === "not-test-optional") {
        onFilterChange({ notTestOptional: newSelected.includes("not-test-optional") })
      }
    } else if (filterType === "background") {
      if (option === "legacy") {
        onFilterChange({ legacy: newSelected.includes("legacy") })
      } else if (option === "not-legacy") {
        onFilterChange({ notLegacy: newSelected.includes("not-legacy") })
      } else if (option === "first-gen") {
        onFilterChange({ firstGen: newSelected.includes("first-gen") })
      } else if (option === "athlete") {
        onFilterChange({ athlete: newSelected.includes("athlete") })
      } else if (option === "low-income") {
        onFilterChange({ lowIncome: newSelected.includes("low-income") })
      }
    } else if (filterType === "geography") {
      if (option === "domestic") {
        onFilterChange({ domestic: newSelected.includes("domestic") })
      } else if (option === "international") {
        onFilterChange({ international: newSelected.includes("international") })
      }
    } else if (filterKey) {
      onFilterChange({ [filterKey]: newSelected.length > 0 ? newSelected[0] : undefined })
    }
  }

  const handleInputChange = (value: string) => {
    if (filterKey) {
      onFilterChange({ [filterKey]: value || undefined })
    }
  }

  // Render different content based on filter type
  const renderFilterContent = () => {
    if (filterType === "test") {
      return (
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge 
            variant={selectedOptions.includes("test-optional") ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => toggleOption("test-optional")}
          >
            Test-optional applicant
          </Badge>
          <Badge 
            variant={selectedOptions.includes("not-test-optional") ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => toggleOption("not-test-optional")}
          >
            Not test optional
          </Badge>
        </div>
      )
    }
    
    if (filterType === "geography") {
      return (
        <div className="space-y-3 mt-2">
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={selectedOptions.includes("domestic") ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleOption("domestic")}
            >
              Domestic
            </Badge>
            <Badge 
              variant={selectedOptions.includes("international") ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleOption("international")}
            >
              International
            </Badge>
          </div>
          <Input 
            placeholder="Filter by country..."
            className="text-sm"
            onChange={(e) => onFilterChange({ country: e.target.value || undefined })}
          />
          <Input 
            placeholder="Filter by state..."
            className="text-sm"
            onChange={(e) => onFilterChange({ state: e.target.value || undefined })}
          />
        </div>
      )
    }
    
    if (filterType === "background") {
      return (
        <div className="space-y-3 mt-2">
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={selectedOptions.includes("legacy") ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleOption("legacy")}
            >
              Legacy
            </Badge>
            <Badge 
              variant={selectedOptions.includes("not-legacy") ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleOption("not-legacy")}
            >
              NOT legacy
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={selectedOptions.includes("first-gen") ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleOption("first-gen")}
            >
              First-generation
            </Badge>
            <Badge 
              variant={selectedOptions.includes("athlete") ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleOption("athlete")}
            >
              Recruited athlete
            </Badge>
            <Badge 
              variant={selectedOptions.includes("low-income") ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleOption("low-income")}
            >
              Low-income
            </Badge>
          </div>
        </div>
      )
    }
    
    if (filterType === "gender") {
      return (
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge 
            variant={selectedOptions.includes("male") ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => toggleOption("male")}
          >
            Male
          </Badge>
          <Badge 
            variant={selectedOptions.includes("female") ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => toggleOption("female")}
          >
            Female
          </Badge>
          <Badge 
            variant={selectedOptions.includes("nonbinary") ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => toggleOption("nonbinary")}
          >
            Nonbinary
          </Badge>
        </div>
      )
    }
    
    if (filterType === "race") {
      return (
        <div className="flex flex-wrap gap-2 mt-2">
          {['Asian', 'White', 'Hispanic', 'Black or African American'].map(race => (
            <Badge 
              key={race}
              variant={selectedOptions.includes(race) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleOption(race)}
            >
              {race}
            </Badge>
          ))}
        </div>
      )
    }
    
    // Default: input field for text filters
    return (
      <Input 
        placeholder={`Select a ${title.toLowerCase()}...`}
        className="mt-2 text-sm"
        onChange={(e) => handleInputChange(e.target.value)}
      />
    )
  }

  return (
    <div className="w-full md:w-56">
      <div className="border-2 border-black rounded-lg shadow-[rgb(12,74,110)_-5px_5px_0px] bg-slate-50 overflow-hidden">
        <div 
          className="px-4 py-2 flex items-center justify-between cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            <span>{icon}</span>
            <span className="font-bold">{title}</span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </div>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white border-t border-gray-200 overflow-hidden"
            >
              <div className="p-3">
                {renderFilterContent()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 