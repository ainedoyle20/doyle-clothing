import React from 'react';
import { BsCart3 } from "react-icons/bs";
import { Oval } from 'react-loader-spinner';

interface AddToCartBtnProps {
  handleAddToCart(): void;
  addingProduct: boolean;
}

const AddToCartBtn: React.FC<AddToCartBtnProps> = ({ handleAddToCart, addingProduct }) => {
  // disable if no userId
  return (
    <div 
      onClick={handleAddToCart}
      className='w-3/4 flex justify-center items-center py-1 cursor-pointer bg-[#000000] text-[#ffffff] border-2 border-black hover:bg-[#ffffff] hover:text-[#000000]'
    >
      {addingProduct ? (
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
      ): (
        <span className='flex gap-5 text-lg flex items-center'>
          <BsCart3 />
          Add to Cart
        </span>
      )}
    </div>
  )
}

export default AddToCartBtn;
