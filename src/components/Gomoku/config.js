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
    "username": "penguin_541",
    "chatContent": "hi!"
  },
  {
    "id": 1,
    "username": "sloth_3511",
    "chatContent": "good morning!"
  },
  {
    "id": 2,
    "username": "penguin_541",
    "chatContent": "hi!"
  },
  {
    "id": 3,
    "username": "sloth_3511",
    "chatContent": "good morning!"
  },
  {
    "id": 4,
    "username": "penguin_541",
    "chatContent": "hi!"
  },
  {
    "id": 5,
    "username": "sloth_3511",
    "chatContent": "good morning!"
  },
]