import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { useUserStore } from '../store/userStore';

import CheckoutForm from '../components/checkout/CheckoutForm';

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

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      {stripePromise && clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : null}
    </div>
  );
}

export default Stripe;
