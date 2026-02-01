"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { showNotification } from "@/lib/notifications" // Import custom notification


import LoadingSpinner from "@/components/CollectionPage/loading-spinner"
import AuthenticationForm from "@/components/CollectionPage/authentication-form"
import CollectionHeader from "@/components/CollectionPage/collection-header"
import TabNavigation from "@/components/CollectionPage/tab-navigation"
import SubmitForm from "@/components/CollectionPage/submit-form"
import SubmissionsList from "@/components/CollectionPage/submissions-list"

export default function CollectionPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const username = params.username
  const passwordFromUrl = searchParams.get("password")

  const [collectionData, setCollectionData] = useState(null)
  const [submissions, setSubmissions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState(passwordFromUrl || "")
  const [activeTab, setActiveTab] = useState("submit")

  // Effect to handle initial load and authentication
  useEffect(() => {
    const initialAuthCheck = async () => {
      if (passwordFromUrl) {
        await authenticateAndLoadData(passwordFromUrl)
      } else {
        // Allow direct access without password (for creator)
        setIsAuthenticated(true)
        await loadCollectionData()
        await loadSubmissions()
        setIsLoading(false)
      }
    }
    initialAuthCheck()
  }, [username, passwordFromUrl])

  // Function to handle authentication and data loading
  const authenticateAndLoadData = async (authPassword) => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/collections/join`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username,
            password: authPassword,
          }),
        },
      )

      if (response.ok) {
        setIsAuthenticated(true)
        await loadCollectionData()
        await loadSubmissions()
        showNotification("Collection accessed successfully!", "success")
      } else {
        const data = await response.json()
        showNotification(`Authentication Failed: ${data.error || "Invalid password"}`, "error")
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error("Error during authentication:", error)
      showNotification("Failed to connect to the server. Please try again.", "error")
      setIsAuthenticated(false)
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
      } else {
        console.error("Failed to load collection data:", response.statusText)
        showNotification("Failed to load collection details.", "error")
      }
    } catch (error) {
      console.error("Failed to load collection data:", error)
      showNotification("Could not load collection details due to a network issue.", "error")
    }
  }

  const loadSubmissions = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/collections/${username}/submissions`,
      )
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data.submissions || [])
      } else {
        console.error("Failed to load submissions:", response.statusText)
        showNotification("Failed to load submissions.", "error")
      }
    } catch (error) {
      console.error("Failed to load submissions:", error)
      showNotification("Could not load submissions due to a network issue.", "error")
    }
  }

  // Conditional rendering based on loading and authentication state
  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated) {
    return (
      <AuthenticationForm
        username={username}
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
        onAuthenticate={() => authenticateAndLoadData(passwordInput)}
      />
    )
  }

  // If authenticated, render the collection content
  return (
    <div className="min-h-screen w-full relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {collectionData ? (
          <>
            <CollectionHeader collectionData={collectionData} submissions={submissions} />
            <div className="mt-8">
              <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} submissionsCount={submissions.length} />
              <div className="mt-0">
                {activeTab === "submit" ? (
                  <SubmitForm username={username} onSubmissionSuccess={loadSubmissions} onNotification={showNotification} />
                ) : (
                  <SubmissionsList 
                    submissions={submissions} 
                    collectionUsername={username}
                    onSubmissionsChange={loadSubmissions}
                  />
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center glass-effect p-8 rounded-2xl border border-indigo-500/10">
            <p className="text-slate-300">Loading collection details...</p>
          </div>
        )}
      </div>
    </div>
  )
}
