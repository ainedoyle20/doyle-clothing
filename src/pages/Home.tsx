import { useState } from 'react';

import Sidebar from "../components/home/Sidebar";
import ProductsContainer from '../components/home/ProductsContainer';

const Home = () => {
  const [category, setCategory] = useState("view all");
  const [subCategory, setSubCategory] = useState("");

  // useEffect(() => {
  //   const createOrGetUserProfile = async () => {
  //     const doc = {
  //       _id: "1234myid",
  //       _type: "user",
  //       userCart: []
  //     }

  //     try {
  //       const res = await client.createIfNotExists(doc);
  //       console.log("res: ", res);
  //     } catch (error) {
  //       console.log("Error creating user document: ", error);
  //     }
  //   }

  //   createOrGetUserProfile();
  // }, []);

  return (
    <div className='flex pt-10 w-screen min-h-screen'>
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
