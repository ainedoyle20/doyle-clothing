import { FunctionComponent, useEffect, useState } from 'react';

import { fetchProducts, Product } from '../../services/funcs';

import HomeProduct from './HomeProduct';

interface ProductsContainerProps {
  category: string;
  subCategory: string;
}

const ProductsContainer: FunctionComponent<ProductsContainerProps> = ({ category, subCategory }) => {
  const [mens, setMens] = useState(true);
  const [data, setData] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // if (mens) { fetch male } else { fetch female }
    const getProducts = async (gender: string): Promise<void> => {
      const res = await fetchProducts(gender);
      if (res) {
        setData(res);
      }
    }

    if (mens) {
      getProducts("male");
    } else {
      getProducts("female");
    }
  }, [mens]);

  useEffect(() => {
    if (category === "view all") {
      setProducts(data);
    } else if (subCategory !== "") {
      const filteredProducts = data.filter(product => product.subCategory === subCategory);
      setProducts(filteredProducts);
    } else {
      const filteredProducts = data.filter(product => product.category === category);
      setProducts(filteredProducts);
    }
  }, [data, category, subCategory]);
  
  return (
    <div className='flex flex-col gap-5 items-center w-full ml-[200px]'>
      <div className=' flex w-[300px] mt-2'>
        <span className={`${mens ? "border-b-[1px] border-black" : ""} w-1/2 flex justify-center cursor-pointer`}
          onClick={() => setMens(true)}
        >
          Mens
        </span>
        <span className={`${mens ? "" : "border-b-[1px] border-black"} w-1/2 flex justify-center cursor-pointer`}
          onClick={() => setMens(false)}
        >
          Womens
        </span>
      </div>

      {products.length ? (
        <div className='w-full flex flex-wrap gap-2 justify-center px-2'>
          {products.map(product => (
            <HomeProduct 
              key={product._id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  )
}

export default ProductsContainer;
