import React from 'react';

import { TOrder } from '../../store/userStore';

import OrderProduct from './OrderProduct';

interface OrderProps {
  order: TOrder;
}

const Order: React.FC<OrderProps> = ({ order }) => {
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
            €{order.totalCost}
          </span>
        </>
      </div>
    </div>
  );
}

export default Order;
