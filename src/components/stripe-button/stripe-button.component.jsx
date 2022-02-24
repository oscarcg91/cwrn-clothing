import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price  * 100;
    const publishableKey = 'pk_test_51KWB61FItYj8dUbwVfqsADmyTm9l6lw6AYmkhHqXF17g0HZvhIVXuKXpJfoqEt4IdnfNH5n1TwWHCK7NpQNAi9RF00SizmyhL5';


    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout
        token={onToken}        
        stripeKey={publishableKey}
        label='Pay now'
        name='Test APP'
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay now'
        />
    );

};


export default StripeCheckoutButton;
