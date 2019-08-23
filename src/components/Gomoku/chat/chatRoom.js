import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Box } from '@material-ui/core'
import ChatBubble from './chatBubble'
import ChatInput from './chatInput'
import { getChatByRoomId, socket } from '../API'
import { makeStyles } from '@material-ui/styles';
import { scrollToBottom } from '../fn';
import EmotePopup from './emotePopup';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    top: 60,
    right: 0,
    bottom: 0,
    width: 260,
    padding: 6,
    margin: 'auto',
    borderRadius: 6,
    backgroundColor: '#eee',
  }, 
  chatContainer: {
    flexDirection: 'column',
    height: '100%'
  },
  chatArea: {
    height: 1000,
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
  const [emoteDisplay, setEmoteDisplay] = useState(false)
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
  
  const handleSetLocalLatestChat = useCallback((val, type='text') => {
    const latestChat = {
      id: chatData.length,
      username: userNow,
      type,
      chatContent: val
    }
    setChatData([
      ...chatData,
      latestChat
    ])
    setEmoteDisplay(false)
  }, [userNow, chatData, userData])
  //
  useEffect(() => {
    // scrollToBottom(roomRef.current)
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
      
      <Box display={ 'flex' } className={ classes.chatContainer }>
        <Box className={ classes.chatArea }>
          <div ref={ setRef } >
            {chatData ? (
              chatData.map(data => {
                const { id, username } = data
                return (
                  <ChatBubble 
                    key={ id }
                    isMe={ userNow === username } 
                    { ...data }
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
          roomId={ userData && userData[0].roomId }
          setLatestChat={ handleSetLocalLatestChat }
          roomId={ userData && userData[0].roomId }
          openEmoteFn={() => setEmoteDisplay(!emoteDisplay)}
        >
          <EmotePopup 
            username={ userNow }
            roomId={ userData && userData[0].roomId }
            emoteDisplay={ emoteDisplay }
            setLatestEmoteChat={ handleSetLocalLatestChat }
            closeFn={() => setEmoteDisplay(false)} />
        </ChatInput>
      </Box>
      {props.children}
    </Box>
  )
}
export default ChatRoom