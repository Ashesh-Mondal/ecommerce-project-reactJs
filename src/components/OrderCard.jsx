import dayjs from "dayjs";
import ProductRow from "./ProductRow";
import { formatMoney } from "../utils/money";

export default function OrderCard({ order }) {
  return (
    <div className="order-container">
      <div className="order-header">
        <div className="order-header-left-section">
          <div className="order-date">
            <div className="order-header-label">Order Placed:</div>
            <div>{dayjs(order.orderTimeMs).format("MMMM DD")}</div>
          </div>
          <div className="order-total">
            <div className="order-header-label">Total:</div>
            <div>{formatMoney(order.totalCostCents)}</div>
          </div>
        </div>

        <div className="order-header-right-section">
          <div className="order-header-label">Order ID:</div>
          <div>{order.id}</div>
        </div>
      </div>

      <div className="order-details-grid">
        {order.products.map((productItem) => {
          return (
            <ProductRow
              key={productItem.product.id}
              productItem={productItem}
            />
          );
        })}
      </div>
    </div>
  );
}
