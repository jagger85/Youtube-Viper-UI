const getBaseUrl = () => {
  if (import.meta.env.PROD) {
    console.log('Production environment detected');
    console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
    // In production, API requests will be proxied through Nginx
    return '/api'  // Remove the environment variable and use a fixed path
  }

  console.log('Development environment detected');
  return `http://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}`
}

const getWebsocketUrl = () => {
  if (import.meta.env.PROD) {
    return `ws://${window.location.host}/socket.io`  // Use window.location.host for WebSocket
  }

  return `ws://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/echo`
}

export const WEB_SOCKET_URL = getWebsocketUrl()
export const API_BASE_URL = getBaseUrl()

export const sendYoutubeUrl = async (url, operationType, prompt, sendMessage, userId) => {
  try {
    const apiUrl = `${API_BASE_URL}/api/speecher`
    console.log('API URL:', apiUrl)

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
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczNzEyODEyMywianRpIjoiZGZmMjI4YzctMDU5Ni00ZTNlLWEzMGMtMzc0ZjA3MDM5MzQyIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImJydWNlIiwibmJmIjoxNzM3MTI4MTIzLCJjc3JmIjoiYmE1Y2U2NjMtODkwMi00YzU1LWI3NzgtMzIyYWVlZGEwOTQ2In0.B8_vlOEnpZDnyo-ozUJq_GGK_S7JJ0wngYkslwLQ3Vs`
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
