import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Home />} />

        <Route path=":productId" element={<ProductDetails />} />

      </Route>
    </Routes>
  );
}

export default App;
