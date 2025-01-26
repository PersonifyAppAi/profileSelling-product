import React from 'react'

export default function StudentProfile() {
  return (
    <div className="mt-10 w-[80%] mx-auto">
      <div className="flex justify-end gap-2 items-center "> 
        <p>6,000+ applications (9,000+ essays) - Page 1 of 93</p>
        <button className="px-2 py-1 bg-slate-50 text-black border border-black-300 rounded-lg text-sm">Prev.</button>
        <button className="px-2 py-1 bg-slate-50 text-black border border-black-300 rounded-lg text-sm">Next</button>
      </div>
      <div className="px-4 py-4 bg-slate-50 text-black border border-black rounded-lg flex flex-col gap-2 mt-4">

        <div className="flex items-center gap-6">
          <p>PFP</p>
          <h3 className="text-xl">Jane Doe</h3>
        </div>
        <hr></hr>
        <p className="text-lg">X Major Student at X University | X in Scholarships | Profile includes X</p>
        <p><strong>Background:</strong> Multi-racial male student from USA</p>
        <p><strong>Academic Interests:</strong> Economics, Political Science/Public Policy, Computer science</p>
        <p><strong>ACT:</strong> 33</p>
        <p><strong>GPA (W):</strong> 4.49</p>
        <p><strong>GPA (UW):</strong> 4</p>
        <p><strong>College Acceptances</strong></p>
        <div>
          {/* Insert college logos */}
        </div>
        <button className="px-2 py-1 bg-purple-500 text-white border border-black-300 rounded-lg text-sm w-full">Read Jane's applications</button>
      </div>
    </div>
  )
}
