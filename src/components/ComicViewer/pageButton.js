import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = ({ pageNow }) => makeStyles({
  pageButton: {
    display: 'inline-block',
    backgroundColor: pageNow ? '#a00' : '#ddd',
    color: pageNow ? '#fff' : '#111',
    width: 20,
    height: 20,
    padding: '3px',
    margin: 3,
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#a00',
      color: '#fff',
    },
  },
})

export default ({ pageText, pageNow, clickFn }) => {
  const classes = useStyles({ pageNow })()
  console.log(pageNow)
  return (
    <a  className={ classes.pageButton } onClick={ clickFn }>
      { pageText + 1 }
    </a>
  )
}