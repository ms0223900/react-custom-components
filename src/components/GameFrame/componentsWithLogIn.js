import React, { useContext } from 'react'
import ShopList from './shopList'
import ContextStore, { ContextValue, ContextWrapper } from './context';
import { Button } from '@material-ui/core';
import { logInAndSetInfo } from './API'
import ItemList from './itemList';
import NavBar from './loginSignIn/navBar';
import ChatRoom from './chat/chatRoom'

const ComponentWithLoginSwitch = ({ Component, ...props }) => {
  const { userInfo, setUserInfo } = useContext(ContextStore)
  const handleAAALogin = () => {
    logInAndSetInfo('aaa', 'aaaaaaaa', null, setUserInfo)
  }
  const handleAA124Login = () => {
    logInAndSetInfo('aa124', 'aaa', null, setUserInfo)
  }
  // const children = React.Children.map(props.children, child => React.cloneElement(child, {
  //   userInfo, setUserInfo, ...props
  // }))
  // console.log(children)
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
      {/* { children } */}
      <Component {...{
        ...props,
        userInfo,
        setUserInfo
      }} />
    </>
    
  )
}


const ShopListWithLogin = (props) => {
  return (
    <ComponentWithLoginSwitch {...props} Component={ props => (
      <>
        <ShopList {...props}/>
        <ItemList {...props}/>
      </>
    ) } />
  )
}


export const ShopListWithCxt = () => {
  return (
    <ContextWrapper>
      <ShopListWithLogin />
    </ContextWrapper>
  )
}

export const NavBarWithCxt = () => {
  return (
    <ContextWrapper>
      <NavBar />
    </ContextWrapper>
  )
}

export const ChatRoomWithCxt = (props) => {
  return (
    <ContextWrapper>
      <ComponentWithLoginSwitch {...props} Component={ ChatRoom } />
    </ContextWrapper>
  )
}