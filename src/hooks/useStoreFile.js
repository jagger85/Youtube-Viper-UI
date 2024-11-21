import { useCallback } from 'react';
import { useSendMessage } from '../contexts/MessageContext';

function useStoreFile() {
    const sendMessage = useSendMessage();

    const storeFile = useCallback((file, name) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            sessionStorage.setItem(name, content);
        };
        reader.readAsText(file);
    }, []);
    
    const getFileContent = useCallback((name) => {
        return sessionStorage.getItem(name);
    }, []);
    
    const copyNeoToClipboard = useCallback(() => {
        const content = sessionStorage.getItem('neo');
        if (content) {
            navigator.clipboard.writeText(content).then(() => {
                console.log('The information is now in your data buffer...');
                sendMessage('The information is now in your data buffer...');
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                sendMessage('Failed to copy text...');
            });
        } else {
            console.error('No text found with the name "neo"');
            sendMessage('No data available for transmission...');
        }
    }, [sendMessage]);

    return { storeFile, getFileContent, copyNeoToClipboard };
}

export default useStoreFile;
