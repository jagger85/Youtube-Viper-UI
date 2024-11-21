import React, { useState, useRef, useEffect } from 'react';
import '../styles/UserInputForm.css'; // Make sure to create this CSS file
import { sendYoutubeUrl } from '../utils/ServerServices';
import { useSendInternalMessage } from '../contexts/MessageContext';

function UserInputForm({ onTranscriptionReceived }) {
  const [url, setUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('en');
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [dots, setDots] = useState('');
  const inputRef = useRef(null);
  const sendMessage = useSendInternalMessage();

  useEffect(() => {
    if (isDecrypting) {
      const interval = setInterval(() => {
        setDots(prevDots => {
          if (prevDots.length >= 3) return '';
          return prevDots + '.';
        });
      }, 500);
      return () => clearInterval(interval);
    } else {
      setDots('');
    }
  }, [isDecrypting]);

  useEffect(() => {
    if (isDecrypting && inputRef.current) {
      inputRef.current.blur();
    }
  }, [isDecrypting]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    function isValidYoutubeUrl(url) {
      const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
      return regex.test(url);
    }
    
    if(isValidYoutubeUrl(url)){
      try {
      setIsDecrypting(true);
        const transcription = await sendYoutubeUrl(url, language, prompt, sendMessage);
        if (transcription !== null) {
          onTranscriptionReceived(transcription);
        } else {
          console.error('Transcription failed or returned null');
        }
      } catch (err) {
        console.error('Error setting up EventSource:', err);
      } finally {
        setIsDecrypting(false);
      }
    }
    else{
      console.log(url)
      url === '' ? sendMessage("Error: The data stream requires an address—empty fields won't transmit") :
      sendMessage("Input rejected: Only a valid YouTube address can breach the grid.")
    }
    
  }
  return (
    <div className="user-input-form">
      <form onSubmit={handleSubmit}>
        <div className="input-container" style={{ display: 'flex', alignItems: 'center' }}>
         <div className="input-label-container">URL&gt;</div>
          <input
            id="urlInput"
            ref={inputRef}
            type="text"
            placeholder="Only a valid YouTube URL accepted"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isDecrypting}
            onFocus={(e) => isDecrypting && e.target.blur()}
          />
        </div>
        <div className="input-container" style={{ display: 'flex', alignItems: 'center' }}>
         <div className="input-label-container"> Prompt&gt; </div>
          <input
            id="promptInput"
            type="text"
            placeholder="Inject your prompt here, data stream awaiting input..."
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isDecrypting}
          />
        </div>
        <div className="form-actions">
          <button type="submit" disabled={isDecrypting} className="decrypt-button">
            <span className="button-content">
              <span className="button-text">
                {isDecrypting ? 'Decrypting' : 'Extract Data'}
              </span>
              {isDecrypting && <span className="loading-dots">{dots}</span>}
            </span>
          </button>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="language-selector"
            disabled={isDecrypting}
          >
            <option value="en">NeoEnglish</option>
            <option value="es">CyberSpanish</option>
            <option value="">AutoDecode</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default UserInputForm;