import { piece8Directions, checkWhoWin } from './fn'

export const aiRival = (pieceData, user='', userPieceColor) => {
  //check if lose condition
  let loseOrWinRes = []
  const userPieces = pieceData.filter(data => data.user === user)
  const userPieceIds = userPieces.map(piece => piece.pieceId)
  const pcPieceIds = pieceData.filter(data => data.user === 'PC').map(piece => piece.pieceId)
  // console.log(pcPieceIds)

  const newPieceData = (id, originData=pieceData) => {
    let data = [...originData]
    data[id] = { 
      ...data[id], user, pieceColor: userPieceColor, 
    }
    return data
  }

  const checkNewPieceDataWhoWin = (moveId, moveId2) => {
    let data = newPieceData(moveId)
    if(moveId2) {
      data = newPieceData(moveId2, data)
    }
    if(checkWhoWin(data, user)) {
      return moveId 
    }
  }

  const userPossibleMoves = getPieceDirectionMoves(userPieceIds, pcPieceIds)
  // console.log(userPossibleMoves)
  //rival win with one piece
  for (let i = 0; i < userPossibleMoves.length; i++) {
    const moveId_first = userPossibleMoves[i];
    const checkRes_first = checkNewPieceDataWhoWin(moveId_first)
    // user will win, and AI set this piece to not lose
    if(checkRes_first) {
      loseOrWinRes = [...loseOrWinRes, checkRes_first]
    }
  }

  //rival win with two pieces
  for (let i = 0; i < userPossibleMoves.length; i++) {
    const moveId_first = userPossibleMoves[i];
    const secondIds = [...userPieceIds, moveId_first]
    const userPossibleMoves_second = getPieceDirectionMoves(secondIds, pcPieceIds)
    // console.log(moveId_first, secondIds, userPossibleMoves_second)
    for (let j = 0; j < userPossibleMoves_second.length; j++) {
      const moveId_second = userPossibleMoves_second[j];
      const checkRes_second = checkNewPieceDataWhoWin(moveId_first, moveId_second)
      if(checkRes_second) {
        loseOrWinRes = [...loseOrWinRes, checkRes_second]
      }
    }
  }

  //check if win condition
  const PCpossibleMoves = getPieceDirectionMoves(pcPieceIds, userPieceIds)
  for (let i = 0; i < PCpossibleMoves.length; i++) {
    const moveId = PCpossibleMoves[i];
    const checkRes = checkNewPieceDataWhoWin(moveId)
    if(checkRes) {
      loseOrWinRes = [...loseOrWinRes, checkRes]
    }
  }

  //check lose or win results
  if(loseOrWinRes.length > 0) {
    console.log(loseOrWinRes)
    return getMaxAmountElementFromArr(loseOrWinRes)
  } else {
    //random get piece id with userPossibleMoves
    const moveIndex = ~~(Math.random() * userPossibleMoves.length)
    return userPossibleMoves[moveIndex]
  }

}

const getPieceDirectionMoves = (ids, rivalIds, eightDirs=piece8Directions) => {
  let res = []
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i]
    const eightDirIds = eightDirs.map(dir => dir + id)
    res = [...res, ...eightDirIds]
  }
  //need filter pc origin ids && filter ids which is set
  res = res.filter(r => rivalIds.indexOf(r) === -1 && r >= 0 && ids.indexOf(r) === -1)
  return [...new Set(res)]
}

const getMaxAmountElementFromArr = (arr) => {
  const uniqueArr = [...new Set(arr)]
  let countedRes = []
  for (let i = 0; i < uniqueArr.length; i++) {
    const el = uniqueArr[i]
    const count = arr.filter(a => a === el).length
    countedRes = [...countedRes, {
      count,
      el
    }]
  }
  const maxCount = Math.max(...countedRes.map(res => res.count))
  const maxCountEls = countedRes.filter(res => res.count === maxCount)
  if(maxCountEls.length === 1) {
    return maxCountEls[0].el
  } else {
    const randomIndex = ~~(Math.random() * maxCountEls.length)
    return maxCountEls[randomIndex].el
  }
}