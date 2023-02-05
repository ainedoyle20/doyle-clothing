import { useNavigate } from "react-router-dom";

const Dropdown = () => {
  const navigate = useNavigate();

  const cart = [];
  return (
    <div 
      className="
      absolute top-[40px] right-0 w-[250px] h-[300px] 
      border-2 border-black bg-[#FAF9F8] z-50"
    >
      <div className="w-full h-[85%] overflow-scroll border-2 border-black">
        {cart.length 
        ? <div>Map Products</div> 
        : <div className="flex justify-center items-center w-full h-full">EMPTY</div>
        }
      </div>

      <button 
        className="w-full h-[15%] text-xl border-2 border-black"
        onClick={() => navigate("/checkout")}
      >
        Checkout
      </button>
    </div>
  );
}

export default Dropdown;
