import React from "react";
import { useState } from "react";
import {loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import GetBillingDetails from './GetBillingDetails';
import PayWithStripe from './PayWithStripe';
import {stripeLoadKey} from '../config/StripeKeys';
import ShowConfirmedTicket from './ShowConfirmedTicket';

const PaymentContainer = (props) => {
    // console.log("PaymentContainer...Log")
    // console.log(props)
    
    const [secretID, setSecretID] = useState('');
    const [paymentID, setPaymentID] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    
    console.log("PaymentContainer...Log stripeLoadKey");
    console.log(stripeLoadKey);
    

    const handlePaymentInit = (paymentInitId, secretInitId) => {
        console.log("handlePaymentInit...Log PaymentContainer paymentInitId");
        console.log(paymentInitId);
        console.log("handlePaymentInit...Log PaymentContainer secretInitId");
        console.log(secretInitId);
        setPaymentID(paymentInitId);
        setSecretID(secretInitId);        
    }

    const handleStripePayment = (paymentStatusVar) => {
        console.log("handleStripePayment...Log PaymentContainer paymentStatusVar");
        console.log(paymentStatusVar);
        setPaymentStatus(paymentStatusVar);
    }

    return(   
        <Elements stripe={stripeLoadKey}> 
            { !secretID &&  <GetBillingDetails handlePaymentInit={handlePaymentInit}/>}
            { secretID && !paymentStatus && <PayWithStripe paymentDoneCallback={handleStripePayment} clientSecret={secretID}/>}
            {  paymentStatus && <ShowConfirmedTicket stripePaymentID={paymentID} />}
        </Elements>
    );
};

export default PaymentContainer;