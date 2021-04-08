import './App.css';
import React, { useEffect, useState} from 'react';
// import {v4} from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { NavigationBar } from './components/NavigationBar';
import ProgressBar from "./components/LoadingIndicator";
// import { NotificationContext } from './components/AppNotificationComponent';
import ChooseService from "./components/ChooseService";
import ChooseSlot from "./components/ChooseSlot";
import history from './History';
import PaymentContainer from './components/PaymentContainer';
// import { messageService  } from "./components/AppNotificationComponent";

export default function App() {
  const [value, setValue] = useState(0);
  
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

    <div>
      <Router history={history}>
        <NavigationBar />
     
        <p />  
      
        <main role="main" className="container">
            <div className="padding-container">
              <Switch>
                <Route exact path="/" component={ChooseService}/> 
                <Route exact path="/chooseslot/:serviceId/:serviceName" component={ChooseSlot}/> 
                <Route exact path="/makepayment/:slotId/:serviceId/:serviceName" component={PaymentContainer}/>
                <Route path="/" component={ChooseService}/>
              </Switch>
            </div>
        </main>
      </Router>

    </div>

  // <React.Fragment>
  //   <Router>
  //     <NavigationBar />
  //   </Router>
  //   {/* <ProgressBar value={value} max={100}/>   */}
    
  //   <div className="card-deck"> 
  //     <div className="col-sm-3">    
  //       <ChooseService/>
  //     </div>
  //   </div>

  //   <div className="App">
  //     <header className="App-header">       
  //       <p>
          
  //       </p>       
  //     </header>
  //   </div>
    
  // </React.Fragment>  
  
  );
}


