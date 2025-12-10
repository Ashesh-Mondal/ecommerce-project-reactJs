import { Header } from "../../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import "./OrdersPage.css";

function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders?expand=products").then((response) => {
      setOrders(response.data);
    });
  }, []);
  return (
    <>
      {/* Since the icon also changes in the titke bar according the page that's the reason why we are using this in every page instead of using it in index.html */}
      <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />
      <title>Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return <OrderCard key={order.id} order={order} />;
          })}
        </div>
      </div>
    </>
  );
}

export default OrdersPage;
