import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Product } from '../../services/funcs';

const colourCodes = {
  black: "#000000",
  blue: "#0000ff",
  white: "#ffffff",
  beige: "#f9f9eb",
  grey: "#808080",
  turquoise: "#40e0d0"
}

type ObjectKey = keyof typeof colourCodes;

interface HomeProductProps {
  product: Product;
}

const HomeProduct: React.FC<HomeProductProps> = ({ product }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => navigate(`/${product._id}`)}
      className='flex flex-col justify-between w-[250px] h-[460px] cursor-pointer mb-2 z-30'
    >
      <img alt="product image" src={product.image[0].asset.url} className="w-full h-4/5" />
      <div className='w-full h-1/5 flex flex-col pl-2'>
        <span className='text-sm'>{product.name}</span>
        <span className='text-xs'>€{product.price}</span>
        <div className='flex items-center gap-1 w-full'>
          {product.allColours.map(colour => (
              <span 
                key={colour}
                className={`${product.colour === colour ? "border-[1px] border-black w-4 h-4" : "w-3 h-3"} rounded-full shadow-md flex justify-center items-center`}
              >
                <span 
                  style={{
                    width: "0.75rem",
                    height: "0.75rem",
                    borderRadius: "100%",
                    backgroundColor: `${colourCodes[colour as ObjectKey]}`
                  }}
                ></span>
              </span>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default HomeProduct;
