import { useState } from "react";
import { Link } from "react-router-dom";

import Bow from "../assets/bow.svg";
import Cart from "../assets/cart.svg";

import Dropdown from "../components/Dropdown";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  // get user
  const user = true;
  return (
    <>
      <div 
        className="
        absolute top-0 left-0 border-b-2 border-black w-full
        text-lg pl-2
        flex justify-between
        z-50
        bg-[#FAF9F8]
        "
      >
        <Link to="/">
          <img alt="bow tie" src={Bow} className="w-10" />
        </Link>

        <div className="flex gap-5 items-center px-2">
          {user 
            ? <span className="text-lg">logout</span> 
            : <Link to="/auth">login</Link>
          }
          <div 
            className="relative cursor-pointer"
            onClick={() => setShowDropdown(prev => !prev)}
          >
            <img alt="shopping cart" src={Cart} className="w-10"  />
            <span 
              className="text-sm absolute top-1/2 left-1/2
                -translate-y-1/2 -translate-x-[20%]
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
    </>
  );
}

export default Header;
