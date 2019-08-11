import React, { useState } from 'react'
import Board from './board'
import Pieces from './pieces'

const piecesData_mockData = [...Array(14 * 14).keys()].map(k => ({
  user: null, pieceId: k, pieceColor: null
}))
piecesData_mockData[0] = { user: '', pieceId: 0, pieceColor: 'black', }
piecesData_mockData[10] = { user: '', pieceId: 10, pieceColor: 'white', }
piecesData_mockData[20] = { user: '', pieceId: 20, pieceColor: 'black', }


const App = () => {
  const [pieceData, setData] = useState(piecesData_mockData)
  return (
    <div>
      <Board>
        <Pieces pieceData={ pieceData } />
      </Board>
    </div>
  )
}

export default App