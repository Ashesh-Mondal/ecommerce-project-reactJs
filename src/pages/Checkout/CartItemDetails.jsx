import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/money";

export default function CartItemDetails({ cartItem, loadCart }) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateQuantity, setUpdateQuantity] = useState(cartItem.quantity);

  const updateQuantityInput = (e) => {
    setUpdateQuantity(e.target.value);
  };

  const handleUpdateButton = () => {
    setIsUpdate(true);
  };

  const handleUpdateOnKeyPress = async (e) => {
    if (e.key === "Enter") {
      await handleSaveButton();
    } else if (e.key === "Escape") {
      setUpdateQuantity(cartItem.quantity);
      setIsUpdate(false);
    }
  };

  const handleSaveButton = async () => {
    setIsUpdate(false);
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity: Number(updateQuantity),
    });
    await loadCart();
  };

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />
      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {isUpdate && (
              <input
                type="text"
                style={{ width: "50px", outline: "none" }}
                value={updateQuantity}
                onChange={updateQuantityInput}
                onKeyDown={handleUpdateOnKeyPress}
              />
            )}
            <span className="quantity-label">{cartItem.quantity}</span>
          </span>
          <span
            className="update-quantity-link link-primary"
            style={{ display: isUpdate ? "none" : "inline-block" }}
            onClick={handleUpdateButton}
          >
            Update
          </span>
          <span
            className="update-quantity-link link-primary"
            style={{ display: isUpdate ? "inline-block" : "none" }}
            onClick={handleSaveButton}
          >
            Save
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
