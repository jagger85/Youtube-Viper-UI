import React, { useRef } from 'react'
import '../styles/ResponseTextArea.css'

function ResponseTextArea({ text }) {
  const textAreaRef = useRef(null)

  return (
      <textarea
        ref={textAreaRef}
        value={text}
        readOnly
        className="response-text-area custom-scrollbar"
        placeholder="Scrapped text will appear here..."
        tabIndex="-1"
        onFocus={(e) => e.target.blur()}
      />
  )
}

export default ResponseTextArea
