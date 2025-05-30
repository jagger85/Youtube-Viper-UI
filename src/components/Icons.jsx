import React, { useState } from 'react'
import FloppyDisk from '../assets/floppy-disk-svgrepo-com.svg'
import Copy from '../assets/copy-svgrepo-com.svg'
import { useSendMessage } from '../contexts/MessageContext'
import useStoreFile from '../hooks/useStoreFile'
import { MESSAGE_TYPE } from '../constants/messageType'

const Icons = (props) => {
  const { text, setInfoVisible} = props
  const [hoveredIcon, setHoveredIcon] = useState(null)
  const { storeFile, copyNeoToClipboard, createTxtFile } = useStoreFile()
  const sendMessage = useSendMessage()
  const [error, setError] = useState(null)

  const iconStyle = (iconName) => ({
    filter:
      hoveredIcon === iconName ? 'var(--svg-icon-hover)' : 'var(--svg-icon)',
    transition: 'filter 0.3s ease',
    cursor: 'pointer',
  })

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file && file.type === 'text/plain') {
      storeFile(file, 'trinity')
      setError(null)
      sendMessage({type: MESSAGE_TYPE.INFO, content: 'The file is now uploaded into system memory...'})
    } else {
      setError('Please select valid data')
    }
  }

  return (
    <div className='icon-container'>
      <img
        src={FloppyDisk}
        alt="Floppy Disk"
        style={iconStyle('floppy')}
        onMouseEnter={() => setHoveredIcon('floppy')}
        onMouseLeave={() => setHoveredIcon(null)}
        onClick={()=>createTxtFile(text)}
      />
      <img
        src={Copy}
        alt="Copy"
        style={iconStyle('copy')}
        onMouseEnter={() => setHoveredIcon('copy')}
        onMouseLeave={() => setHoveredIcon(null)}
        onClick={()=>copyNeoToClipboard(text)}
      />
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        accept=".txt"
        onChange={handleFileChange}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default Icons
