import React, { useState } from 'react';
import { BiSearch } from "react-icons/bi";
import { GrClose } from "react-icons/gr";

interface SearchProps {
  searchTerm: string;
  setSearchTerm(arg: string): void;
  setSelectedColour(arg: string): void;
}

const Search: React.FC<SearchProps> = ({ searchTerm, setSearchTerm, setSelectedColour }) => {
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <div className="flex items-center justify-center gap-2">
      {showSearchInput ? (
        <>
          <input 
            className='border-b-[1px] border-black outline-none ml-1 pl-1 bg-[#FAF9F8]'
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Products"
          />
          <span className='text-xl flex justify-center items-center cursor-pointer' 
            onClick={() => {
              setSearchTerm("");
              setSelectedColour("");
              setShowSearchInput(false);
            }}
          >
            <GrClose />
          </span>
        </>
      ) : (
        <span className='flex justify-center items-center text-2xl cursor-pointer' onClick={() => setShowSearchInput(true)}>
          <BiSearch />
        </span>
      )}
    </div>
  );
}

export default Search;