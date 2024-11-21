import React, { createContext, useState, useContext, useCallback } from 'react';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = useCallback((message) => {
    const [level, ...msgParts] = message.split(': ');
    const msg = msgParts.join(': ');

    setMessages((prevMessages) => {
      const newMessages = [...prevMessages];
      
      switch (level) {
        case 'PROGRESS':
          if (newMessages.length > 0 && newMessages[newMessages.length - 1].type === 'progress') {
            newMessages[newMessages.length - 1] = { type: 'progress', content: msg };
          } else {
            newMessages.push({ type: 'progress', content: msg });
          }
          break;
        case 'DEBUG':
          newMessages.push({ type: 'debug', content: msg });
          break;
        case 'INFO':
          newMessages.push({ type: 'info', content: msg });
          break;
        case 'WARNING':
          newMessages.push({ type: 'warning', content: msg });
          break;
        case 'ERROR':
          newMessages.push({ type: 'error', content: msg });
          break;
        case 'CRITICAL':
          newMessages.push({ type: 'critical', content: msg });
          break;
        default:
          newMessages.push({ type: 'normal', content: msg });
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
