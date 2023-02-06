import { useState } from 'react';
import OrdersContainer from '../components/orders/OrdersContainer';

import SelectSortingOption from '../components/orders/SelectSortingOption';

const Orders = () => {
  const [orderBy, setOrderBy] = useState("Newest")

  return (
    <div className='w-screen min-h-screen flex flex-col items-center gap-10 py-16'>
      <span className='text-xl'>My Orders</span>

      <SelectSortingOption orderBy={orderBy} setOrderBy={setOrderBy} />

      <OrdersContainer 
        orderBy={orderBy}
      />
    </div>
  );
}

export default Orders;
