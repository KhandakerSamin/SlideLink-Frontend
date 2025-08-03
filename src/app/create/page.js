"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import CreateForm from "@/components/CreateCollection/create-form"
import SuccessView from "@/components/CreateCollection/success-view"
import LoadingSpinner from "@/components/CreateCollection/loading-spinner"

export default function CreatePage() {
  const [formData, setFormData] = useState({
    section: "",
    courseCode: "",
    semester: "Summer 2025",
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
        // Generate a proper collection username
        const deptCode = formData.department.split(" ")[0]; // Use the full first word
        const username = `${formData.section}-${formData.courseCode}-2025-${deptCode}`;
        // Create the collection object
        const mockCollection = {
          username: username,
          shareLink: `${window.location.origin}/collections/${username}?password=${formData.password}`,
          qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`${window.location.origin}/collections/${username}?password=${formData.password}`)}`,
          ...formData,
        }
        setCreatedCollection(mockCollection)
      } else {
        setError(data.error || "Failed to create collection")
      }
    } catch (error) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const showNotification = (message, type = "success") => {
    // Simple notification system - you can replace with a proper toast library
    const notification = document.createElement("div")
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 ${type === "success" ? "bg-green-600" : "bg-red-600"
      }`
    notification.textContent = message
    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.opacity = "0"
      setTimeout(() => document.body.removeChild(notification), 300)
    }, 3000)
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
