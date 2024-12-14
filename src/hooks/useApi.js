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
