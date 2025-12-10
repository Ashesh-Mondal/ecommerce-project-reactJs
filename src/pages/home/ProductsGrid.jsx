
import { formatMoney } from "../../utils/money";
import CheckmarkIcon from "../../assets/images/icons/checkmark.png";

export default function ProductsGrid({ id, name, image, rating, price }) {
  return (
    <div key={id} className="product-container">
      <div className="product-image-container">
        <img className="product-image" src={image} />
      </div>

      <div className="product-name limit-text-to-2-lines">{name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${rating?.stars * 10}.png`}
        />
        <div className="product-rating-count link-primary">
          {/* 
                This is called optional chaining.
                Optional chaining (?.) is a JavaScript feature that lets you safely access deeply nested values without throwing an error when something is undefined or null.
            */}
          {rating?.count}
        </div>
      </div>

      {/* toFixed() is a JavaScript method used to get a decimal value up to two decimal places. */}
      <div className="product-price">{formatMoney(price)}</div>

      <div className="product-quantity-container">
        <select>
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

      <div className="added-to-cart">
        <img src={CheckmarkIcon} />
        Added
      </div>

      <button className="add-to-cart-button button-primary">Add to Cart</button>
    </div>
  );
}
