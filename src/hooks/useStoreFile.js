import { useCallback } from 'react';
import { useSendMessage } from '../contexts/MessageContext';
import { MESSAGE_TYPE } from '../constants/messageType';
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

    const copyNeoToClipboard = useCallback((text) => {
        const content = (text);
        if (content !== '') {
            navigator.clipboard.writeText(content).then(() => {
                sendMessage({ type: MESSAGE_TYPE.INFO, content: 'The information is now in your data buffer...' });
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                sendMessage({ type: MESSAGE_TYPE.INFO, content: 'Failed to copy text...' });
            });
        } else {
            sendMessage({ type: MESSAGE_TYPE.INFO, content: 'No data available for transmission...' });
        }
    }, [sendMessage]);

    const createTxtFile = (text) => {
        const content = text
        if (content !== '') {
            try {
                const blob = new Blob([content], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'your_data.txt';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            } catch (e) {
                console.log(e);
                sendMessage({type:MESSAGE_TYPE.ERROR, content:'An unexpected disruption occurred'});
            }
        } else {
            sendMessage({ type: MESSAGE_TYPE.INFO, content: 'There is nothing to replicate' })
        }
    }

    return { storeFile, getFileContent, copyNeoToClipboard, createTxtFile };
}

export default useStoreFile;
