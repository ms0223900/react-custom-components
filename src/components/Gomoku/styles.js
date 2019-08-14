import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles({
  gameMainPart: {
    maxWidth: 960,
    margin: '20px auto',
    justifyContent: 'space-between',
  },
  matchPart: {
    width: 300,
    padding: 20,
    margin: 'auto',
    textAlign: 'center',
  },
  userHighlight: {
    color: '#0032FF',
    fontWeight: 600,
  }
})