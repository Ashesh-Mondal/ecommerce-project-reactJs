import OrderDetailsGrid from "./OrderDetailsGrid";
import OrderHeader from "./OrderHeader";

export default function OrderCard({ order, loadCart }) {
  return (
    <div className="order-container">
      <OrderHeader order={order} />

      <OrderDetailsGrid order={order} loadCart={loadCart} />
    </div>
  );
}
