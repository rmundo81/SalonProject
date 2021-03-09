import React, { useState } from 'react';

const NotificationBox = (props) => {
    const [exit, setExit] = useState(false);

    const handleCloseNotificationBox = () => {
        setExit(true);
        setTimeout( () => {
            props.dispatch({
                type: "REMOVE_NOTIFICATION",
                id: props.id
            })
        }, 2000);
    }

    React.useEffect( ()=> {
        handleCloseNotificationBox();
    })

    return(
        <div className={`notification-item ${props.type === "SUCCESS" ? "success": "error"}`}>
            <p>{props.message}</p>
            <div className={"bar"} />
        </div>
    )
};

export default NotificationBox;