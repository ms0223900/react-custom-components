import React from 'react'
import { storiesOf } from '@storybook/react'
import '../src/styles/style.scss'
import ChatRoom from '../src/components/Gomoku/chat/chatRoom'
import ChatRoomFromGameFrame from '../src/components/GameFrame/chat/chatRoom'
import { chatData_mockData, userData_mockData } from '../src/components/Gomoku/config'
import Timer from '../src/components/Timer';
import GARAM from '../src/components/GARAM';
import GameFrame from '../src/components/GameFrame';
import ResultContent from '../src/components/GameFrame/resultContent';
import MultiLevels from '../src/components/GameFrame/multiLevels';
import ShopList from '../src/components/GameFrame/shopList';
import { ApolloProviderWrapper } from './API'
import { 
  ShopListWithCxt, 
  NavBarWithCxt,
  ChatRoomWithCxt 
} from '../src/components/GameFrame/componentsWithLogIn';
import ItemList from '../src/components/GameFrame/itemList';
import { HexSnake } from '../src/components/HexaNumberSnake/hexaSnake';

storiesOf('single custom components', module)
  .add('chatRoom from gomoku', () => (
    <ChatRoom
      userData={ userData_mockData }
      userNow={ 'penguin_541' }
      chatData_mock={ chatData_mockData } />
  ))
  .add('chat room with userBuyEmotes', () => (
    <ApolloProviderWrapper>
      <ChatRoomWithCxt
        userData={ userData_mockData }
        userNow={ 'penguin_541' }
        chatData_mock={ chatData_mockData } />
    </ApolloProviderWrapper>
  ))
  .add('timer', () => (
    <Timer />
  ))
  .add('GARAM', () => (
    <GARAM />
  ))
  .add('Game Frame', () => (
    <GameFrame />
  ))
  .add('GARAM with Game Frame', () => (
    <GameFrame GameComponent={ GARAM } PopupComponent={ ResultContent } />
  ))
  .add('Game Frame (multi levels)', () => (
    <MultiLevels />
  ))
  .add('shop list', () => (
    <ApolloProviderWrapper>
      <ShopList />
    </ApolloProviderWrapper>
  ))
  .add('item list', () => (
    <ApolloProviderWrapper>
      <ItemList />
    </ApolloProviderWrapper>
  ))
  .add('ShopListWithCxt', () => (
    <ApolloProviderWrapper>
      <ShopListWithCxt /> 
    </ApolloProviderWrapper>
  ))
  .add('Nav bar', () => (
    <ApolloProviderWrapper>
      <NavBarWithCxt /> 
    </ApolloProviderWrapper>
  ))
  .add('hexagon', () => (
    <HexSnake />
  ))
  