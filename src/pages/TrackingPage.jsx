import { Link, useParams } from "react-router";
import { Header } from "../components/Header";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import axios from "axios";
import "./TrackingPage.css";

function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  // for an object null and for an array [] empty array
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`
      );
      setOrders(response.data);
    };
    fetchTrackingData();
  }, [orderId]);

  if (!orders) {
    return null;
  }

  const orderProduct = orders.products.find((item) => {
    return item.productId === productId;
  });

  // Tracking Page progress bar calculation
  const totalDeliveryTimeMs =
    orderProduct.estimatedDeliveryTimeMs - orders.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - orders.orderTimeMs;
  // const timePassedMs = totalDeliveryTimeMs * 0.3;
  const progressPercentage = (timePassedMs / totalDeliveryTimeMs) * 100;
  // Cap the value at 100%. It can also be done using if statement but this way it's much more cleaner
  const deliveryPercentage = Math.min(progressPercentage, 100);

  // Condition for the progress bar level css change
  let isPreparing, isShipped, isDelivered;
  if (progressPercentage < 33) {
    isPreparing = true;
  } else if (progressPercentage >= 33 && progressPercentage < 100) {
    isShipped = true;
  } else {
    isDelivered = true;
  }

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png" />
      <title>Tracking Page</title>

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {progressPercentage >= 100 ? "Delivered on " : "Arriving on "}
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
          </div>

          <div className="product-info">{orderProduct.product.name}</div>

          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div
              className={`progress-label ${isPreparing && "current-status"}`}
            >
              Preparing
            </div>
            <div className={`progress-label ${isShipped && "current-status"}`}>
              Shipped
            </div>
            <div
              className={`progress-label ${isDelivered && "current-status"}`}
            >
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackingPage;
