import React, {useContext,useEffect,Fragment, useState} from "react";
import { useParams, useHistory } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { NotificationContext } from "./AppNotificationComponent";
import ProgressBar from "./LoadingIndicator";
import {v4} from 'uuid';
import Moment  from 'moment';


function ChooseSlot (props) {
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    const [showDate2, setShowDate2] = useState(Moment(currentDate).format('yyyy-MM-DD'));
    let history = useHistory();
    console.log("showDate2 =" + showDate2);

    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [errorMessage, setErrorMessage] = useState(null);
    const [slotAvailableList, setSlotAvailableList] = useState([]);
    const [loadData, setLoadData] = useState(true);  
    const [loadProgreBar, setLoadProgreBar] = useState(true);  
    const {serviceId, serviceName} = useParams();
    console.log(" Slot ID == " + serviceId + " Slot Selected:" + serviceName);
    const dispatch = useContext(NotificationContext);
    
    const handleNewErrorNotification = (errMsg) => {
        setLoadData(false);
        setLoadProgreBar(false);
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            uuid: v4(),
            type: "ERROR",
            message: "An Unexpected Error Occured : " + errMsg + " !"
          }
        })
      }

    const handleNewSuccessNotification = () => {
        setLoadData(true);
        setLoadProgreBar(true);
        dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
            uuid: v4(),
            type: "SUCCESS",
            message: "Slots Available Loaded Successfuly"
        }
        })
    }

    const handleChangeDate = (newDate) => {
        var userSelectedDate = new Date(newDate); //dd-mm-YYYY
        var today = new Date();
        today.setHours(0,0,0,0);
        
        if(userSelectedDate < today) {        
            handleNewErrorNotification("No Past Date Allowed");
        } else {
            setSelectedDate(newDate);            
        }
    };
    
   
    useEffect(()=> {
        showSlotSubmit();
    },[]);

    const showSlotSubmit = async () => {        

        const dateParram = Moment(selectedDate).format('yyyy-MM-DD');
        const url = `/api/services/retrieveAvailableSlots/${serviceId}/${dateParram}`; 
        console.log('URL='+url);

        setShowDate2(Moment(selectedDate).format('yyyy-MM-DD'));       

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
            setLoadData(false);
            return Promise.reject(error);
        } else {
            handleNewSuccessNotification();           
            setSlotAvailableList(data);
            setLoadData(true)
            setLoadProgreBar(false);                       
        }       
    })
    .catch(error => {
        setErrorMessage(error.toString());
        handleNewErrorNotification(errorMessage);
        console.error("An error occured while retrieving the slots available : ", errorMessage);
    });
    }
    
    function showSlotsAvailable() {       
       showSlotSubmit();
    }

    function bookFor(slot) {
        console.log("Slot ID/serviceId/serviceName");
        console.log(slot.id);
        console.log(serviceId);
        console.log(serviceName);
        history.push("/makepayment/"+slot.id+"/"+serviceId+"/"+serviceName);
    }

    // function convertToTime(time) {
    //     .toLocaleTimeString('en-US')
    // }

    return (
        <Fragment>
             <div className="grid-container row  text-center"> 
                <h6>Choose a Date for {serviceName}</h6>
                &nbsp;  &nbsp; 
                <DatePicker
                    selected={selectedDate}
                    onChange={handleChangeDate}
                    dateFormat= 'dd/MM/yyyy'
                    isClearable
                    showYearDropdown
                    scrollableYearDropdown
                    // minDate={currentDate}
                    filterDate={date => date.getDay() !== 6 && date.getDay() !== 0}
                    
                    // onSelect={noPastCurrentDAte}
                />
                 &nbsp;  &nbsp;                 
                <button type="button" onClick={(evt) => showSlotsAvailable()}  className="btn btn-primary">Show Slots</button>
             </div>
             <div>
             {loadProgreBar ? <div><ProgressBar animated now={100}/></div> : <div></div>}
             <p></p>
             <p></p>
             {loadData ? <h2 className="my-0 font-weight-normal">Available Slots on {showDate2}  </h2>: <div></div>}
             <div className="grid-container row  text-center">                     
                      {slotAvailableList.map((slot, index) => {
                          return (
                            
                              <div className="card" key={index}  > 
                                  <div className="card mb-4 shadow-sm"     >                                                   
                                              <div className="card-header" > 
                                                <h4 className="my-0 font-weight-normal"> {serviceName} </h4>
                                              </div>
                                              <div className="card-body">
                                                  <h1 className="card-title pricing-card-title">{slot.stylistName} </h1>
                                                  <ul className="list-unstyled mt-3 mb-4">
                                                      {/* <li>{slot.description}</li> */}
                                                      <li>Slot Time {slot.slotFor}</li>
                                                  </ul>
                                              </div>
                                              <div className="card-footer bg-transparent ">
                                                <button type="button" onClick={(evt) => bookFor(slot)}  className="btn btn-lg btn-block btn-outline-primary">Book This Slot</button>
                                                {/* <button variant="primary" href={"/makepayment/"+slot.id+"/"+serviceId+"/"+serviceName} >Book This Slot</button> */}
                                              </div>
                                  </div>           
                              {/* </div> */}
                            </div>
                              )
                      })}
                  </div>

             </div>
        </Fragment>
    );
}

export default ChooseSlot;