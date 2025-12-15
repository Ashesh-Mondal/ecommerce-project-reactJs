import dayjs from "dayjs";
import { Link } from "react-router";
import axios from "axios";
import BuyAgainIcon from "../../assets/images/icons/buy-again.png";

export default function ProductRow({ productItem, order, loadCart }) {
  const addToCart = async () => {
    await axios.post("/api/cart-items", {
      productId: productItem.productId,
      quantity: 1,
    });
    await loadCart();
  };

  // const addToCart = () => {
  //   console.log(productItem);
  // };

  return (
    <>
      <div className="product-image-container">
        <img src={productItem.product.image} />
      </div>

      <div className="product-details">
        <div className="product-name">{productItem.product.name}</div>
        <div className="product-delivery-date">
          Arriving on:{" "}
          {dayjs(productItem.estimatedDeliveryTimeMs).format("MMMM DD")}
        </div>
        <div className="product-quantity">Quantity: {productItem.quantity}</div>
        <button className="buy-again-button button-primary">
          <img className="buy-again-icon" src={BuyAgainIcon} />
          <span className="buy-again-message" onClick={addToCart}>
            Add to Cart
          </span>
        </button>
      </div>

      <div className="product-actions">
        <Link to={`/tracking/${order.id}/${productItem.product.id}`}>
          <button className="track-package-button button-secondary">
            Track package
          </button>
        </Link>
      </div>
    </>
  );
}
