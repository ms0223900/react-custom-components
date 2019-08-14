/* eslint-disable quotes */
export const cellSize = 35

export const piecesData_mockData = [...Array(14 * 14).keys()].map(k => ({
  user: null, pieceId: k, pieceColor: null
}))
// piecesData_mockData[0] = { user: '', pieceId: 0, pieceColor: 'black', }
// piecesData_mockData[10] = { user: '', pieceId: 10, pieceColor: 'white', }
// piecesData_mockData[20] = { user: '', pieceId: 20, pieceColor: 'black', }

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
  }
]