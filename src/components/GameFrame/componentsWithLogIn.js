import React, { useContext } from 'react'
import ShopList from './shopList'
import ContextStore, { ContextValue } from './context';
import { Button } from '@material-ui/core';
import { logInAndSetInfo } from './API'
import ItemList from './itemList';
import NavBar from './loginSignIn/navBar';

const ShopListWithLogin = () => {
  const { userInfo, setUserInfo } = useContext(ContextStore)
  const handleAAALogin = () => {
    logInAndSetInfo('aaa', 'aaaaaaaa', null, setUserInfo)
  }
  const handleAA124Login = () => {
    logInAndSetInfo('aa124', 'aaa', null, setUserInfo)
  }
  return (
    <>
      <Button 
        color={ userInfo.username === 'aaa' ? 'primary' : 'secondary' }
        onClick={ handleAAALogin }>
        {'user: ' + 'aaa' }
      </Button>
      <Button 
        color={ userInfo.username === 'aa124' ? 'primary' : 'secondary' }
        onClick={ handleAA124Login }>
        {'user: ' + 'aa124' }
      </Button>
      <ShopList 
        userInfo={ userInfo } 
        setUserInfo={ setUserInfo } />
      <ItemList 
        userInfo={ userInfo } 
        setUserInfo={ setUserInfo }  />
    </>
    
  )
}

export const ShopListWithCxt = () => {
  const value = ContextValue()
  return (
    <ContextStore.Provider value={ value }>
      <ShopListWithLogin />
    </ContextStore.Provider>
  )
}

export const NavBarWithCxt = () => {
  const value = ContextValue()
  return (
    <ContextStore.Provider value={ value }>
      <NavBar />
    </ContextStore.Provider>
  )
}