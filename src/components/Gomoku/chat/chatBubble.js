import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';

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
    backgroundColor: '#33aaaa',
    color: '#fff',
    borderRadius: 20,
    wordWrap: 'break-word',
    textAlign: 'left',
  }
})

const ChatBubble = ({ username, chatContent, isMe=false }) => {
  const classes = useStyles({ isMe })
  return (
    <Box display={ 'flex' } className={ classes.root } >
      <Box className={ classes.chatMes }>
        <Typography variant={ 'body1' }>
          { username + ': ' }
        </Typography>
        <Typography 
          className={ classes.chatContent }
          variant={ 'body1' } 
          align={ isMe ? 'right' : 'left' }
        >
          { chatContent  }
        </Typography>
      </Box>
    </Box>
  )
}
export default ChatBubble