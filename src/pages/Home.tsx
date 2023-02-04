import { useState } from 'react';

import Sidebar from "../components/Sidebar";
import ProductsContainer from '../components/ProductsContainer';

const Home = () => {
  const [category, setCategory] = useState("view all");
  const [subCategory, setSubCategory] = useState("");

  return (
    <div className='flex pt-10'>
      <Sidebar 
        setCategory={setCategory} 
        setSubCategory={setSubCategory} 
        category={category}
        subCategory={subCategory}
      />
      <ProductsContainer 
        category={category}
        subCategory={subCategory}
      />
    </div>
  );
}

export default Home;
