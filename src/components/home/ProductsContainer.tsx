import { FunctionComponent, useEffect, useState } from 'react';

import { fetchProducts, Product } from '../../services/funcs';

import HomeProduct from './HomeProduct';
import Search from './Search';
import Colours from './Colours';

interface ProductsContainerProps {
  category: string;
  subCategory: string;
  searchTerm: string;
  setSearchTerm(arg: string): void;
  selectedColour: string;
  setSelectedColour(arg: string): void;
}

const ProductsContainer: FunctionComponent<ProductsContainerProps> = ({ category, subCategory, searchTerm, setSearchTerm, selectedColour, setSelectedColour }) => {
  const [mens, setMens] = useState(true);
  const [data, setData] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
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
    if (searchTerm.length) return;

    if (category === "view all") {
      if (!selectedColour) {
        setProducts(data);
      } else {
        const filteredProducts = data.filter(product => {
          if (product.colour === selectedColour) {
            return product;
          }
        });
        setProducts(filteredProducts);
      }

    } else if (subCategory !== "") {
      const filteredProducts = data.filter(product => {
        if (product.subCategory === subCategory) {
          if (!selectedColour) {
            return product;
          } else if (selectedColour && product.colour === selectedColour) {
            return product;
          }
        }
      });
      setProducts(filteredProducts);

    } else {
      const filteredProducts = data.filter(product => {
        if (product.category === category) {
          if (!selectedColour) {
            return product;
          } else if (selectedColour && product.colour === selectedColour) {
            return product;
          }
        }
      });
      setProducts(filteredProducts);

    }
  }, [data, category, subCategory, searchTerm, selectedColour]);

  useEffect(() => {
    if (!searchTerm.length) return;

    const alteredSearchTerm = searchTerm.split(" ").join("").split("-").join("");

    const filteredSearchResults = data.filter(product => product.name.toLowerCase().split(" ").join("").split("-").join("").includes(alteredSearchTerm));

    if (selectedColour) {
      const filteredProducts = filteredSearchResults.filter(product => product.colour === selectedColour);
      setProducts(filteredProducts);
    } else {
      setProducts(filteredSearchResults);
    }

  }, [searchTerm, selectedColour])
  
  return (
    <div className='flex flex-col gap-5 items-center w-full ml-[200px]'>
      <div className='flex w-[300px] mt-5'>
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

      <div className='w-full flex justify-between px-5'>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} setSelectedColour={setSelectedColour} />

        <Colours selectedColour={selectedColour} setSelectedColour={setSelectedColour} />
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
