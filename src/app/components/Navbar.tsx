"use client"

import Link from "next/link"
import { useState } from "react"

export default function Navbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false)


  return (
    <nav className="bg-slate-50 p-8 sticky top-0 z-10">
        <header className="md:px-6 prose prose-xl mx-auto flex justify-between flex-col sm:flex-row text-sky-900">
            <h1 className="text-3xl font-black grid place-content-center mb-2 md:mb-0">
                <Link href="/">Personify</Link>
            </h1>

            <div className="hidden xl:flex flex-row justify-center items-center sm:justify-evenly align-middle gap-4 font-semibold">
                <Link href="/">
                    Read Profiles
                </Link>
                <Link href="/">
                    Revise Essays
                </Link>
                <Link href="/">
                    Schools
                </Link>
                <Link href="/">
                    ChanceMe
                </Link>
                <Link href="/">
                    Pricing
                </Link>
                <button className="bg-sky-900 text-slate-50 px-4 py-2 rounded-lg">
                    Create Account
                </button>
            </div>

            <i
                className="bx bx-menu xl:hidden block text-5xl cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            ></i>
            <div 
                className={`absolute xl:hidden top-24 left-0 w-full bg-white flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform ${isMenuOpen ? "opacity-100 pointer-events-auto": "opacity-0 pointer-events-none"}`} 
                style={{transition: "transform 0.3s ease, opacity 0.3s ease"}}
            >
                <Link href="/">
                    Read Profiles
                </Link>
                <Link href="/">
                    Revise Essays
                </Link>
                <Link href="/">
                    Schools
                </Link>
                <Link href="/">
                    ChanceMe
                </Link>
                <Link href="/">
                    Pricing
                </Link>
                <button className="bg-sky-900 text-slate-50 px-4 py-2 rounded-lg">
                    Create Account
                </button>
            </div>
        </header>
    </nav>
  )
}
