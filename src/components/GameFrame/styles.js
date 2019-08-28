import { makeStyles } from '@material-ui/core'

export const useStyles_gameFrame = makeStyles({
  root: {
    position: 'relative',
  }
})

export const useStyles_gameResultPopup = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  popup: {
    margin: 'auto',
    padding: 6,
    boxSizing: 'border-box',
    width: props => props.maxWidth,
    // maxHeight: 200,
  },
  closeBtn: {
    textAlign: 'right',
    '& span': {
      cursor: 'pointer',
    }
  }
})
