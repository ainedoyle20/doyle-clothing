import React, { useState } from 'react';
import { BsChevronDown, BsChevronUp } from "react-icons/bs"

interface SelectSortingOptionProps {
  orderBy: string;
  setOrderBy(arg: string): void;
}

const SelectSortingOption: React.FC<SelectSortingOptionProps> = ({ orderBy, setOrderBy }) => {
  const [showOption, setShowOption] = useState(false);

  return (
    <div className='w-3/4 flex justify-start gap-2'>
      <span>Listed by </span>

      <div className='relative flex items-center gap-2 border-[1px] border-black px-1 w-[90px]'>
        <span>{orderBy}</span>

        {showOption ? (
          <span className='text-lg flex justify-center items-center cursor-pointer' onClick={() => setShowOption(false)}><BsChevronUp /></span>
        ) : (
          <span className='text-lg flex justify-center items-center cursor-pointer' onClick={() => setShowOption(true)}><BsChevronDown /></span>
        )}

        {showOption ? (
          <div className='absolute top-full left-0 z-50 p-1 border-[1px] border-black  w-[90px]'>
            <span
              className="cursor-pointer hover:text-black"
              onClick={() => {
                setOrderBy(orderBy === "Newest" ? "Oldest" : "Newest");
                setShowOption(false);
              }}
            >{orderBy === "Newest" ? "Oldest" : "Newest"}</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default SelectSortingOption;
