 import React, { createContext, useReducer } from 'react';
 // import {v4} from 'uuid';
import NotificationBox from './NotificationBox';

export const NotificationContext = createContext();

const AppNotificationComponent = (props) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "ADD_NOTIFICATION" :
                return [...state, {...action.payload}];
            case "REMOVE_NOTIFICATION" :
                return state.filter( el => el.id !== action.id);

            default : 
                return state
        }
    }, 
     [/*
        {
            id: v4(),
            type: "SUCCESS",
            message: "Salon Service Loaded Successfuly"
        } ,
        {
            id: v4(),
            type: "ERROR",
            message: "An Unexpected Error Occured !"
        } */
    ]);

     /* dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
            id: v4(),
            type: "SUCCESS",
            message: "Salon Service Loaded Successfuly"
        }
    }) */ 
   

    return(
        <NotificationContext.Provider value={dispatch}>
            <div className={"notification-wrapper"}>
                {state.map( note => {
                    return <NotificationBox dispatch={dispatch} key={note.id} {...note}/>
                })}
            </div>
            {props.children}
        </NotificationContext.Provider>
    );
}; 

export default AppNotificationComponent;








