import React, { useState, useReducer } from 'react'
import { statsInfo_init } from './gameStats/config'
import { statsInfo_reducer } from './actionsAndReducers/reducers'

export const userInfo_init = {
  id: 0,
  username: '',
  point: 0,
  rank: 0,
  isLoggedIn: false,
}

export const ContextValue = () => {
  const [userInfo, setUserInfo] = useState(userInfo_init)
  const [statsInfo, dispatchStatsInfo] = useReducer(statsInfo_reducer, statsInfo_init)
  const dispatch = (params) => [
    dispatchStatsInfo
  ].forEach(fn => fn(params))
  //
  return {
    userInfo,
    setUserInfo,
    statsInfo, 
    dispatch
  }
}

const ContextStore = React.createContext({
  userInfo: userInfo_init,
  statsInfo: statsInfo_init,
})

export const ContextWrapper = props => {
  const value = ContextValue()
  return (
    <ContextStore.Provider value={ value }>
      {props.children}
    </ContextStore.Provider>
  )
}

export default ContextStore


