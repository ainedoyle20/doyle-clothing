import { useState } from "react";
import { Link } from "react-router-dom";
import { BiShoppingBag, BiUserCircle } from "react-icons/bi";

import Bow from "../assets/bow.svg";
import Cart from "../assets/cart.svg";

import Dropdown from "../components/Dropdown";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false);
  // get user
  const user = true;
  return (
    <>
      <div 
        className="
        absolute top-0 left-0 border-b-2 border-black w-full
         pl-2
        flex justify-between
        z-50
        bg-[#FAF9F8]
        "
      >
        <Link to="/">
          <img alt="bow tie" src={Bow} className="w-10" />
        </Link>

        <div className="flex gap-3 items-center pr-3">
          {user 
            ?  <span 
                  onClick={() => {
                    setShowDropdown(false);
                    setShowUserOptions(prev => !prev);
                  }}
                  className="h-full w-full text-[30px] flex items-center justify-center cursor-pointer pt-1"
                >
                <BiUserCircle />
              </span> 
            : <Link to="/auth">login</Link>
          }
          <div 
            className="relative cursor-pointer flex justify-center items-center"
            onClick={() => {
              setShowUserOptions(false);
              setShowDropdown(prev => !prev);
            }}
          >
            {/* <img alt="shopping cart" src={Cart} className="w-10"  /> */}
            <span className="h-full w-full text-[30px]">
              <BiShoppingBag />
            </span>
            
            <span 
              className="text-xs absolute top-1/2 left-1/2
                -translate-y-[25%] -translate-x-1/2
              "
            >
              0
            </span>
          </div>
        </div>
      </div>

      {showDropdown ? (
        <Dropdown />
      ) : 
        null
      }

      {showUserOptions ? (
        <div className="absolute top-[40px] right-0 w-[100px] h-auto border-2 border-black bg-[#FAF9F8] z-50 py-2 flex flex-col gap-3">
          {user ? (
            <>
              <span className="cursor-pointer w-full px-5 hover:font-bold">Orders</span>
              <span className="cursor-pointer w-full px-5 hover:font-bold">logout</span>
            </>
          ) : (
            <span className="cursor-pointer w-full px-5 hover:font-bold">login</span>
          )}
        </div>
      ) : 
        null
      }
    </>
  );
}

export default Header;
