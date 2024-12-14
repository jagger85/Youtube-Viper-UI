import { useState } from 'react'

const useStorage = () => {
  const [userId, setUserId] = useState(() => localStorage.getItem('userId'))
  const [bearerToken, setBearerToken] = useState(() =>
    localStorage.getItem('bearerToken')
  )

  const saveUserId = (id) => {
    localStorage.setItem('userId', id)
    setUserId(id)
  }

  const saveBearerToken = (token) => {
    localStorage.setItem('bearerToken', token)
    setBearerToken(token)
  }

  const retrieveUserId = () => {
    return localStorage.getItem('userId')
  }

  const retrieveBearerToken = () => {
    return localStorage.getItem('bearerToken')
  }

  return {
    userId,
    bearerToken,
    saveUserId,
    saveBearerToken,
    retrieveUserId,
    retrieveBearerToken,
  }
}

export default useStorage
