import React, { useState } from 'react'

export const userInfo_init = {
  id: 0,
  username: '',
  point: 0,
  rank: 0,
  isLoggedIn: false,
}

export const ContextValue = () => {
  const [userInfo, setUserInfo] = useState(userInfo_init)

  return {
    userInfo,
    setUserInfo,
  }
}

export default React.createContext({
  userInfo: userInfo_init,
})


