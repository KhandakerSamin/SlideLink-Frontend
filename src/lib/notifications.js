// lib/notifications.js
export function showNotification(message, type = "success") {
  const notification = document.createElement("div")
  notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 transform translate-x-0 opacity-100 ${
    type === "success" ? "bg-green-600" : "bg-red-600"
  }`
  notification.textContent = message
  document.body.appendChild(notification)

  // Animate out after 3 seconds
  setTimeout(() => {
    notification.style.opacity = "0"
    notification.style.transform = "translateX(100%)" // Slide out to the right
    setTimeout(() => document.body.removeChild(notification), 500) // Remove after transition
  }, 3000)
}
