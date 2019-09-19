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

const absolutePos = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  margin: 'auto',
}

export const useStyles_shopList = makeStyles({
  root: {
    ...absolutePos,
    width: '100%',
    height: '100vh',
    zIndex: 10,
    // width: 400,
    // height: 400,
  }, 
  back: {
    ...absolutePos,
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  shopList: {
    ...absolutePos,
    width: 400 + 20,
    height: 400,
  },
  container: {
    height: 400 - 40,
    overflowY: 'auto',
    fontSize: 0,
    // boxSizing: 'border-box',
    // backgroundColor: '#ddd',
  },
})

export const useStyles_singleShopItem = makeStyles({
  root: {
    display: 'inline-block',
    verticalAlign: 'top',
    width: 400 / 3 - 20,
    height: 200,
    margin: 10,
    padding: 10,
    boxSizing: 'border-box',
    textAlign: 'center',
    '&:hover': {
      backgroundColor: '#eee',
      cursor: 'pointer',
    }
  },
  countNumber: {
    maxWidth: 50,
    backgroundColor: '#777',
    color: '#fff',
    borderRadius: 1000,
  },
  img: {
    width: '100%',
    height: '100%',
  }
})

export const useStyles_confirmBuyPopup = makeStyles({
  root: {
    ...absolutePos,
    width: 200,
    height: 160,
    padding: 6,
    boxSizing: 'border-box',
    '& img': {
      width: 40,
      height: 40,
    }
  }
})
