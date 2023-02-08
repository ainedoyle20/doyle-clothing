import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Auth from "./pages/Auth";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import Stripe from "./pages/Stripe";
import OrderSummary from "./pages/OrderSummary";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Home />} />

        <Route path=":productId" element={<ProductDetails />} />

        <Route path="auth" element={<Auth />} />

        <Route path="orders" element={<Orders />} />

        <Route path="checkout" >

          <Route index element={<Checkout />} />

          <Route path="payment" element={<Stripe />} />

          <Route path="summary" element={<OrderSummary />} />

        </Route>

      </Route>
    </Routes>
  );
}

export default App;
