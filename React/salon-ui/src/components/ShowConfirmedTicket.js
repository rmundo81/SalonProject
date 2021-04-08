//  To validate payment and retrieve the ticket information 
//  and the salon’s address along with a barcode
import React, { Fragment, useState, useEffect, useContext} from "react";
import QRCode  from 'qrcode.react';
import moment from 'moment';
import { NotificationContext } from "./AppNotificationComponent";
import ProgressBar from "./LoadingIndicator";
import {v4} from 'uuid';


function ShowConfirmedTicket (props) {
console.log("ShowConfirmedTicket...Props stripePaymentID");
console.log(props.stripePaymentID);
const [loadData, setLoadData] = useState(true);  
const dispatch = useContext(NotificationContext);

const [salonInfo, setSalonInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '' 
})
const [ticketInfo, setTicketInfo] = useState({
    ticketUrl:'',
    selectedServiceName: '',
    dateSlotFor: '',
    slotStylistName: '' 
})

const handleNewErrorNotification = (errMsg) => {
    setLoadData(false);
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        uuid: v4(),
        type: "ERROR",
        message: "An error occured while confirming the ticket : " + errMsg + " !"
      }
    })
  }

  useEffect(() => {
    console.log("ShowConfirmedTicket...useEffect");
    const requestOptions = {
        method: 'PUT',
        cache: 'no-cache',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         },
    };

    const url = "/api/payments/confirm/";
    const paymentId = props.stripePaymentID;
    function fetchConfirmPayment() {
        console.log("fetchConfirmPayment...");
        fetch(url + paymentId, requestOptions)
        .then(async response =>{
            try {
                const data = await response.json()
                console.log('response data?', data)
                setLoadData(true)
                onPaymentConfirmed(data)
            } catch (error) {
                setLoadData(false);
                handleNewErrorNotification(error)
                console.error("An error occured while confirming the ticket : ", error);                
            }
        })
    }
    fetchConfirmPayment();
},[]);

function onPaymentConfirmed(confirm) {   
    console.log("ShowConfirmedTicket...onPaymentConfirmed() confirm");
    console.log(confirm);
    var confirmDateSlotFor = new Date(confirm.ticket.payment.slot.slotFor);
    const dateSlotFormated = moment(confirmDateSlotFor).format("ddd, MMMM D YYYY");
    setSalonInfo(
        {
            ...salonInfo,
            name: confirm.salonDetails.name,
            address: confirm.salonDetails.address,
            city: confirm.salonDetails.city,
            state: confirm.salonDetails.state,
            zipcode: confirm.salonDetails.zipcode,
            phone: confirm.salonDetails.phone

        });
    setTicketInfo(
        {
            ...ticketInfo,
            ticketUrl: 'http://localhost:8080/api/services/api/tickets/' + confirm.ticket.id,
            selectedServiceName: confirm.ticket.payment.selectedService.name,
            dateSlotFor: dateSlotFormated,
            slotStylistName: confirm.ticket.payment.slot.stylistName
        } 
        );
}

    return( 
        <Fragment>            
            { !loadData ? <div/> :
            <div>                
                <div>
                    <h2>Your Ticket Details</h2>
                    <h4>Service Details</h4>
                    {ticketInfo.selectedServiceName} @ {ticketInfo.dateSlotFor} by {ticketInfo.slotStylistName}
                    <br/>
                    <h4>Salon Address Details</h4>    
                        <p>
                             {salonInfo.name}                         
                            <br/> {salonInfo.address}                         
                            <br/> {salonInfo.city}                         
                            <br/> {salonInfo.state}                        
                            <br/> Zip {salonInfo.zipcode}                        
                            <br/>Phone {salonInfo.phone} 
                        </p>                    
                    <h4>Take a Picture of the below code and present it to Admin </h4>
                    <QRCode value={ticketInfo.ticketUrl} />
                </div>
            </div>
            }
            
        </Fragment>
    );
}

export default ShowConfirmedTicket;