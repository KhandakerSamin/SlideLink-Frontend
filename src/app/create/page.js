"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import CreateForm from "@/components/CreateCollection/create-form"
import SuccessView from "@/components/CreateCollection/success-view"
import LoadingSpinner from "@/components/CreateCollection/loading-spinner"
import { showNotification } from "@/lib/notifications"

export default function CreatePage() {
  const [formData, setFormData] = useState({
    section: "",
    courseCode: "",
    semester: "Spring 2026",
    faculty: "",
    department: "",
    teamCount: "",
    password: "",
    creatorEmail: "",
  })

  

  const [createdCollection, setCreatedCollection] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call - replace with your actual API endpoint
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/collections`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      )

      const data = await response.json()

      if (response.ok) {
        // Use the username returned from backend
        const username = data.collection.username
        // Create the collection object
        const mockCollection = {
          username: username,
          shareLink: `${window.location.origin}/collections/${username}`,
          qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`${window.location.origin}/collections/${username}`)}`,
          ...data.collection,
        }
        setCreatedCollection(mockCollection)
        showNotification('✅ Collection created successfully!', 'success')
      } else {
        setError(data.error || "Failed to create collection")
        showNotification(`❌ ${data.error || 'Failed to create collection'}`, 'error')
      }
    } catch (error) {
      setError("Something went wrong. Please try again.")
      showNotification('⚠️ Something went wrong. Please try again.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading spinner
  if (isLoading) {
    return <LoadingSpinner />
  }

  // Show success view after creation
  if (createdCollection) {
    return <SuccessView collection={createdCollection} onNotification={showNotification} />
  }

  // Show create form by default
  return (
    <CreateForm
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      error={error}
      isLoading={isLoading}
    />
  )
}
