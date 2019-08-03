import diamond from '../../images/poker-diamond.png'
import heart from '../../images/poker-heart.png'
import club from '../../images/poker-club.png'
import spade from '../../images/poker-spade.png'
import _ from 'lodash'


export const patternInfos = {
  diamond: {
    color: 'red',
    imgSrc: diamond,
  },
  spade: {
    color: 'black',
    imgSrc: spade
  },
  heart: {
    color: 'red',
    imgSrc: heart
  },
  club: {
    color: 'black',
    imgSrc: club
  }
}

const getCards = (pattern='', color, index) => [...Array(13).keys()].map(a => (
  { id: a + 13 * index, pattern, color, number: a + 1 }
))

const pokerCards = [
  ...getCards('spade', 'black', 0),
  ...getCards('heart', 'red', 1),
  ...getCards('club', 'black', 2),
  ...getCards('diamond', 'red', 3),
]

export const getRandomPokerCards = () => _.shuffle(pokerCards)


export const getRandomSplitCards = () => {
  const res = []
  const cards = getRandomPokerCards()
  for (let i = 0; i < 7; i++) {
    if(i < 4) { //from ! ~ 4 line
      res[i] = cards.slice(i * 7, (i + 1) * 7)
    } else {
      res[i] = cards.slice(i * 6, (i + 1) * 6)
    }
  }
  return res
}