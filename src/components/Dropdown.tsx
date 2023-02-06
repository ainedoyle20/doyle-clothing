import { useNavigate } from "react-router-dom";

import { useUserStore } from "../store/userStore";
import { removeProductFromCart } from "../services/funcs";

import CartProduct from "./CartProduct";

const Dropdown = () => {
  const navigate = useNavigate();

  const userProfile = useUserStore(state => state.userProfile);
  const setUserProfile = useUserStore(state => state.updateUserProfile);

  const handleRemoveProductFromCart = (key: string) => {
    if (!userProfile) return;
    
    removeProductFromCart(userProfile?._id, key, setUserProfile);
  }

  return (
    <div 
      className="
      absolute top-[40px] right-0 w-[350px] h-[400px] 
      border-2 border-black bg-[#FAF9F8] z-50 pt-1"
    >
      <div className="w-full h-[85%] overflow-scroll pb-2">
        {userProfile?.cartItems?.length 
        ? <>{userProfile?.cartItems.map((cartProduct, idx) => (
          <CartProduct key={cartProduct._key} cartProduct={cartProduct} handleRemoveCartProduct={handleRemoveProductFromCart} />
        ))}</>
        : <div className="flex justify-center items-center w-full h-full">EMPTY</div>
        }
      </div>

      <button 
        className="w-full h-[15%] flex items-center justify-center text-xl border-t-2 border-black
        bg-[#000000] text-[#ffffff] hover:bg-[#ffffff] hover:text-[#000000]"
        onClick={() => navigate("/checkout")}
      >
        Checkout
      </button>
    </div>
  );
}

export default Dropdown;
