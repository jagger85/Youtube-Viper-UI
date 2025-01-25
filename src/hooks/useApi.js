const getBaseUrl = () => {
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL
  }

  return `http://${import.meta.env.VITE_BACKEND_HOST}:${
    import.meta.env.VITE_BACKEND_PORT
  }/api`
}

const getWebsocketUrl = () => {
  if (import.meta.env.PROD) {
    return import.meta.env.WEB_SOCKET_URL
  }

  return `ws://${import.meta.env.VITE_BACKEND_HOST}:${
    import.meta.env.VITE_BACKEND_PORT
  }/echo`
}

export const WEB_SOCKET_URL = getWebsocketUrl()
export const API_BASE_URL = getBaseUrl()

export const sendYoutubeUrl = async (url, language, prompt, sendMessage, userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/speecher?video_url=${encodeURIComponent(url)}&client_id=${userId}`,{
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
