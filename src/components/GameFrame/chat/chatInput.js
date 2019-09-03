import React, { useCallback } from 'react'
import TagFaces from '@material-ui/icons/TagFaces'
import { TextField, Button, Box, makeStyles } from '@material-ui/core';
import { updateChat } from '../API';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    paddingTop: 6,
  },
  buttonArea: {
    padding: 6,
    textAlign: 'right',
  }
})

const ChatInput = ({ username, setLatestChat, roomId, openEmoteFn, ...props }) => {
  const classes = useStyles()
  const [value, setValue] = React.useState('')
  const handleChange = e => {
    const { value } = e.target
    setValue(value)
  }
  const handleSendByKey = (e) => {
    e.keyCode === 13 && handleSendMes()
  }
  const handleSendMes = useCallback(() => {
    if(value.length > 0) {
      roomId && updateChat(roomId, username, value, 'text')
      setLatestChat(value)
      setValue('')
    }
  }, [username, value, roomId])
  return (
    <Box className={ classes.root }>
      <TextField 
        value={ value } 
        style={{ backgroundColor: '#fff', width: '100%', }}
        placeholder={ 'say something' } 
        variant={ 'outlined' }
        onKeyUp={ handleSendByKey }
        onChange={ handleChange } />
      <Box className={ classes.buttonArea }>
        <Button onClick={ openEmoteFn }>
          <TagFaces />
        </Button>
        <Button 
          disabled={ value.length === 0 }
          variant={ 'contained' } 
          onClick={ handleSendMes }>
          { 'send' }
        </Button>
      </Box>
      { props.children }
    </Box>
  )
}
export default ChatInput