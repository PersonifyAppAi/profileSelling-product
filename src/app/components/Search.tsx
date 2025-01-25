"use client"

import { useState } from "react"

export default function Search() {

  type InputVisibilityState = Record<string, boolean>

  const [inputVisibility, setInputVisibility] = useState<InputVisibilityState>({
    fullText: true,
    school: true,
    major: true,
    tests: true,
    highSchool: true,
    geography: true,
    background: true,
    gender: true,
    race: true
  });

  const toggleInputVisibility = (key: keyof InputVisibilityState) => {
    setInputVisibility((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="mt-8 w-[80%] mx-auto">
      {/* Full-text search */}
      <div className="flex flex-col">
        <button 
          className="px-4 py-2 bg-slate-50 text-black border-2 border-black-300  rounded-lg text-left text-xl font-bold cursor-pointer mt-4"
          onClick={() => toggleInputVisibility("fullText")}
        >
          {inputVisibility.fullText ? "-" : "+"} 📝 Full-text search
        </button>

        {inputVisibility.fullText && (
          <div className="relative md:flex items-center justify-center gap-3 mt-4">
            <i className="bx bx-search absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500"></i>
            <input 
                type="text" 
                className="w-full py-2 pl-10 rounded-lg border-2 border-black-300 focus:bg-slate-100 focus: outline-[#89C2D9]" 
                placeholder="You can type an activity (e.g., debate/nonprofit/research), essay content (e.g., volunteering), or an award (e.g., ISEF)"
              />
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-x-12 gap-y-2">
        {/* Dream School */}
        <div className="flex flex-col w-56">
          <button 
            className="px-4 py-2 bg-slate-50 text-black border-2 border-black rounded-lg text-left text-xl font-bold cursor-pointer mt-4 shadow-[rgb(12,74,110)_-5px_5px_0px]"
            onClick={() => toggleInputVisibility("school")}
          >
            {inputVisibility.school ? "-" : "+"} 🎓 Dream School
          </button>

          {inputVisibility.school && (
            <div className="relative md:flex items-center justify-center gap-3 mt-4">
              <input 
                  type="text" 
                  className="py-2 pl-2 bg-slate-50 text-sm"
                  placeholder="Select a university..."
                />
            </div>
          )}
        </div>

        {/* Major Interests */}
        <div className="flex flex-col w-56">
          <button 
            className="px-4 py-2 bg-slate-50 text-black border-2 border-black rounded-lg text-left text-xl font-bold cursor-pointer mt-4 shadow-[rgb(12,74,110)_-5px_5px_0px]"
            onClick={() => toggleInputVisibility("major")}
          >
            {inputVisibility.school ? "-" : "+"} 🧬 Major Interests
          </button>

          {inputVisibility.school && (
            <div className="relative md:flex items-center justify-center gap-3 mt-4">
              <input 
                  type="text" 
                  className="py-2 pl-2 bg-slate-50 text-sm"
                  placeholder="Search for a major..."
                />
            </div>
          )}
        </div>

        {/* Stats & tests */}
        <div className="flex flex-col w-56">
          <button 
            className="px-4 py-2 bg-slate-50 text-black border-2 border-black rounded-lg text-left text-xl font-bold cursor-pointer mt-4 shadow-[rgb(12,74,110)_-5px_5px_0px]"
            onClick={() => toggleInputVisibility("tests")}
          >
            {inputVisibility.tests ? "-" : "+"} 📚 Stats & Tests
          </button>

          {inputVisibility.tests && (
            <div className="relative md:flex items-center justify-center gap-3 mt-4">
              {/* Implement button */}
              <p className="text-sm text-slate-600">Test-optional applicant | Not test optional</p>
            </div>
          )}
        </div>

        {/* Geography */}
        <div className="flex flex-col w-56">
          <button 
            className="px-4 py-2 bg-slate-50 text-black border-2 border-black rounded-lg text-left text-xl font-bold cursor-pointer mt-4 shadow-[rgb(12,74,110)_-5px_5px_0px]"
            onClick={() => toggleInputVisibility("geography")}
          >
            {inputVisibility.geography ? "-" : "+"} 📍 Geography
          </button>

          {inputVisibility.geography && (
            <div className="relative md:flex items-center justify-center gap-3 mt-4">
              <div className="flex flex-wrap gap-2">
                {/* Implement button */}
                <p className="text-sm text-slate-600">Domestic | International</p>
                <input 
                    type="text" 
                    className="py-2 pl-2 bg-slate-50 text-sm"
                    placeholder="Filter by country..."
                  />
                  <input 
                    type="text" 
                    className="py-2 pl-2 bg-slate-50 text-sm"
                    placeholder="Filter by state..."
                  />
                </div>
            </div>
          )}
        </div>

        {/* Background */}
        <div className="flex flex-col w-56">
          <button 
            className="px-4 py-2 bg-slate-50 text-black border-2 border-black rounded-lg text-left text-xl font-bold cursor-pointer mt-4 shadow-[rgb(12,74,110)_-5px_5px_0px]"
            onClick={() => toggleInputVisibility("background")}
          >
            {inputVisibility.background ? "-" : "+"} 👦🏾 Background
          </button>

          {inputVisibility.background && (
            <div className="relative md:flex items-center justify-center gap-3 mt-4">
              <div className="flex flex-wrap gap-2">
              {/* Implement button */}
                <p className="text-sm text-slate-600">Legacy | NOT Legacy</p>
                <button className="px-2 py-1 bg-slate-50 text-black border border-black-300 rounded-lg text-sm">First-generation</button>
                <button className="px-2 py-1 bg-slate-50 text-black border border-black-300 rounded-lg text-sm">Recruited Athlete</button>
                <button className="px-2 py-1 bg-slate-50 text-black border border-black-300 rounded-lg text-sm">Low-income</button>
              </div>
            </div>
          )}
        </div>

        {/* Gender */}
        <div className="flex flex-col w-56">
          <button 
            className="px-4 py-2 bg-slate-50 text-black border-2 border-black rounded-lg text-left text-xl font-bold cursor-pointer mt-4 shadow-[rgb(12,74,110)_-5px_5px_0px]"
            onClick={() => toggleInputVisibility("gender")}
          >
            {inputVisibility.gender ? "-" : "+"} 👫 Gender
          </button>

          {inputVisibility.gender && (
            <div className="relative md:flex items-center justify-center gap-3 mt-4">
              {/* Implement button */}
              <p className="text-sm text-slate-600">Male | Female | Prefer not to say</p>
            </div>
          )}
        </div>

        {/* Race */}
        <div className="flex flex-col w-56">
          <button 
            className="px-4 py-2 bg-slate-50 text-black border-2 border-black rounded-lg text-left text-xl font-bold cursor-pointer mt-4 shadow-[rgb(12,74,110)_-5px_5px_0px]"
            onClick={() => toggleInputVisibility("race")}
          >
            {inputVisibility.race ? "-" : "+"} 🌍 Race
          </button>

          {inputVisibility.race && (
            <div className="relative md:flex items-center justify-center gap-3 mt-4">
              <div className="flex flex-wrap gap-2">
                <button className="px-2 py-1 bg-slate-50 text-black border border-black-300 rounded-lg text-sm">White</button>
                <button className="px-2 py-1 bg-slate-50 text-black border border-black-300 rounded-lg text-sm">Asian</button>
                <button className="px-2 py-1 bg-slate-50 text-black border border-black-300 rounded-lg text-sm">Hispanic</button>
                <button className="px-2 py-1 bg-slate-50 text-black border border-black-300 rounded-lg text-sm">Black or African American</button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
