import littleKumaImg from '../../images/sticker-littleKuma.png'
import emoteThankYou from '../../images/emote-thank-you.png'
import emoteHiThere from '../../images/emote-hi-there.png'
import emoteRu87 from '../../images/emote-ru-87.png'
import emoteRuRdrrC from '../../images/emote-ru-rdrrC.png'





/* eslint-disable quotes */
export const cellSize = 35
export const singlePlayerUsername = 'Player'
export const pointPerRound_PC = 100
export const pointPerRound_realRival = pointPerRound_PC * 1.5
//from 0 ~ 6
export const ranksPoints = [0, 1000, 3000, 5000, 8000, 12000, 15000]


export const piecesData_mockData = [...Array(14 * 14).keys()].map(k => ({
  user: null, pieceId: k, pieceColor: null
}))
// piecesData_mockData[0] = { user: '', pieceId: 0, pieceColor: 'black', }

export const userData_mockData = [
  { username: 'penguin_541', color: 'black' },
  { username: 'sloth_3511', color: 'white' },
]

export const chatData_mockData = [
  {
    "id": 0,
    "type": "text",
    "username": "penguin_541",
    "chatContent": "hi!"
  },
  {
    "id": 1,
    "type": "text",
    "username": "sloth_3511",
    "chatContent": "good morning!"
  },
  {
    "id": 2,
    "type": "text",
    "username": "penguin_541",
    "chatContent": "hi!"
  },
  {
    "id": 3,
    "type": "text",
    "username": "sloth_3511",
    "chatContent": "good morning!"
  },
  {
    "id": 4,
    "type": "text",
    "username": "penguin_541",
    "chatContent": "hi!"
  },
  {
    "id": 5,
    "type": "emote",
    "username": "sloth_3511",
    "chatContent": littleKumaImg
  },
]

export const emoteData_mockData = [
  {
    "id": 0,
    "emoteName": 'thank-you',
    "imgSrc": emoteThankYou
  },
  {
    "id": 1,
    "emoteName": 'hi-there',
    "imgSrc": emoteHiThere
  },
  {
    "id": 2,
    "emoteName": 'ru-87',
    "imgSrc": emoteRu87
  },
  {
    "id": 3,
    "emoteName": 'ru-rdrrC',
    "imgSrc": emoteRuRdrrC
  },
]