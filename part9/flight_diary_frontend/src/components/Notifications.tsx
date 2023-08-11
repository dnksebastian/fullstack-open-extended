interface NotificationsProps {
    errorMessage: string,
    setError: React.Dispatch<React.SetStateAction<string>>
}

const Notifications = (props: NotificationsProps) => {

    const errorMsg = props.errorMessage;
    const displayError = props.setError;

    if (!errorMsg) {
        return <div className="errormsg"></div>
    } else {
        
        setTimeout(() => {
            displayError('');
        }, 5000)
        
        return (
            <div className="errormsg">{errorMsg}</div>
        )
    }

}

export default Notifications