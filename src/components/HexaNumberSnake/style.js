import { makeStyles } from '@material-ui/core'

export const useStyles_singleHexItem = makeStyles({
  root: {
    // backgroundColor: '#ddd',
    position: 'absolute',
    fontSize: 32,
    left: props => props.index === 0 ? 0 : props.position.left,
    top: props => props.index === 0 ? 0 : props.position.top,
  }
})

export const useStyles_hexSnake = makeStyles({
  root: {
    position: 'relative',
    transform: 'translate(300px, 300px)',
    // transformOrigin: '30px 30px',
  }
})