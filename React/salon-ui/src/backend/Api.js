import React from "react";

export function confirmPayment(paymentId) {
    const url = "/api/payments/confirm/";
    console.log("confirmPayment... url=");
    console.log(url);
    console.log("confirmPayment... paymentId=");
    console.log(paymentId);
    return fetch( url + paymentId ,
    {
        method: 'PUT',
        cache: 'no-cache',
        credentials: 'same-origin',
        mode: 'cors'
    });
}

export function downloadTicket(ticketId) {
    const url = "/api/tickets/";
    return fetch(url + ticketId);
}

export function ApiInitiatePayment(slotId,serviceId,firstName,lastName,phoneNumber,email) {
    console.log("ApiInitiatePayment  API.js");
    console.log(slotId);
    console.log(serviceId);
    console.log(firstName);
    console.log(lastName);
    console.log(phoneNumber);
    console.log(email);
    const url = "/api/payments/initiate";
    return  fetch(url,{    
        method:'POST',  
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',      
        headers: {  
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         } ,body: JSON.stringify(
             {
                'slotID' : slotId,
                'salonServiceDetailID' : serviceId,
                'firstName' : firstName,
                'lastName' : lastName,
                'email' : email,
                'phoneNumber' : phoneNumber,
             }
         )
        }
        );
}