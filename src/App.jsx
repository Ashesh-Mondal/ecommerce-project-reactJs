import axios from "axios";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/home/HomePage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import OrdersPage from "./pages/orders/OrdersPage";
import TrackingPage from "./pages/TrackingPage";
import PageNotFound from "./pages/PageNotFound";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const loadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };
  useEffect(() => {
    loadCart();
  }, []);

  return (
    <>
      <Routes>
        {/* 
          path is the URL path of the page that we want to route 
          element is the component that we want to load
          This tells react that whenever we use only '/' in the url then open this HomePage component
          path="/" is same as that of index
        */}
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
        <Route
          path="/checkout"
          element={<CheckoutPage cart={cart} loadCart={loadCart} />}
        />
        <Route path="/orders" element={<OrdersPage cart={cart} />} />
        <Route
          path="/tracking/:orderId/:productId"
          element={<TrackingPage cart={cart} />}
        />

        <Route path="*" element={<PageNotFound cart={cart} />} />
      </Routes>
    </>
  );
}

export default App;
