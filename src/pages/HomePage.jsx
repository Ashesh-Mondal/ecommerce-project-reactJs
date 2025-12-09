import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import Product from "../components/Product";
import "./HomePage.css";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    // axios is a liubrary used to fetch data more easily
    axios.get("/api/products").then((response) => {
      const products = response.data;
      setProducts(products);
    });

    axios.get("/api/cart-items").then((response) => {
      const cartData = response.data;
      setCart(cartData);
    });
  }, []);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
      <title>Ecommerce Project</title>

      <Header cart={cart} />

      <div className="home-page">
        <div className="products-grid">
          {products.map((product) => {
            return (
              <Product
                key={product.id}
                name={product.name}
                image={product.image}
                rating={product.rating}
                price={product.priceCents}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HomePage;
