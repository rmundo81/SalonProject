//  To validate payment and retrieve the ticket information 
//  and the salon’s address along with a barcode
import React, { Fragment, useState, useEffect, useContext} from "react";
import QRCode  from 'qrcode.react';
import moment from 'moment';
import { NotificationContext } from "./AppNotificationComponent";
import {v4} from 'uuid';
import { handleHttpErrors } from "../common/HttpHelper";

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
        .then( res=> handleHttpErrors(res))
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
                    <h3>Your Ticket Details</h3>
                    <div className="row">
                        <div className="col-6"> 
                            <strong> Service Details</strong>
                            <div>{ticketInfo.selectedServiceName} @ {ticketInfo.dateSlotFor} by {ticketInfo.slotStylistName} </div>
                            <hr/>
                            <br/>
                            <strong> Salon Address Details</strong>                               
                                <div> {salonInfo.name} </div>                        
                                <div> {salonInfo.address} </div>                        
                                <div> {salonInfo.city} </div>                 
                                <div> {salonInfo.state} </div>                  
                                <div> Zip {salonInfo.zipcode} </div>                       
                                <div>Phone {salonInfo.phone} </div>                          
                        </div>
                        <div className="col-6">                  
                            <strong> Take a Picture of the below code and present it to Admin </strong>                        
                                <QRCode value={ticketInfo.ticketUrl} />
                        </div>
                    </div>
                </div>
            }
            
        </Fragment>
    );
}

export default ShowConfirmedTicket;