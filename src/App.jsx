import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import TrackingPage from "./pages/TrackingPage";
import "./App.css";

function App() {
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
        <Route index element={<HomePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
      </Routes>
    </>
  );
}

export default App;
