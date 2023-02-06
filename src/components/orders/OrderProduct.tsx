import React from 'react';

import { TCartItem } from '../../store/userStore';

interface OrderProductProps {
  productCard: TCartItem;
}

const OrderProduct: React.FC<OrderProductProps> = ({ productCard }) => {
  const { _key, count, size, storedProduct} = productCard;
  return (
    <div className='w-full flex justify-between'>
      <div className='flex gap-8'>
        <img 
          alt="product image"
          src={storedProduct.image[0].asset.url}
          className="w-[200px] h-auto"
        />

        <div className='flex flex-col justify-center gap-2'>
          <span>{storedProduct.name}</span>
          <span>Size {size}</span>
          <span>€ {storedProduct.price}</span>
        </div>
      </div>

      <div className='flex flex-col justify-center gap-2 mr-20'>
        <span className='text-2xl font-bold'>x {count}</span>
      </div>
    </div>
  )
}

export default OrderProduct;
