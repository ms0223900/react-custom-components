import openSocket from 'socket.io-client'
import Strapi from 'strapi-sdk-javascript/build/main'

const apiUrl = 
  process.env.NODE_ENV === 'production' ? 
  'https://intense-brushlands-46000.herokuapp.com' : 
  process.env.STORYBOOK_API || 'http://localhost:1337' 

export const socket = openSocket(apiUrl)
export const strapi = new Strapi(apiUrl)