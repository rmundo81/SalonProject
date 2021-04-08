import React, { useContext,useEffect, useState, Fragment } from "react";
// import Breadcrump from "react-bootstrap/Breadcrumb";
// import axios from "axios";
import { NotificationContext } from "./AppNotificationComponent";
import {v4} from 'uuid';
import ProgressBar from "./LoadingIndicator";
import { useHistory } from "react-router-dom";



function ChooseService() {   

  

    const dispatch = useContext(NotificationContext);
    const [value, setValue] = useState(0);
    let history = useHistory();
    // const salonApi = axios.create({
    //     baseURL:"http://localhost:8080/api/services/retrieveAvailableSalonServices"
    // })
    


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
    // const [percentage, setPercentage] = useState(0); 


    // const options = {
    //         onUpLoadProgress: (progressEvent) => {
    //             const {loaded, total} =  progressEvent;
    //             let percent = Math.floor(loaded * 100 / total);
    //             console.log("IWASHERE");
    //             console.log(` ${loaded}kb of ${total}kb | ${percent}% `);
    //         }
    //     };

    // const salonGetApi = async () => {
    //    await axios.get("http://localhost:8080/api/services/retrieveAvailableSalonServices",options,{
    //         headers: {  
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //            } 
    //     }).then((response)=>{
    //         // console.log(options);
    //         console.log(response.data)
    //     })
    // }

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


        // axios.get(salonApi).then(res => {
        //     console.log(" AXIOS GET = ")
        //     console.log(res)
        // })

        
        // salonGetApi();



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
            console.log("url ChooseService.JS");
            console.log(url);
            
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            //  console.log("OPTIONS LOG"+options);
            handleNewSuccessNotification();
            // console.log(" Data From Fetch");
            // console.log(data);
            //     console.log("Data loading with : ", response.statusText);
           
            setSalonServicesList(data);
            setLoadData(false)
           
        })
        .catch(error => {
            setErrorMessage(error.toString());
            handleNewErrorNotification(errorMessage);
            console.error("An error occured while retrieving the salon services : ", errorMessage);
        });        
        
      }, []);
      function bookFor(salon) {
         console.log("ChooseService.JS Slot ID == " + salon.id + " Slot Selected:" + salon.name);
         console.log("ChooseService.JS Description == " + salon.description + " Slot Selected:" + salon.name);
        const paramNumService =  salon.id;
        
        history.push("/chooseslot/"+salon.id+"/"+salon.name);
      //   history.push({
      //     pathname: "/chooseslot/",
      //     state: {id: salon.id} 
      // });
      }
            return(
              <Fragment>
                   {loadData ? <div><ProgressBar animated now={100}/></div> : <div></div>}
                   <div className="grid-container row  text-center">
                    {salonServicesList.map((salon, index)=>{
                        return(
                            <div key={index} className="card mb-4 shadow-sm">
                                <div className="card-header" >
                                    <h4 className="my-0 font-weight-normal">{salon.name}</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title">${salon.price} </h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>{salon.description}</li>
                                        <li>{salon.timeInMinutes} Minutes</li>
                                    </ul>
                                     <div className="card-footer bg-transparent "> 
                                          <button type="button" onClick={(evt) => bookFor(salon)}  className="btn btn-lg btn-block btn-outline-primary">Book Now</button>
                                     </div>
                                </div>
                            </div>
                        );
                    })}
                </div>                   
              </Fragment>
        );        
}

export default ChooseService;