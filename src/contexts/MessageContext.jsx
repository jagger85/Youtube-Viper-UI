import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import useWebSocket from 'react-use-websocket'
import useStorage from '../hooks/useStorage';
import { MESSAGE_TYPE } from '../constants/messageType';
const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const { saveUserId } = useStorage();
  const [currentMessage, setCurrentMessage] = useState(null);

  const { lastMessage } = useWebSocket('ws://localhost:8000/echo', {
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    reconnectInterval: 3000,
  });

  useEffect(() => {
    if (lastMessage !== null) {
      console.log('WebSocket message received:', lastMessage.data);
      try {
        const parsedMessage = JSON.parse(lastMessage.data);
        addMessage(parsedMessage);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    }
  }, [lastMessage]);

  const addMessage = useCallback((message) => {
    switch (message.type) {
      case 'PROGRESS':
        setCurrentMessage({ type: 'progress', content: message.content });
        break;

        case MESSAGE_TYPE.LOGIN:
          saveUserId(message.client_id);
          setCurrentMessage({ type: 'login', content: "You are connected to the brain" });
          break;

        case MESSAGE_TYPE.OPERATION_STATUS:
          setCurrentMessage({ type: message.type, content: `Your operation is currently ${message.status}` });
          break;

      case MESSAGE_TYPE.INFO:
        setCurrentMessage({ type: message.type, content: message.content });
        break;

      default:
        console.log('Unknown message type:', message.type);
        console.log('Message:', message);
    }
  }, []);

  const addInternalMessage = useCallback((message) => {
    setCurrentMessage({ type: 'internal', content: message });
  }, []);

  const clearMessage = useCallback(() => {
    setCurrentMessage(null);
  }, []);

  return (
    <MessageContext.Provider value={{ currentMessage, addMessage, addInternalMessage, clearMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = () => useContext(MessageContext);

export const useSendMessage = () => {
  const { addMessage } = useMessageContext();
  return addMessage;
};

export const useSendInternalMessage = () => {
  const { addInternalMessage } = useMessageContext();
  return addInternalMessage;
};

export const useClearMessage = () => {
  const { clearMessage } = useMessageContext();
  return clearMessage;
};
