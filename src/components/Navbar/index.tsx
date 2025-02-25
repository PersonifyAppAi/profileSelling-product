"use client"

import { useState } from "react"
import { Nunito } from "next/font/google"
import { Button } from "@/components/shadcn/ui/button"
import Logo from "./Logo"
import NavLink from "./NavLink"
import NavDropdown from "./NavDropdown"

const nunito = Nunito({ subsets: ["latin"] })

export default function Navbar() {
  const [schoolsOpen, setSchoolsOpen] = useState(false)
  const [pricingOpen, setPricingOpen] = useState(false)

  const navLinks = [
    { name: "Read Profiles", href: "/profiles" },
    { name: "Revise Essays", href: "/essays" },
    { 
      name: "Schools",
      dropdownItems: [
        { name: "Search Schools", href: "/schools/search" },
        { name: "Compare Schools", href: "/schools/compare" },
        { name: "Rankings", href: "/schools/rankings" },
      ]
    },
    { name: "ChanceMe", href: "/chanceme" },
    { 
      name: "Pricing",
      dropdownItems: [
        { name: "Student Plans", href: "/pricing/student" },
        { name: "School Plans", href: "/pricing/school" },
        { name: "Enterprise", href: "/pricing/enterprise" },
      ]
    },
  ]

  return (
    <div className="w-full">
      <nav className={`${nunito.className}`}>
        <div className="flex h-28 items-center justify-between">
          <Logo />

          <div className="ml-5 flex items-center gap-10">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                {link.dropdownItems ? (
                  <NavDropdown
                    name={link.name}
                    items={link.dropdownItems}
                    isOpen={link.name === "Schools" ? schoolsOpen : pricingOpen}
                    onOpenChange={link.name === "Schools" ? setSchoolsOpen : setPricingOpen}
                  />
                ) : (
                  <NavLink href={link.href}>{link.name}</NavLink>
                )}
              </div>
            ))}

            <Button 
              className="ml-5 bg-personifyAccent3 hover:bg-personifyAccent4 px-4 py-5 rounded-xl font-bold text-base"
            >
              <a href="/signup">Create Account</a>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  )
}
