import React, { useState } from 'react';
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

interface SelectSizeProps {
  selectedSize: string;
  setSelectedSize(arg: string): void;
}

const SelectSize: React.FC<SelectSizeProps> = ({ selectedSize, setSelectedSize }) => {
  const [sizes] = useState(["10","12", "14", "16", "18", "20"]);
  const [showSizes, setShowSizes] = useState(false);

  const handleClickedSize = (size: string): void => {
    setSelectedSize(size);
    setShowSizes(false);
  }

  return (
    <div className='relative border-2 border-black w-3/4 p-3 flex justify-between'>
      <span className='text-md w-3/4'>{selectedSize}</span>
      <span className='text-md flex justify-center items-center cursor-pointer' onClick={() => setShowSizes(prev => !prev)}>
        {showSizes ? (
          <BsChevronUp />
        ) : (
          <BsChevronDown />
        )}
      </span>

      {showSizes ? (
        <div className='absolute top-full left-0 z-30 bg-[#FAF9F8] w-full flex flex-col pb-1 border-[1px] border-black'>
          {sizes.map(size => (
            <span key={size} className='w-full p-2 cursor-pointer hover:shadow-md' onClick={() => handleClickedSize(size)}>
              {size}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default SelectSize;
