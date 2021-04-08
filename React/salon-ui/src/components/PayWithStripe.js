// To make payments via Stripe
import React from "react";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PayWithStripe = (props) => {

    console.log("PayWithStripe...Props");
    console.log(props);
    const stripe = useStripe();
    const elements = useElements();
    const secret = props.clientSecret;
    const callback = props.paymentDoneCallback;
    
    const handleSubmit = async (event) => {
        // console.log(event);
        console.log("PayWithStripe...secret = props.secretID:");
        console.log(secret);
        console.log("PayWithStripe...handleSubmit");

        event.preventDefault();

        const result = await stripe.confirmCardPayment(
            secret,
            {
                payment_method: { card: elements.getElement(CardElement) }
            }
        );
        callback(result.paymentIntent.status);
    };

    return( 
        <div>
            <h4> Enter Card Details </h4>
            <form onSubmit={handleSubmit}>
                <CardElement
                options={{
                    style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                        color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                    },
                }}
                />
                <button type="submit" className="btn btn-success" >
                Pay
                </button>
            </form>
        </div>
    );
};

export default PayWithStripe;