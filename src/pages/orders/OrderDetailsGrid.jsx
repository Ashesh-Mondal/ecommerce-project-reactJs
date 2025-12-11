import ProductRow from "./ProductRow";

export default function OrderDetailsGrid({ order }) {
  return (
    <div className="order-details-grid">
      {order.products.map((productItem) => {
        return (
          <ProductRow
            key={productItem.product.id}
            productItem={productItem}
            order={order}
          />
        );
      })}
    </div>
  );
}
