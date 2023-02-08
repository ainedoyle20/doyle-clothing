import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { TCartItem } from '../../store/userStore';

interface CartSummaryProps {
  cartItems: TCartItem[] | undefined;
}

const CartSummary: React.FC<CartSummaryProps> = ({ cartItems }) => {
  const [ total, setTotal ] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (!cartItems || !cartItems.length) return;

    const cost = cartItems.reduce((acc, cartItem) => (cartItem.count * Number(cartItem.storedProduct.price)) + acc , 0);

    setTotal(Number(cost.toFixed(2)));

  }, []);

  return (
    <div className='relative w-1/2 h-full flex flex-col items-center pt-36 px-5 gap-8 overflow-scroll'>
      <span
        className='absolute top-16 left-5 text-lg underline cursor-pointer'
        onClick={() => navigate("/checkout")}
      >
        Edit Order
      </span>

      <span className='text-xl cursor-default'>Order Summary</span>

      {cartItems?.length ? (
        cartItems.map(cartItem => (
          <div key={cartItem._key} className="w-full flex justify-between cursor-default">
            <div className='flex gap-8'>
              <img 
                alt="product image"
                src={cartItem.storedProduct.image[0].asset.url}
                className="h-[100px]"
              />

              <div className='flex flex-col justify-center gap-2'>
                <span>{cartItem.storedProduct.name}</span>
                <span>Size {cartItem.size}</span>
                <span>€ {cartItem.storedProduct.price}</span>
              </div>
            </div>

            <div className='flex flex-col justify-center items-center mr-20'>

              <span className='text-xl font-bold cursor-default'>
                x {cartItem.count}
              </span>
            </div>
          </div>
        ))
      ) : (
        <span>There are no items in your cart</span>
      )}

      
      <span className='text-2xl cursor-default'>Total: €{total}</span>

    </div>
  );
}

export default CartSummary;
