import React from "react"
import '../styles/EventDisplay.css'
import { useMessageContext } from '../contexts/MessageContext'

function EventDisplay() {
  const { currentMessage } = useMessageContext();

  return (
    <div className="event-display">
      <div className="terminal-body">
        {currentMessage ? (
          <div className={`log-entry ${currentMessage.type}`}>
            <span className="prompt">&gt; </span>
            <span className={`message ${currentMessage.type}`}>{currentMessage.content}</span>
          </div>
        ) : (
          <div className="log-entry awaiting">
            <span className="prompt">&gt; </span>
            <span className="message">Awaiting your next input... system on standby</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventDisplay;
