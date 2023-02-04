import { FunctionComponent, useEffect, useState } from 'react';

interface ProductsContainerProps {
  category: string;
  subCategory: string;
}

const ProductsContainer: FunctionComponent<ProductsContainerProps> = ({ category, subCategory }) => {
  const [mens, setMens] = useState(true);
  const [products, setProducts] = useState([]);
  const [subProducts, setSubProducts] = useState([]);

  useEffect(() => {
    // if (mens) { fetch male } else { fetch female }

    // filter the products.category === category
    // setProducts(filteredProducts)
    
    // dependancy: category
  }, []);

  useEffect(() => {
    // if (subCategory === "view all") {
    //    setSubProducts(products);
    // }

    // filter products.subCategory === subCategory
    // setProducts(filteredProducts)
    
    // dependancy: subCategory
  }, []);

  // if (!subProducts.length) return Loader
  
  return (
    <div>ProductsContainer</div>
  )
}

export default ProductsContainer;
