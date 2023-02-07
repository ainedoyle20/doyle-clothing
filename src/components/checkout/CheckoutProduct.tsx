import React, { useState } from 'react';
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { Oval } from 'react-loader-spinner';

import { TCartItem } from '../../store/userStore';

interface CheckoutProductProps {
  cartItem: TCartItem;
  increment(arg: string): void;
  decrement(arg: string, arg2: number): void;
  remove(arg: string): void;
  loading: boolean;
  activeKeyAction: { key: string, action: string};
}

const CheckoutProduct: React.FC<CheckoutProductProps> = ({ cartItem, increment, decrement, remove, loading, activeKeyAction }) => {
  const { storedProduct: product, count, size, _key } = cartItem;

  // const [loading, setLoading] = useState(false);

  const handleRemove = () => {
    if (loading) return;
    remove(_key);
  }

  const handleInc = () => {
    if (loading) return;
    increment(_key);
  }

  const handleDec = () => {
    if (loading) return;
    decrement(_key, count);
  }


  return (
    <div className='w-full flex justify-between relative'>
      <span className='absolute top-2 right-3 text-xl cursor-pointer' onClick={handleRemove}>
        {loading && _key === activeKeyAction.key && activeKeyAction.action === "delete" ? (
          <Oval
            height={20}
            width={20}
            color="#000000"
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#000000"
            strokeWidth={8}
            strokeWidthSecondary={6}
          />
        ) : (
          <AiFillDelete />
        )}
      </span>

      <div className='flex gap-8'>
        <img 
          alt="product image"
          src={product.image[0].asset.url}
          className="w-[200px] h-auto"
        />

        <div className='flex flex-col justify-center gap-2'>
          <span>{product.name}</span>
          <span>Size {size}</span>
          <span>€ {product.price}</span>
        </div>
      </div>

      <div className='flex flex-col justify-center items-center gap-3 mr-20'>
        <span className='text-2xl cursor-pointer' onClick={handleInc}>
          <BsChevronUp />
        </span>

        <span className='text-2xl font-bold cursor-default'>
          {loading && _key === activeKeyAction.key && activeKeyAction.action === "count" ? (
            <Oval
              height={20}
              width={20}
              color="#000000"
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#000000"
              strokeWidth={8}
              strokeWidthSecondary={6}
            />
          ) : (
            `x ${count}` 
          )}
        </span>

        <span className='text-2xl cursor-pointer' onClick={handleDec}>
          <BsChevronDown />
        </span>
      </div>
    </div>
  );
}

export default CheckoutProduct;

//!incrementing.length || incrementing !== _key