import React from 'react'
import { storiesOf } from '@storybook/react'
import '../src/styles/style.scss'
import ChatRoom from '../src/components/Gomoku/chat/chatRoom'
import { chatData_mockData, userData_mockData } from '../src/components/Gomoku/config'
import Timer from '../src/components/Timer';
import GARAM from '../src/components/GARAM';

storiesOf('single custom components', module)
  .add('chatRoom', () => (
    <ChatRoom
      userData={ userData_mockData }
      userNow={ 'penguin_541' }
      chatData_mock={ chatData_mockData } />
  ))
  .add('timer', () => (
    <Timer />
  ))
  .add('GARAM', () => (
    <GARAM />
  ))