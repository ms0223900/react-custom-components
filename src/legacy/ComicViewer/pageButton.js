import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = ({ pageNow }) => makeStyles({
  pageButton: {
    display: 'inline-block',
    backgroundColor: pageNow ? '#a00' : '#ddd',
    color: pageNow ? '#fff' : '#111',
    minWidth: 20,
    height: 20,
    padding: '3px',
    margin: 3,
    textAlign: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    '&:hover': {
      backgroundColor: '#a00',
      color: '#fff',
    },
  },
})

export default ({ pageText='', pageNow=false, clickFn }) => {
  const classes = useStyles({ pageNow })()
  // console.log(pageNow)
  const pageTxt = typeof(pageText) === 'number' ? pageText + 1 : pageText
  return (
    <a  className={ classes.pageButton } onClick={ clickFn }>
      { pageTxt }
    </a>
  )
}


//
{/* <div className="keypanel__row">
  <Button type="primary" onButtonPress={this.props.onButtonPress}>C</Button>
  <Button type="primary" onButtonPress={this.props.onButtonPress}>&larr;</Button>
  <Button type="operator" onButtonPress={this.props.onButtonPress}>%</Button>
  <Button type="operator" onButtonPress={this.props.onButtonPress}>/</Button>
</div>
<div className="keypanel__row">
  <Button onButtonPress={this.props.onButtonPress}>7</Button>
  <Button onButtonPress={this.props.onButtonPress}>8</Button>
  <Button onButtonPress={this.props.onButtonPress}>9</Button>
  <Button type="operator" onButtonPress={this.props.onButtonPress}>*</Button>
</div> */}

