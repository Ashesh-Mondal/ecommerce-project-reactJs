import { CheckoutHeader } from "./CheckoutHeader";
import { useEffect, useState } from "react";
import OrderSummary from "./OrderSummary";
import axios from "axios";
import "./CheckoutPage.css";
import PaymentSummary from "./PaymentSummary";

function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      const deliveryOptionsResponse = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime"
      );
      setDeliveryOptions(deliveryOptionsResponse.data);
    };
    fetchCheckoutData();
  }, []);

  useEffect(() => {
    const paymentSummaryResponse = async () => {
      const response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);
    };
    paymentSummaryResponse();
  }, [cart]);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />
      {/* Since React shares only a single HTML page i.e the / therefore the title of every single page is given in the top and the title from the index page is removed. */}
      <title>Checkout</title>

      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
          />
          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
