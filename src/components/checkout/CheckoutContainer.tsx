import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserStore } from '../../store/userStore';
import { incrementExistingProduct, decrementExistingProduct, removeProductFromCart } from '../../services/funcs';

import CheckoutProduct from './CheckoutProduct';

const CheckoutContainer = () => {
  const userProfile = useUserStore(state => state.userProfile);
  const setUserProfile = useUserStore(state => state.updateUserProfile);

  const navigate = useNavigate();

  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeKeyAction, setActiveKeyAction] = useState({ key: "", action: ""});

  useEffect(() => {
    if (!userProfile || !userProfile?.cartItems?.length) {
      setCheckoutTotal(0);
      return;
    }

    const total = userProfile.cartItems.reduce((acc, cartItem) => (cartItem.count * Number(cartItem.storedProduct.price)) + acc , 0);

    setCheckoutTotal(Number(total.toFixed(2)));
  }, [userProfile]);

  const handleIncrement = async (key: string) => {
    if (!userProfile || !userProfile?._id) {
      alert('Sorry somthing went wrong. Please try logging out and back in again.');
      return;
    }

    setLoading(true);
    setActiveKeyAction({ key, action: "count"});

    await incrementExistingProduct(userProfile._id, key, setUserProfile);

    setLoading(false);
    setActiveKeyAction({ key: "", action: ""});
  }

  const handleDecrement = async (key: string, count: number) => {
    if (!userProfile || !userProfile?._id) {
      alert('Sorry somthing went wrong. Please try logging out and back in again.');
      return;
    }

    setLoading(true);
    setActiveKeyAction({ key, action: "count"});

    if (count === 1) {
      await removeProductFromCart(userProfile._id, key, setUserProfile);
    } else {
      await decrementExistingProduct(userProfile._id, key, setUserProfile);
    }

    setLoading(false);
    setActiveKeyAction({ key: "", action: ""});
  }

  const handleDelete = async (key: string) => {
    if (!userProfile || !userProfile?._id) {
      alert('Sorry somthing went wrong. Please try logging out and back in again.');
      return;
    }

    setLoading(true);
    setActiveKeyAction({ key, action: "delete"});

    await removeProductFromCart(userProfile._id, key, setUserProfile);

    setLoading(false);
    setActiveKeyAction({ key: "", action: ""});
  }

  return (
    <>
    
      <div className='w-3/4 flex flex-col gap-10 mt-5 border-y-[1px] border-black px-2 py-2'>
        {userProfile?.cartItems.length ? (
          userProfile?.cartItems.map(cartItem => (
            <CheckoutProduct key={cartItem._key} cartItem={cartItem} increment={handleIncrement} decrement={handleDecrement} remove={handleDelete} loading={loading} activeKeyAction={activeKeyAction} />
          ))
        ) : (
          <span>There are no items in your cart</span>
        )}
      </div>
    
      <div className='w-3/4 flex justify-end mt-2 px-16'>
        <span className='text-2xl'>Total: €{checkoutTotal}</span>
      </div>

      <div className='w-3/4 flex justify-between mt-5'> 
        <button type='button' className='bg-[#000000] text-[#ffffff] hover:bg-[#FAF9F8] hover:text-[#000000] hover:border-2 hover:border-black text-lg py-1 px-2'
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>

        <button type='button' className='text-lg py-1 px-2 border-2 border-black'>
          Checkout with Stripe
        </button>
      </div>

    </>
  )
}

export default CheckoutContainer;
