import React, { useContext,useEffect, useState } from "react";
import { NotificationContext } from "./AppNotificationComponent";
import {v4} from 'uuid';
import ProgressBar from "./LoadingIndicator";



function ChooseService() {   

    const dispatch = useContext(NotificationContext);
    const [value, setValue] = useState(0);
    


    const handleNewSuccessNotification = () => {
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            id: v4(),
            type: "SUCCESS",
            message: "Salon Service Loaded Successfuly"
          }
        })
      }
    
      const handleNewErrorNotification = (errMsg) => {
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            id: v4(),
            type: "ERROR",
            message: "An Unexpected Error Occured : " + errMsg + " !"
          }
        })
      }

    const [salonServicesList, setSalonServicesList] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loadData, setLoadData] = useState(true);    

    useEffect(() => {
        // const options = {
        //     onUpLoadProgress: (progressEvent) => {
        //         const {loaded, total} =  progressEvent;
        //         let percent = Math.floor(loaded * 100 / total);
        //         console.log(` ${loaded}kb of ${total}kb | ${percent}% `);
        //     }
        // };
        const interval = setInterval(() => {
            setValue((oldValue) => {
              const newValue = oldValue + 10;
      
              if (newValue >= 100) {
                clearInterval(interval);
              }
              return newValue;
      
            })
          }, 1000);
        const url = "/api/services/retrieveAvailableSalonServices"; 
        fetch(url, {    
                method:'GET',        
                headers: {  
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                 }            
        })
        .then(async response => {
            const data = await response.json();
            
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            //  console.log("OPTIONS LOG"+options);
            handleNewSuccessNotification();
            console.log(data);
                console.log("Data loading with : ", response.statusText);
            console.log("ID : "+ data[0].id + " name: " +data[0].name);
            setSalonServicesList(data);
            setLoadData(false)
           
            //console.log(" salonServicesList Length == "+data.map( post => {post.name}));
        })
        .catch(error => {
            setErrorMessage(error.toString());
            handleNewErrorNotification(errorMessage);
            //this.setState({errorMessage: error.toString()});
            console.error("An error occured while retrieving the salon services : ", errorMessage);
        });        
        
      }, []);
            return(
            <div>
                {loadData ? <div><ProgressBar value={100} max={100}/></div> : <div></div>}
                {salonServicesList.map(salon => {
                    return (
                            <div className="card" key={salon.id}>                                                   
                                <div className="card-deck text-center">
                                    <div className="card border-dark mb-3" style={{maxWidth: "18rem"}} >
                                        <div className="card-header" > <h5> {salon.name} </h5></div>
                                        <div className="card-body text-dark">
                                            <h1 className="card-title">${salon.price}</h1>
                                            <p className="card-text">{salon.description}</p>
                                            <p className="card-text">{salon.timeInMinutes} Minutes</p>
                                            <a href="#" className="btn btn-outline-primary">Book Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>           
                        )
                })}
            </div>
        );
}

export default ChooseService;