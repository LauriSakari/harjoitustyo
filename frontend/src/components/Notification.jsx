/* eslint-disable indent */
const Notification = ({ notification }) => {

    if (notification.message === null) {
      return null
    }
    if (notification.type === 'error') {
    return (
      <div className="error">
        {notification.message}
      </div>
      )}
      return (
      <div className="success">
        {notification.message}
      </div>
      )
  }

  export default Notification