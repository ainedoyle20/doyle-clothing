import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { Appearance, StripeElementsOptions } from '@stripe/stripe-js';

import { useUserStore } from '../store/userStore';

import CheckoutForm from '../components/payment/CheckoutForm';
import CartSummary from '../components/payment/CartSummary';

import getStripe from "../lib/getStripe";

const stripePromise = getStripe();

const Stripe = () => {
  const userProfile = useUserStore(state => state.userProfile);

  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {

    if (!userProfile || !userProfile?._id || !userProfile?.cartItems?.length) {
      navigate("/");
    }

  }, [userProfile]);

  useEffect(() => {
    if (!userProfile || !userProfile?._id || !userProfile?.cartItems?.length) return;

    fetch("http://localhost:5252/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems: userProfile.cartItems }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => console.log("Error creating PaymentIntent: ", error));

  }, []);

  const appearance: Appearance = {
    theme: "stripe",
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <div className='w-screen h-screen flex'>
      <CartSummary cartItems={userProfile?.cartItems} />

      <div className='w-1/2 h-full border-l-2 border-black flex flex-col justify-center items-center'>

        <div className='flex flex-col gap-1 mb-8'>
          <span className='w-full flex justify-center text-lg'>TEST CARD DETAILS</span>
          <span>Card Number: 4242 4242 4242 4242</span>
          <span>Expiration: Any Future Date</span>
          <span>CVC: Any</span>
        </div>

        {stripePromise && clientSecret ? (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        ) : null}
      </div>
    </div>
  );
}

export default Stripe;
