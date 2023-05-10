const info = (...params) => {
  console.log('info toimii')
  console.log(...params)
}
  
const error = (...params) => {
  console.log('error toimii')
  console.error(...params)
}

module.exports = {
  info, error
}