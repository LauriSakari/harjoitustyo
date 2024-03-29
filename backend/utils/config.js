require('dotenv').config()

let PORT = process.env.PORT
let MODE = process.env.NODE_ENV
let MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.MONGODB_TEST_URI
  : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT,
  MODE
}