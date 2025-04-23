import React, { useState } from 'react';
import UserInputForm from './components/UserInputForm'
import ResponseTextArea from './components/ResponseTextArea'
import EventDisplay from './components/EventDisplay'
import { MessageProvider } from './contexts/MessageContext';
import './styles/App.css'
import Icons from './components/Icons'
import GlitchingText from './components/GlitchingText'
function App() {
  const [transcriptionText, setTranscriptionText] = useState('');

  const handleTranscriptionReceived = (text) => {
    setTranscriptionText(text);
  };

  return (
    <MessageProvider>
      <div className="app-container">
          <div className="tech-border">
            <div className="content-wrapper">
              <GlitchingText text="Data Extraction Terminal" />
          </div>
          <div className="horizontal-layout">
            <UserInputForm onTranscriptionReceived={handleTranscriptionReceived} />
            <ResponseTextArea text={transcriptionText} />
          </div>
          <EventDisplay />
            <Icons text={transcriptionText} />
        </div>
      </div>
    </MessageProvider>
  )
}

export default App
