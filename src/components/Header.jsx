import { NavLink } from "react-router";
// To use files inside of src/assets we must import it first to use it.
// This is done because Inside src, everything is processed by Webpack/Vite bundler.
// Importing tells the bundler to include the file in our app
import LogoWhite from "../assets/images/logo-white.png";
import MobileLogoWhite from "../assets/images/mobile-logo-white.png";
import CartIcon from "../assets/images/icons/cart-icon.png";
import SearchIcon from "../assets/images/icons/search-icon.png";
import "./Header.css";

export function Header() {
  return (
    <>
      <div className="header">
        <div className="left-section">
          {/* <Link> is used so that the page dosen't get refershed while navigating to another page. React is SPA(Single page Application) */}
          {/* In React we should use <Link> instead o <a> */}
          <NavLink to="/" className="header-link">
            <img className="logo" src={LogoWhite} />
            <img className="mobile-logo" src={MobileLogoWhite} />
          </NavLink>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" />

          <button className="search-button">
            <img className="search-icon" src={SearchIcon} />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src={CartIcon} />
            <div className="cart-quantity">3</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}
