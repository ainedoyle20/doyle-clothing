import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';

import { useUserStore } from '../store/userStore';
import { addOrder, removeAllProductsFromCart } from '../services/funcs';
import { TOrder } from '../store/userStore';

const Confirmation = () => {
  const userProfile = useUserStore(state => state.userProfile);
  const setUserProfile = useUserStore(state => state.updateUserProfile);

  const navigate = useNavigate();

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<TOrder>();

  useEffect(() => {
    if (!userProfile) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (!userProfile) {
      setTotal(0);
      return;
    }

    if (!order) return;

    // const cost = userProfile.cartItems.reduce((acc, cartItem) => (cartItem.count * Number(cartItem.storedProduct.price)) + acc, 0);
    const cost = order.products.reduce((acc, product) => (product.count * Number(product.storedProduct.price)) + acc , 0)

    setTotal(Number(cost.toFixed(2)));
  }, [userProfile, order]);

  useEffect(() => {
    if (!userProfile || !userProfile.cartItems.length) {
      setLoading(false);
      return;
    };

    // create new order object in sanity from userProfile.cartItems
    const addingOrder = async () => {
      await addOrder(userProfile._id, userProfile.cartItems);
      await removeAllProductsFromCart(userProfile._id, userProfile.cartItems, setUserProfile);
      setLoading(false);
    }

    addingOrder();

  }, []);

  useEffect(() => {
    if (!userProfile || loading) return;

    // const todaysOrder = userProfile.orders.filter(order => order.orderDate === new Date().toLocaleDateString('en-gb', { weekday: "long", year: "numeric", month: "long", day: "numeric" }))[0];
    const todaysOrder = userProfile.orders[userProfile.orders.length -1];

    if (todaysOrder) setOrder(todaysOrder);
  }, [loading]);

  return (
    <div className='w-screen min-h-screen flex flex-col items-center pt-20'>
      <span className='text-xl mb-5'>Order Summary</span>

      {loading || !order ? (
        <Oval
          height={80}
          width={80}
          color="#000000"
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#000000"
          strokeWidth={8}
          strokeWidthSecondary={6}
        />
      ) : (
        order.products.map(product => (
          <div key={product._key} className="w-1/2 flex justify-between cursor-default mb-5">
            <div className='flex gap-8'>
              <img
                alt="product image"
                src={product.storedProduct.image[0].asset.url}
                className="h-[200px]"
              />

              <div className='flex flex-col justify-center gap-2'>
                <span>{product.storedProduct.name}</span>
                <span>Size {product.size}</span>
                <span>€ {product.storedProduct.price}</span>
              </div>
            </div>

            <div className='flex flex-col justify-center items-center mr-20'>

              <span className='text-xl font-bold cursor-default'>
                x {product.count}
              </span>
            </div>

          </div>
        ))
      )}

      <span className='text-2xl cursor-default'>Total: €{total}</span>

      <span 
        className='text-lg cursor-pointer mt-12 border-2 border-black px-2 bg-[#000000] text-[#ffffff] hover:bg-[#ffffff] hover:text-[#000000]' 
      
        onClick={() => navigate("/")}
      >
        Continue Shopping
      </span>
    </div>
  );
}

export default Confirmation;
