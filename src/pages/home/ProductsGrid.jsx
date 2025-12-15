import { useState } from "react";
import axios from "axios";
import { formatMoney } from "../../utils/money";
import CheckmarkIcon from "../../assets/images/icons/checkmark.png";

export default function ProductsGrid({ product, loadCart }) {
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (event) => {
    const selectedQuantity = Number(event.target.value);
    setQuantity(selectedQuantity);
  };

  const handleAddToCart = async () => {
    await axios.post("/api/cart-items", {
      productId: product.id,
      // If both the key and the value has the same name then we can only use the key, this will do the same thing.
      quantity,
    });
    await loadCart();

    setShowAddedMessage(true);

    setTimeout(() => {
      setShowAddedMessage(false);
    }, 2000);
  };

  return (
    <div className="product-container">
      <div className="product-image-container">
        <img className="product-image" src={product.image} />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${product.rating?.stars * 10}.png`}
        />
        <div className="product-rating-count link-primary">
          {/* 
                This is called optional chaining.
                Optional chaining (?.) is a JavaScript feature that lets you safely access deeply nested values without throwing an error when something is undefined or null.
            */}
          {product.rating?.count}
        </div>
      </div>

      {/* toFixed() is a JavaScript method used to get a decimal value up to two decimal places. */}
      <div className="product-price">{formatMoney(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select onChange={handleQuantity} value={quantity}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div
        className="added-to-cart"
        style={{ opacity: showAddedMessage ? 1 : 0 }}
      >
        <img src={CheckmarkIcon} />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}
