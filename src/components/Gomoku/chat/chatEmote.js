import React from 'react'
import { Box, makeStyles } from '@material-ui/core';
import littleKuma from '../../../images/sticker-littleKuma.png'

const useStyles = makeStyles({
  img: {
    height: 100,
    width: 'auto',
  }
})

const ChatEmote = ({ chatContent=littleKuma }) => {
  const classes = useStyles()
  return (
    <Box>
      <img
        className={ classes.img } 
        src={ chatContent } 
        alt={ 'emote' } />
    </Box>
  )
}

export default ChatEmote