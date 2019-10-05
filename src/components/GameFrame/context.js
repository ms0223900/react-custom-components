import React, { useState, useReducer } from 'react'
import { statsInfo_init } from './gameStats/config'
import { statsInfo_reducer, shopList_reducer } from './actionsAndReducers/reducers'
import { shopList_init } from './config'

export const userInfo_init = {
  id: 0,
  username: '',
  point: 10099,
  rank: 0,
  isLoggedIn: false,
}

export const ContextValue = (customCtx={}) => {
  const ctx = {
    userInfo_custom: userInfo_init,
    statsInfo_custom: statsInfo_init,
    shopList_custom: shopList_init,
    ...customCtx
  }
  const { userInfo_custom, statsInfo_custom, shopList_custom } = ctx
  const [userInfo, setUserInfo] = useState(userInfo_custom)
  const [statsInfo, dispatchStatsInfo] = useReducer(statsInfo_reducer, statsInfo_custom)
  const [shopList, dispatchShopList] = useReducer(shopList_reducer, shopList_custom)
  const dispatch = (params) => [
    dispatchStatsInfo,
    dispatchShopList,
  ].forEach(fn => fn(params))
  //
  return {
    userInfo,
    setUserInfo,
    statsInfo, 
    shopList,
    dispatch
  }
}

export const ContextStore = React.createContext({
  userInfo: userInfo_init,
  statsInfo: statsInfo_init,
  shopList: shopList_init,
  setUserInfo: () => {},
  dispatch: () => {},
})

export const ContextWrapper = ({ customCtx, ...props }) => {
  const value = ContextValue(customCtx)
  return (
    <ContextStore.Provider value={ value }>
      {props.children}
    </ContextStore.Provider>
  )
}

export default ContextStore


