import dayjs from "dayjs";
import BuyAgainIcon from "../assets/images/icons/buy-again.png";

export default function ProductRow({ productItem }) {
  return (
    <>
      <div className="product-image-container">
        <img src={productItem.product.image} />
      </div>

      <div className="product-details">
        <div className="product-name">{productItem.product.name}</div>
        <div className="product-delivery-date">
          Arriving on: {dayjs(productItem.estimatedDeliveryTimeMs).format("MMMM DD")}
        </div>
        <div className="product-quantity">Quantity: {productItem.quantity}</div>
        <button className="buy-again-button button-primary">
          <img className="buy-again-icon" src={BuyAgainIcon} />
          <span className="buy-again-message">Add to Cart</span>
        </button>
      </div>

      <div className="product-actions">
        <a href="/tracking">
          <button className="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    </>
  );
}
