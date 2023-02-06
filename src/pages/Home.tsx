import { useState } from 'react';

import Sidebar from "../components/home/Sidebar";
import ProductsContainer from '../components/home/ProductsContainer';

const Home = () => {
  const [category, setCategory] = useState("view all");
  const [subCategory, setSubCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColour, setSelectedColour] = useState("");

  return (
    <div className='flex pt-10 w-screen min-h-screen'>
      <Sidebar 
        setCategory={setCategory} 
        setSubCategory={setSubCategory} 
        category={category}
        subCategory={subCategory}
        setSearchTerm={setSearchTerm}
        setSelectedColour={setSelectedColour}
      />
      <ProductsContainer 
        category={category}
        subCategory={subCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedColour={selectedColour}
        setSelectedColour={setSelectedColour}
      />
    </div>
  );
}

export default Home;
