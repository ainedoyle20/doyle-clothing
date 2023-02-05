import React, { useState } from 'react';
import { AiFillDelete } from "react-icons/ai";
import { Oval } from 'react-loader-spinner';

import { TUserCart } from '../store/userStore';

interface CartProductProps {
  cartProduct: TUserCart;
  handleRemoveCartProduct(arg: string): void;
}

const CartProduct: React.FC<CartProductProps> = ({ cartProduct, handleRemoveCartProduct }) => {
  const { _key, cartProduct: product, count, size } = cartProduct;

  const [removingProduct, setRemovingProduct] = useState(false);

  const handleDelete = (key: string) => {
    setRemovingProduct(true);
    handleRemoveCartProduct(key);
  }

  return (
    <div className='relative border-b-2 border-black w-full flex'>
      <span 
        className='absolute top-2 right-3 text-xl cursor-pointer'
      >
        {removingProduct ? (
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
          <AiFillDelete onClick={() => handleDelete(_key)} />
        )}
      </span>

      <img 
        alt="product cover"
        src={product?.image[0]?.asset?.url}
        className="w-[100px] h-auto"
      />

      <div className='w-full flex flex-col justify-center px-2 text-sm'>
        <span>
          {product?.name}
        </span>

        <span>
          Size {size}
        </span>
        
        <div className='flex gap-2'>
          <span>
            €{product?.price}
          </span>

          <span>x</span>

          <span>
            {count}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CartProduct;
