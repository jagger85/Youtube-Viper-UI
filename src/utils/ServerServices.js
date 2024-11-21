import { useEffect } from 'react';
import { useSendInternalMessage } from '../contexts/MessageContext';
import { useSendMessage } from '../contexts/MessageContext';

const backendHost = import.meta.env.VITE_BACKEND_HOST || 'localhost'
const backendPort = import.meta.env.VITE_BACKEND_PORT || '3000'

export function useSSE() {
  const sendMessage = useSendInternalMessage();
  const serverMessage = useSendMessage();

  useEffect(() => {
    const backendUrl = `https://${backendHost}:${backendPort}/flux-stream`;
    const eventSource = new EventSource(backendUrl);
    eventSource.onopen = () => { 
      sendMessage("Connection to the network established. Awaiting data influx...");
    };

    eventSource.onerror = (err) => {
      sendMessage('Connection to mainframe lost');
      console.error("EventSource failed:", err);
    };

    eventSource.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      
      if (parsedData.error) {
        sendMessage('SYSTEM MALFUNCTION');
      } else {
        serverMessage(parsedData.message);
      }
    };

    return () => eventSource.close();
  }, [sendMessage]);
}

export async function sendYoutubeUrl(url, language, prompt, sendMessage) {
  sendMessage(`Transmitting the requested URL... routing through the grid`);
  return new Promise((resolve, reject) => {
    try {
      const backendUrl = `https://${backendHost}:${backendPort}`;
      const eventSource = new EventSource(`${backendUrl}/feed-system-target?url=${encodeURIComponent(url)}&language=${language}&prompt=${encodeURIComponent(prompt)}`);
      
      eventSource.onmessage = (event) => {
        console.log('Received message:', event.data);
        if (JSON.parse(event.data).error) {
          sendMessage('Detected error');
          console.log('Detected error: ' + JSON.parse(event.data).error);
          eventSource.close();
          reject(event.data.error);
        }
        const data = JSON.parse(event.data);
        if (data.transcriptionFinished && data.transcriptionText) {
          sendMessage('Transcription finished');
          sessionStorage.setItem('neo', data.transcriptionText);
          eventSource.close();
          resolve(data.transcriptionText);
        }
      }
      
      eventSource.onerror = (err) => {
       console.log(err)
        eventSource.close();
        reject(err);
      }
    } catch (err) {
      sendMessage('Error setting up EventSource');
      reject(err);
    }
  });
}


