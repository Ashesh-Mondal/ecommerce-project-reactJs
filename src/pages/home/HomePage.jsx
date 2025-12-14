import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import "./HomePage.css";
import ProductsGrid from "./ProductsGrid";

function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   // axios is a liubrary used to fetch data more easily
  //   axios.get("/api/products").then((response) => {
  //     const products = response.data;
  //     setProducts(products);
  //   });
  // }, []);

  // Using async await how to fetch data
  useEffect(() => {
    const fetchHomeData = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    };
    fetchHomeData();
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
              <ProductsGrid
                key={product.id}
                product={product}
                loadCart={loadCart}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HomePage;
