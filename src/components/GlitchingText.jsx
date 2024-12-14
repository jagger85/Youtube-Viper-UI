import React, { useState, useEffect } from 'react'
import '../styles/GlitchingHeader.css'

function GlitchingText({ text }) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 2000) // Glitch effect lasts for 2 seconds
    }, 60000) // Trigger every 60 seconds

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <h1
      className={`glitching-text ${isGlitching ? 'glitch' : ''}`}
      data-text={text}
    >
      {text}
    </h1>
  )
}

export default GlitchingText
