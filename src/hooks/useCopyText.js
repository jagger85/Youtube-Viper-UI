import { useSendMessage } from '../contexts/MessageContext';

export function useCopyText() {
  const sendMessage = useSendMessage();

  const copyText = async (text) => {
    if (!text || !text.trim()) {
      console.log('No text to copy');
      sendMessage('Copy failed... no content found in the data stream');
      return;
    }
    
    try {
      await navigator.clipboard.writeText(text);
      sendMessage('The information is now in your data buffer');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      sendMessage('Copy failed... an error occurred');
    }
  };

  return { copyText };
}
