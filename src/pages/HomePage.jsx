import axios from "axios";
import { Header } from "../components/Header";
import { products } from "../../starting-code/data/products";
import Product from "../components/Product";
import "./HomePage.css";

function HomePage() {
  // axios is a liubrary used to fetch data more easily
  axios.get("http://localhost:3000/api/products").then((response) => {
    console.log(response.data);
  });

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
      <title>Ecommerce Project</title>

      <Header />

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
