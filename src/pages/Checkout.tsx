import React from 'react';

import CheckoutContainer from '../components/checkout/CheckoutContainer';

const Checkout = () => {

  return (
    <div className='w-screen min-h-screen flex flex-col items-center mt-14'>
      <span className='text-xl'>Checkout</span>

      <CheckoutContainer />
    </div>
  )
}

export default Checkout;
