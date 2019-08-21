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
  const username = localStorage.getItem('username')
  return strapi.createEntry('gomokus', {
    user1: username ? username : users[0],
    user2: users[1],
  })
  .then(res => {
    console.log(res)
    return res
  })
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
export const getSpecificGomokuRoom = (id) => (
  strapi
    .getEntry('gomokus', id)
    .then(res => {
      console.log(id, res)
      return res
    })
)
export const updateGomokuRoomState = (id, user1_isReady=false, user2_isReady=false, roomIsFull=false, user1, user2) => (
  id && strapi.updateEntry('gomokus', id, {
    user1,
    user2,
    user1_isReady,
    user2_isReady,
    roomIsFull,
  })
)
export const updateChat = async (id, username, chatContent) => {  
  return strapi
    .createEntry('chats', {
      roomId: id,
      username,
      chatContent
    })
    .then(res => {
      socket.emit('send_chat', [id, res])
    })
}
export const getChatByRoomId = async (roomId) => {
  const originData = await strapi.getEntries('chats', res => res)
  return originData.filter(data => data.roomId === roomId)
}

export const handleAddInRoomAndSetReady = async (setUserNowFn, setUserDataFn, setGameStartFn) => {
  const username = localStorage.getItem('username')
  const setFirstPlayerAndTimeoutExit = (id, user1, user2) => {
    updateGomokuRoomState(id, true, false, false, user1, user2)
      .then(res => {
        console.log(user1, res)
        setUserNowFn(user1)
      })
  }
  //
  const rooms = await getGomokuRooms()
  const emptyRoom = rooms.find(room => !room.roomIsFull)
  if(emptyRoom) {
    const { id, user1, user2 } = emptyRoom
    socket.emit('join', id)
    //set your user
    setUserDataFn([
      { username: null, color: 'black', roomId: id },
      { username: null, color: 'white', roomId: id },
    ])
    if(!emptyRoom.user1_isReady) { //set user to user1
      const user = username ? username : user1
      setFirstPlayerAndTimeoutExit(id, user, user2)
      // setUserDataFn([
      //   { username: user, color: 'black', roomId: id },
      //   { username: user2, color: 'white', roomId: id },
      // ])
    } else {
      //set user to user2 and start game
      const user = username ? username : user2
      updateGomokuRoomState(id, true, true, true, user1, user) 
        .then(res => {
          console.log(user, res)
          setUserNowFn(user)
          setGameStartFn()
        })
      // setUserDataFn([
      //   { username: user1, color: 'black', roomId: id },
      //   { username: user, color: 'white', roomId: id },
      // ])
      // //user1 need update user2 username if user2 is logged in
      // socket.emit('update_user2Data', { username: user, color: 'white', roomId: id })
    }
  } else {
    //create a room 
    createGomokuRoom()
      .then(res => {
        //user1 is created or form localstorage
        const { id, user1, user2 } = res
        socket.emit('join', id)
        setUserDataFn([
          { username: user1, color: 'black', roomId: id },
          { username: user2, color: 'white', roomId: id },
        ])
        setFirstPlayerAndTimeoutExit(id, user1)
      })
  }
}

const setToLS = (id, username, point, rank) => {
  localStorage.setItem('userDBid', id)
  localStorage.setItem('username', username)
  localStorage.setItem('point', point)
  localStorage.setItem('rank', rank)
}

export const singUp = (username, email, pwd, setErr) => (
  strapi
    .register(username, email, pwd)
    .then(res => {
      console.log(res)
      // localStorage.setItem('username', username)
      const { id, username, point, rank } = res.user
      setToLS(id, username, point, rank)
      // window.history.back()
      location.reload()
    })
    .catch(e => {
      setErr(e.message)
    })
)
export const logIn = (username, pwd, setErr) => (
  strapi
    .login(username, pwd)
    .then(res => {
      console.log(res)
      const { id, username, point, rank } = res.user
      setToLS(id, username, point, rank)
      location.reload()
    })
    .catch(e => {
      setErr(e.message)
    }) 
)
export const updateUser = (id, point, rank) => (
  strapi
    .updateEntry('users', id, {
      point,
      rank,
    })
    .then(res => {
      console.log('latest point and rank: ', res)
      // window.alert('update point successful')
      return res
    })
)