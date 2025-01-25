import React from 'react'

export default function Search() {
  return (
    <div className="flex flex-wrap">
        <button className="">Full-text search</button>

        <div className="relative md:flex items-center justify-center gap-3">
            <i className="bx bx-search absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500"></i>
            <input 
                type="text" 
                className="w-96 py-2 pl-10 rounded-lg border-2 border-black-300 focus:bg-slate-100 focus: outline-[#89C2D9]" 
                placeholder="You can type an activity (e.g., debate/nonprofit/research), essay content (e.g., volunteering), or an award (e.g., ISEF)"
            />
        </div>
    </div>
  )
}
