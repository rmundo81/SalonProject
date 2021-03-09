import React, {useContext,useEffect,Fragment, useState} from "react";
import { useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { NotificationContext } from "./AppNotificationComponent";
import ProgressBar from "./LoadingIndicator";
import {v4} from 'uuid';
import Moment  from 'moment';

// import 'date-fns';
// import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardTimePicker,
//     KeyboardDatePicker,
// } from '@material-ui/pickers';


const ChooseSlot = () => {

    // let newDate = new Date()
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    const [selectedDate, setSelectedDate] = useState(currentDate)
    const [errorMessage, setErrorMessage] = useState(null);
    const [slotAvailableList, setSlotAvailableList] = useState([]);
    const [loadData, setLoadData] = useState(true);  
    const {slotId, serviceName} = useParams();
    console.log(" Slot ID == " + slotId + " Slot Selected:" + serviceName);
    const dispatch = useContext(NotificationContext);

    const handleNewErrorNotification = (errMsg) => {
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            uuid: v4(),
            type: "ERROR",
            message: "No Past Date Allowed : " + errMsg + " !"
          }
        })
      }

      const handleNewSuccessNotification = () => {
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
        // var userSelectedDate2 = new Date(newDate); //dd-mm-YYYY
        // console.log("newDate 22 == "+ Moment(userSelectedDate2).format('yyyy-MM-DD'));
        var userSelectedDate = new Date(newDate); //dd-mm-YYYY
        var today = new Date();
        today.setHours(0,0,0,0);
        
        if(userSelectedDate < today) {        
        //Do something..
            // alert("Working!");
            handleNewErrorNotification(userSelectedDate);
        } else {
            setSelectedDate(newDate);
            console.log("newDate == "+newDate);
        }
    };
    
   
    useEffect(()=> {
        showSlotSubmit(selectedDate);
    },[]);

    const showSlotSubmit = async (selectedDate2) => {
        // const url = "/api/services/retrieveAvailableSlots/" + id + "/" + serviceName;         
        const dateParram = Moment(selectedDate2).format('yyyy-MM-DD')
        // console.log("newDate 22 == "+ Moment(userSelectedDate2).format('yyyy-MM-DD'));
        const url = `/api/services/retrieveAvailableSlots/${slotId}/${dateParram}`; 
        console.log('URL='+url);

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
        } else {
            handleNewSuccessNotification();           
            setSlotAvailableList(data);
            setLoadData(false)
        }
       
    })
    .catch(error => {
        setErrorMessage(error.toString());
        handleNewErrorNotification(errorMessage);
        console.error("An error occured while retrieving the slots available : ", errorMessage);
    });
    }
    
    function showSlotsAvailable() {
       // history.push("/chooseslot/"+ salon.id+ "/"+ salon.name)
    //    var dateParram = Moment(selectedDate.format('YYYY-MM-DD'));
       
       showSlotSubmit(slotId);
      }

    function bookFor(salon) {
        // history.push("/chooseslot/"+ salon.id+ "/"+ salon.name)
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
             {loadData ? <div><ProgressBar animated now={100}/></div> : <div></div>}
             <p></p>
             <p></p>
             <h2 className="my-0 font-weight-normal">Available Slots on {serviceName} </h2>             
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
                                              <div class="card-footer bg-transparent ">
                                                <button type="button" onClick={(evt) => bookFor(slot)}  className="btn btn-lg btn-block btn-outline-primary">Book This Slot</button>
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