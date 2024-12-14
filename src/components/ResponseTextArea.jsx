import React, { useRef } from 'react'
import '../styles/ScrappedTextField.css' // Make sure to create this CSS file

function ResponseTextArea({ text }) {
  const textAreaRef = useRef(null)

  return (
    <div className="textarea-wrapper">
      <textarea
        ref={textAreaRef}
        value={text}
        readOnly
        className="text-area custom-scrollbar"
        placeholder="Scrapped text will appear here..."
        tabIndex="-1"
        onFocus={(e) => e.target.blur()}
        style={{ resize: 'none' }}
      />
    </div>
  )
}

export default ResponseTextArea
