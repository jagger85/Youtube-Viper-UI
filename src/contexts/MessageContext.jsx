import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import useWebSocket from 'react-use-websocket'
import  useStorage  from '../hooks/useStorage';
import { MESSAGE_TYPE } from '../constants/messageType';
const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const { saveUserId } = useStorage();

  const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:8000/echo', {
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    reconnectInterval: 3000,
  });

  useEffect(() => {
    if (lastMessage !== null) {
      console.log(lastMessage.data);
      addMessage(JSON.parse(lastMessage.data));
    }
  }, [lastMessage]);


  const [messages, setMessages] = useState([]);

  const addMessage = useCallback((message) => {

    setMessages((prevMessages) => {
      const newMessages = [...prevMessages];

      switch (message.type) {
        case 'PROGRESS':
          if (newMessages.length > 0 && newMessages[newMessages.length - 1].type === 'progress') {
            newMessages[newMessages.length - 1] = { type: 'progress', content: msg };
          } else {
            newMessages.push({ type: 'progress', content: msg });
          }
          break;
        case MESSAGE_TYPE.LOGIN:
          saveUserId(message.client_id);
          newMessages.push({ type: 'login', content: "You are connected to the brain"});
          break;
        case MESSAGE_TYPE.OPERATION_STATUS:
          newMessages.push({ type: message.type, content:`Your operation is currently ${message.status}`});
          break;
        default:
          console.log('Unknown message type:', message.type);
          console.log('Message:', message);
      }

      return newMessages;
    });
  }, []);

  const addInternalMessage = useCallback((message) => {
    setMessages((prevMessages) => [...prevMessages, { type: 'internal', content: message }]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return (
    <MessageContext.Provider value={{ messages, addMessage, addInternalMessage, clearMessages }}>
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

export const useClearMessages = () => {
  const { clearMessages } = useMessageContext();
  return clearMessages;
};
