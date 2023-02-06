import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';

import { useUserStore, TOrder } from '../../store/userStore';

import Order from './Order';

interface OrdersContainerProps {
  orderBy: string;
}

const OrdersContainer: React.FC<OrdersContainerProps> = ({ orderBy }) => {
  const userProfile = useUserStore(state => state.userProfile);
  const navigate = useNavigate();

  const [orders, setOrders] = useState<TOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!userProfile || !userProfile?._id) {
      navigate("/");
    }
  }, [userProfile])

  useEffect(() => {
    if (!userProfile || !userProfile?._id) return;

    const sortedOrders = userProfile.orders.sort((a, b) => {
      if (orderBy === "Newest") {
        console.log(orderBy)
        return a.sortingNum - b.sortingNum;
      } else {
        return b.sortingNum - a.sortingNum;
      }
    })

    setOrders(sortedOrders);
    setLoadingOrders(false);

  }, [userProfile, orderBy]);

  if (loadingOrders) {
    return (
      <div className='absolute top-0 left-0 w-screen h-screen flex justify-center items-center'>
        <Oval
          height={60}
          width={60}
          color="#000000"
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#000000"
          strokeWidth={8}
          strokeWidthSecondary={6}
        />
      </div>
    );
  }

  if (!loadingOrders && !orders.length) {
    return (
      <div className='border-2 border-black w-3/4 flex justify-start px-5'>
        <span>You have no previous orders.</span>
      </div>
    )
  }
  
  return (
    <div className='w-3/4 flex flex-col gap-10'>
      {orders.map(order => (
        <Order 
          key={order._key}
          order={order}
        />
      ))}
    </div>
  )
}

export default OrdersContainer;
