import React, { useEffect, useRef } from "react"
import '../styles/EventDisplay.css'
import { useMessageContext } from '../contexts/MessageContext'

function EventDisplay() {
  const { messages } = useMessageContext();
  const eventContainerRef = useRef(null);


  useEffect(() => {
    if (eventContainerRef.current) {
      eventContainerRef.current.scrollTop = eventContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="event-display cyberpunk-terminal">
      <div className="terminal-body" ref={eventContainerRef}>
        {messages.map((message, index) => (
          <div key={index} className={`log-entry ${message.type}`}>
            <span className="prompt">&gt; </span>
            <span className={`message ${message.type}`}>{message.content}</span>
          </div>
        ))}
        {messages.length === 0 && (
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
