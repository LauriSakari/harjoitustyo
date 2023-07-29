const timeoutNotification = ({ message, type }, setNotification) => {
  console.log(message, type, setNotification)
  setNotification({ message: message, type: type })
  setTimeout(() => {
    setNotification({ message: null })
  }, 4000)
}

export default timeoutNotification