const notificationStyles = {
    maxWidth: 'max-content',
    padding: 10,
    border: '1px solid red',
    borderRadius: 10,
    color: 'red'
}


const Notification = ({message}) => {

    if(!message) {
        return null
    }

    return (
        <div style={notificationStyles}>
            <p>{message}</p>
        </div>
    )
}

export default Notification