import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Box } from '@material-ui/core'
import ChatBubble from './chatBubble'
import ChatInput from './chatInput'
import { getChatByRoomId, socket } from '../API'
import { makeStyles } from '@material-ui/styles';
import { scrollToBottom } from '../fn';

const useStyles = makeStyles({
  root: {
    width: 260,
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#eee',
  }, 
  chatArea: {
    height: 400,
    borderRadius: 6,
    backgroundColor: '#fff',
    overflowY: 'auto',
  }
})


const getChatData = async (userData) => {
  if(userData) {
    const { roomId } = userData[0]
    return getChatByRoomId(roomId)
  }
  return []
}

const ChatRoom = ({ userData, userNow, chatData_mock=[], ...props }) => {
  const roomRef = useRef(null)
  const classes = useStyles()
  const [chatData, setChatData] = useState(chatData_mock)
  const [latestChat, setLatestChat] = useState(null)
  useEffect(() => {
    async function getData(){
      const data = await getChatData(userData)
      userData && setChatData(data)
    }
    chatData.length === 0 && getData()
  }, [userData])
  const setRef = el => {
    roomRef.current = el
    console.log(roomRef.current)
  }
  
  const handleSetLocalLatestChat = useCallback(val => {
    const latestChat = {
      id: chatData.length,
      username: userNow,
      chatContent: val
    }
    setChatData([
      ...chatData,
      latestChat
    ])
  }, [userNow, chatData])
  //
  useEffect(() => {
    scrollToBottom(roomRef.current)
    //register socket
    socket.on('get_chat', res => {
      console.log(res, 'socket get chat')
      setLatestChat(res)
    })
  }, [])
  useEffect(() => {
    scrollToBottom(roomRef.current)
  }, [chatData])
  useEffect(() => {
    if(latestChat) {
      const newChat = [
        ...chatData,
        latestChat
      ]
      setChatData(newChat)
      setLatestChat(null)
    }
  }, [latestChat])
  // const chatData = getChatData(userData)
  console.log(chatData)
  return (
    <Box className={ classes.root }>
      <Box className={ classes.chatArea }>
        <div ref={ setRef } >
          {chatData ? (
            chatData.map(data => {
              const { id, username, chatContent } = data
              return (
                <ChatBubble 
                  key={ id }
                  username={ username }
                  chatContent={ chatContent }
                  isMe={ userNow === username } 
                />
              )
            })
          ) : (
            'loading...'
          )}
        </div>
      </Box>
      <ChatInput 
        username={ userNow }
        setLatestChat={ handleSetLocalLatestChat }
        roomId={ userData && userData[0].roomId } />
      {props.children}
    </Box>
  )
}
export default ChatRoom