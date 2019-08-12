import openSocket from 'socket.io-client'
import Strapi from 'strapi-sdk-javascript/build/main'

const apiUrl = process.env.API_URL || 'http://localhost:1337'

export const socket = openSocket(apiUrl)
export const strapi = new Strapi(apiUrl)