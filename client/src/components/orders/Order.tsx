import React, { useState, useEffect } from 'react';

import { TOrder } from '../../store/userStore';

import OrderProduct from './OrderProduct';

interface OrderProps {
  order: TOrder;
}

const Order: React.FC<OrderProps> = ({ order }) => {
  const [total, setTotal] = useState(0);


  useEffect(() => {
    if (!order) return;

    const cost = order.products.reduce((acc, product) => (product.count * Number(product.storedProduct.price)) + acc , 0)

    setTotal(Number(cost.toFixed(2)));
  }, []);


  return (
    <div className='w-full flex flex-col gap-5 border-y-[1px] border-black px-2 py-2'>
      <div className='w-full'>
        <span className='text-lg'>
          Date of Order: {order.orderDate}
        </span>
      </div>

      {order.products.map(product => (
        <OrderProduct key={product._key} productCard={product} />
      ))}

      <div className='w-full flex justify-end'>
        <>
          <span className='text-xl mr-10'>Order Total: </span>
          <span className='text-xl mr-20'>
            €{total}
          </span>
        </>
      </div>
    </div>
  );
}

export default Order;
