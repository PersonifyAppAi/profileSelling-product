"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/shadcn/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/ui/tabs"
import { Badge } from "@/components/shadcn/ui/badge"
import { Separator } from "@/components/shadcn/ui/separator"
import { ProfileData } from "@/components/ProfileBrowser/ProfileCard"
import { MOCK_PROFILES } from "@/lib/mock-data"
import Navbar from "@/components/Navbar"
import Image from "next/image"

export default function ProfileDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // replace with api call
    const fetchProfile = async () => {
      setLoading(true)
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Find profile by ID from mock data
        const foundProfile = MOCK_PROFILES.find(p => p.id === params.id)
        
        if (foundProfile) {
          setProfile(foundProfile)
        } else {
          // Handle not found
          console.error("Profile not found")
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProfile()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8 px-4 max-w-[78rem]">
		<Navbar />
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
            <div className="border-2 border-black rounded-lg shadow-[rgb(12,74,110)_-5px_5px_0px] bg-slate-50 p-6 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                <div>
                  <div className="h-6 w-40 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-60 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8 px-4 max-w-[78rem]">
		  <Navbar />
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
            <p className="mb-6">The profile you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => router.push('/profiles')}>
              Back to Profiles
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4 max-w-[78rem]">
	    <Navbar />
        <Button 
          variant="outline" 
          className="mb-4"
          onClick={() => router.back()}
        >
          <ChevronLeft size={16} className="mr-2" />
          Back to Profiles
        </Button>

        {/* Profile Header */}
        <Card className="border-2 border-black rounded-lg shadow-[rgb(12,74,110)_-5px_5px_0px] bg-slate-50 mb-6">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-bold">
                {profile.avatar || profile.name.charAt(0)}
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">{profile.name}</CardTitle>
                <p className="text-gray-600">{profile.major} student at {profile.university}</p>
                {profile.additionalInfo && (
                  <p className="text-sm mt-1">{profile.additionalInfo}</p>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">Background</h3>
                <p>{profile.background || "Not specified"}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">Academic Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.academicInterests.map((interest, index) => (
                    <Badge key={index} variant="secondary">{interest}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">College Acceptances</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.acceptances.map((school, index) => (
                    <Badge key={index} variant="outline">{school}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
              <div>
                <p className="text-4xl font-bold text-gray-800">{profile.stats?.essays || 0}</p>
                <p className="text-sm text-gray-600">essays</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-gray-800">{profile.stats?.colleges || profile.acceptances.length}</p>
                <p className="text-sm text-gray-600">colleges</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-gray-800">{profile.stats?.awards || 0}</p>
                <p className="text-sm text-gray-600">awards</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-gray-800">{profile.stats?.activities || 0}</p>
                <p className="text-sm text-gray-600">activities</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-gray-800">{profile.stats?.qAndAs || 0}</p>
                <p className="text-sm text-gray-600">Q&As</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-gray-800">{profile.stats?.apIBs || 0}</p>
                <p className="text-sm text-gray-600">AP/IBs</p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">SAT</h3>
                <p className="text-xl font-bold">{profile.testScores?.sat || "Not provided"}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">GPA (Weighted)</h3>
                <p className="text-xl font-bold">{profile.gpa?.weighted || "Not provided"}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">GPA (Unweighted)</h3>
                <p className="text-xl font-bold">{profile.gpa?.unweighted || "Not provided"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different sections */}
        <Tabs defaultValue="essays" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="essays">Essays</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="awards">Awards</TabsTrigger>
            <TabsTrigger value="ap-scores">AP/IB Scores</TabsTrigger>
          </TabsList>
          
          <TabsContent value="essays">
            <Card className="border-2 border-black rounded-lg shadow-[rgb(12,74,110)_-5px_5px_0px] bg-slate-50">
              <CardHeader>
                <CardTitle>Essays</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Placeholder for essays */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-bold mb-2">{profile.university} - Personal Statement</h3>
                    <p className="text-sm text-gray-600 mb-2">Prompt: Tell us about yourself and why you want to attend our university.</p>
                    <div className="bg-gray-50 p-4 rounded border border-gray-200">
                      <p>This is a placeholder for the essay content. In a real application, this would contain the actual essay text.</p>
                    </div>
                  </div>
                  
                  {/* More essay placeholders */}
                  {profile.acceptances.slice(0, 2).map((school, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-bold mb-2">{school} - Supplemental Essay</h3>
                      <p className="text-sm text-gray-600 mb-2">Prompt: Why {school}?</p>
                      <div className="bg-gray-50 p-4 rounded border border-gray-200">
                        <p>This is a placeholder for the supplemental essay content. In a real application, this would contain the actual essay text.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activities">
            <Card className="border-2 border-black rounded-lg shadow-[rgb(12,74,110)_-5px_5px_0px] bg-slate-50">
              <CardHeader>
                <CardTitle>Extracurricular Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Placeholder activities */}
                  {Array.from({ length: profile.stats?.activities || 3 }).map((_, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-bold">Activity {index + 1}</h3>
                      <p className="text-sm">This is a placeholder for activity details. In a real application, this would contain the actual activity description.</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="awards">
            <Card className="border-2 border-black rounded-lg shadow-[rgb(12,74,110)_-5px_5px_0px] bg-slate-50">
              <CardHeader>
                <CardTitle>Awards & Honors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Placeholder awards */}
                  {Array.from({ length: profile.stats?.awards || 2 }).map((_, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-bold">Award {index + 1}</h3>
                      <p className="text-sm">This is a placeholder for award details. In a real application, this would contain the actual award description.</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ap-scores">
            <Card className="border-2 border-black rounded-lg shadow-[rgb(12,74,110)_-5px_5px_0px] bg-slate-50">
              <CardHeader>
                <CardTitle>AP/IB Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Placeholder AP/IB scores */}
                  {Array.from({ length: profile.stats?.apIBs || 5 }).map((_, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
                      <span>AP Subject {index + 1}</span>
                      <Badge variant="outline" className="font-bold">{Math.floor(Math.random() * 2) + 4}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 
