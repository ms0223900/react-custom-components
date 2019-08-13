import openSocket from 'socket.io-client'
import Strapi from 'strapi-sdk-javascript/build/main'
import { getRandomUser } from './fn'

const apiUrl = 
  process.env.NODE_ENV === 'production' ? 
  'https://intense-brushlands-46000.herokuapp.com' : 
  process.env.STORYBOOK_API || 'http://localhost:1337' 

export const socket = openSocket(apiUrl)
export const strapi = new Strapi(apiUrl)

export const createGomokuRoom = () => {
  const users = getRandomUser()
  strapi.createEntry('gomokus', {
    user1: users[0],
    user2: users[1],
  })
  .then(res => console.log(res))
  .catch(err => console.log(err))
}
export const getGomokuRooms = () => (
  strapi
    .getEntries('gomokus')
    .then(res => {
      console.log(res)
      return res
    })
)
export const updateGomokuRoomState = (id, user1_isReady=false, user2_isReady=false, roomIsFull=false) => (
  strapi.updateEntry('gomokus', id, {
    user1_isReady,
    user2_isReady,
    roomIsFull,
  })
)

export const handleAddInRoomAndSetReady = async (setUserNowFn, setUserDataFn, setGameStartFn) => {
  const rooms = await getGomokuRooms()
  const emptyRoom = rooms.find(room => !room.roomIsFull)
  if(emptyRoom) {
    const { id, user1, user2 } = emptyRoom
    setUserDataFn([
      { username: user1, color: 'black' },
      { username: user2, color: 'white' },
    ])
    //set your user
    if(!emptyRoom.user1_isReady) { //set user to user1
      updateGomokuRoomState(id, true, false, false)
        .then(res => {
          console.log(user1, res)
          setUserNowFn(user1)
        })
    } else {
      //set user to user2 and start game
      updateGomokuRoomState(id, true, true, true) 
        .then(res => {
          console.log(user2, res)
          setUserNowFn(user2)
          setGameStartFn()
        })
    }
  } else {
    //create a room 
  }
}