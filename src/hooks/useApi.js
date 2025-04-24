const getBaseUrl = () => {
  return `http://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}`
}

const getWebsocketUrl = () => {
  return `ws://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/echo`
}

export const WEB_SOCKET_URL = getWebsocketUrl()
export const API_BASE_URL = getBaseUrl()

export const sendYoutubeUrl = async (url, operationType, prompt, sendMessage, userId) => {
  try {
    const apiUrl = `${API_BASE_URL}/api/speecher`
    
    // Create base query params
    const queryParams = new URLSearchParams({
      video_url: url,
      client_id: userId,
      operation_type: operationType,
    })

    // Only add prompt if it's not empty
    if (prompt !== "") {
      queryParams.append('prompt', prompt)
    }

    const response = await fetch(`${apiUrl}?${queryParams}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error sending YouTube URL:', error);
    throw error;
  }
}
