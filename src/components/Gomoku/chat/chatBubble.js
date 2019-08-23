import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import ChatEmote from './chatEmote';

const useStyles = makeStyles({
  root: {
    width: '100%',
    justifyContent: props => props.isMe ? 'flex-end' : 'flex-start'
  },
  chatMes: {
    padding: '6px 12px',
    textAlign: props => props.isMe ? 'right' : 'left',
  },
  chatContent: {
    display: 'inline-block',
    maxWidth: 180,
    height: 'auto',
    padding: '4px 16px',
    backgroundColor: props => props.isMe ? '#c3f8fa' : '#eee',
    color: '#222',
    borderRadius: 20,
    wordWrap: 'break-word',
    textAlign: 'left',
  }
})

const ChatTextContent = ({ classes, isMe, chatContent }) => (
  <Typography 
    className={ classes.chatContent }
    variant={ 'body1' } 
    align={ isMe ? 'right' : 'left' }
  >
    { chatContent  }
  </Typography>
)


const ChatBubbleContainer = ({ username, isMe=false, ...props }) => {
  const classes = useStyles({ isMe })
  const children = React.Children.map(props.children, child => React.cloneElement(child, {
    username, isMe, classes, ...props
  }))
  return (
    <Box display={ 'flex' } className={ classes.root } >
      <Box className={ classes.chatMes }>
        <Typography variant={ 'body1' }>
          { username + ': ' }
        </Typography>
        { children }
      </Box>
    </Box>
  )
}

const getChatContent = (type) => {
  switch (type) {
    case 'text':
      return <ChatTextContent />
    case 'emote':
      return <ChatEmote />
    default:
      return <ChatTextContent />
  }
}

const ChatBubble = (props) => {
  return (
    <ChatBubbleContainer {...props}>
      { getChatContent(props.type) }
    </ChatBubbleContainer>
  )
}

export default ChatBubble
