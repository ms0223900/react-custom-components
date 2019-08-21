import React, { useState } from 'react'

export const initUserInfo = {
  point: JSON.parse(localStorage.getItem('point')),
  rank: JSON.parse(localStorage.getItem('rank')),
}

export const ContextValue = () => {
  const [userInfo, setUserInfo] = useState(initUserInfo)

  return {
    userInfo,
    setUserInfo,
  }
}

export default React.createContext({
  userInfo: initUserInfo,
})