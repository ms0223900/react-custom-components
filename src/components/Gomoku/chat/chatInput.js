import React, { useCallback } from 'react'
import { TextField, Button, Box } from '@material-ui/core';
import { updateChat } from '../API';


const ChatInput = ({ username, handleSend=updateChat, roomId }) => {
  const [value, setValue] = React.useState('')
  const handleChange = e => {
    const { value } = e.target
    setValue(value)
  }
  const handleSendByKey = (e) => {
    e.keyCode === 13 && handleSendMes()
  }
  const handleSendMes = useCallback(() => {
    if(handleSend) {
      value.length > 0 && handleSend(roomId, username, value)
      setValue('')
    }
  }, [username, value, roomId])
  return (
    <Box style={{ padding: 10 }}>
      <TextField 
        value={ value } 
        placeholder={ 'say something' } 
        onKeyUp={ handleSendByKey }
        onChange={ handleChange } />
      <Button 
        disabled={ value.length === 0 }
        variant={ 'contained' } 
        onClick={ handleSendMes }>
        { 'send' }
      </Button>
    </Box>
  )
}
export default ChatInput