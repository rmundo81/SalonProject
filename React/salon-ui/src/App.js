import './App.css';
import React, { useEffect, useState} from 'react';
// import {v4} from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from "react-router-dom";
import { NavigationBar } from './components/NavigationBar';
import ProgressBar from "./components/LoadingIndicator";
// import { NotificationContext } from './components/AppNotificationComponent';
import ChooseService from "./components/ChooseService";
// import { messageService  } from "./components/AppNotificationComponent";

export default function App() {
  const [value, setValue] = useState(0);
  // const dispatch = useContext(NotificationContext);

 

  /* const handleNewSuccessNotification = () => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: v4(),
        type: "SUCCESS",
        message: "Salon Service Loaded Successfuly"
      }
    })
  }

  const handleNewErrorNotification = () => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: v4(),
        type: "ERROR",
        message: "An Unexpected Error Occured !"
      }
    })
  } */

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((oldValue) => {
        const newValue = oldValue + 10;

        if (newValue >= 100) {
          clearInterval(interval);
        }
        return newValue;

      })
    }, 1000);
  }, []);

  return (
  <React.Fragment>
    <Router>
      <NavigationBar />
    </Router>
    {/* <ProgressBar value={value} max={100}/>   */}
    
    <div className="card-deck"> 
      <div className="col-sm-3">    
        <ChooseService/>
      </div>
    </div>

    <div className="App">
      <header className="App-header">       
        <p>
          
        </p>       
      </header>
    </div>
    
  </React.Fragment>  
  );
}


