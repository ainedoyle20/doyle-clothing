import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiShoppingBag, BiUserCircle } from "react-icons/bi";

import { useUserStore } from "../store/userStore";
import { logoutUser } from "../services/firebase";

import Bow from "../assets/bow.svg";

import Dropdown from "../components/Dropdown";

const Header = () => {
  const user = useUserStore(state => state.userProfile);
  const setUserProfile = useUserStore(state => state.updateUserProfile);

  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    if (!user || !user?._id) {
      setCartTotal(0);
      return;
    }

    const counts = user.userCart.map(cartItem => cartItem.count);
    // console.log("counts: ", counts);
    const total = counts.reduce((acc, count) => count + acc ,0);
    setCartTotal(total);
  }, [user])

  const handleLogout = async () => {
    await logoutUser();
    setUserProfile(null);
    setShowUserOptions(false);
  }

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
          {/*  User Icon  */}
          <span 
            onClick={() => {
              setShowDropdown(false);
              setShowUserOptions(prev => !prev);
            }}
            className="h-full w-full text-[30px] flex items-center justify-center cursor-pointer pt-1"
          >
            <BiUserCircle />
          </span> 

          {/*  Shopping Cart Icon  */}
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
              {cartTotal}
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
              <span 
                className="cursor-pointer w-full px-5 hover:font-bold" 
                onClick={() => {
                  setShowUserOptions(false);
                }}
              >
                Orders
              </span>
              <span 
                className="cursor-pointer w-full px-5 hover:font-bold"
                onClick={handleLogout}
              >
                logout
              </span>
            </>
          ) : (
            <span className="cursor-pointer w-full px-5 hover:font-bold"
              onClick={() => {
                navigate("/auth");
                setShowUserOptions(false);
              }}
            >
              login
            </span>
          )}
        </div>
      ) : 
        null
      }
    </>
  );
}

export default Header;
