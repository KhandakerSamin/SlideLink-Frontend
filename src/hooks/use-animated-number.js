"use client"

import { useState, useEffect, useRef } from "react"

export function useAnimatedNumber(targetValue, duration = 1000) {
  const [currentValue, setCurrentValue] = useState(0)
  const animationFrameRef = useRef(null)
  const startTimeRef = useRef(null)

  useEffect(() => {
    setCurrentValue(0) // Reset to 0 when targetValue changes
    startTimeRef.current = null

    const animate = (currentTime) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime
      }

      const progress = (currentTime - startTimeRef.current) / duration
      const animatedValue = Math.min(progress, 1) * targetValue

      setCurrentValue(Math.floor(animatedValue))

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        setCurrentValue(targetValue) // Ensure it ends on the exact target value
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [targetValue, duration])

  return currentValue
}
