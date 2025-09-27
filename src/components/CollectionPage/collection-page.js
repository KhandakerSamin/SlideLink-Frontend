"use client"
import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import LoadingSpinner from "./loading-spinner"
import AuthenticationForm from "./authentication-form"
import CollectionHeader from "./collection-header"
import TabNavigation from "./tab-navigation"
import SubmitForm from "./submit-form"
import SubmissionsList from "./submissions-list"

export default function CollectionPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const username = params.username
  const password = searchParams.get("password")

  const [collectionData, setCollectionData] = useState(null)
  const [submissions, setSubmissions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState(password || "")
  const [activeTab, setActiveTab] = useState("submit")

  // Debug logging to help troubleshoot
  console.log("🏠 CollectionPage - Username from params:", username)
  console.log("🏠 CollectionPage - Current URL:", typeof window !== "undefined" ? window.location.href : "N/A")

  useEffect(() => {
    const savedAuth = localStorage.getItem(`auth_${username}`)
    if (savedAuth) {
      setIsAuthenticated(true)
      loadCollectionData()
      loadSubmissions()
      setIsLoading(false)
    } else if (password) {
      authenticateAndLoadData()
    } else {
      setIsLoading(false)
    }
  }, [username, password])

  const authenticateAndLoadData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/collections/join`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username,
            password: password || passwordInput,
          }),
        },
      )
      if (response.ok) {
        setIsAuthenticated(true)
        localStorage.setItem(`auth_${username}`, "true")
        await loadCollectionData()
        await loadSubmissions()
      } else {
        const data = await response.json()
        alert(`Authentication Failed: ${data.error || "Invalid password"}`)
      }
    } catch (error) {
      alert("Error: Failed to authenticate")
    } finally {
      setIsLoading(false)
    }
  }

  const loadCollectionData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/collections/${username}`,
      )
      if (response.ok) {
        const data = await response.json()
        setCollectionData(data)
      }
    } catch (error) {
      console.error("Failed to load collection data:", error)
    }
  }

  const loadSubmissions = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/collections/${username}/submissions`,
      )
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data.submissions)
        console.log("✅ Loaded submissions:", data.submissions?.length || 0)
      }
    } catch (error) {
      console.error("Failed to load submissions:", error)
    }
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated) {
    return (
      <AuthenticationForm
        username={username}
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
        onAuthenticate={authenticateAndLoadData}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-violet-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <CollectionHeader collectionData={collectionData} submissions={submissions} />

        <div className="mt-8">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} submissionsCount={submissions.length} />

          {activeTab === "submit" ? (
            <SubmitForm username={username} onSubmissionSuccess={loadSubmissions} />
          ) : (
            // ✅ FIXED: Pass the username as collectionUsername prop
            <SubmissionsList 
              submissions={submissions} 
              collectionUsername={username}
            />
          )}
        </div>
      </div>
    </div>
  )
}