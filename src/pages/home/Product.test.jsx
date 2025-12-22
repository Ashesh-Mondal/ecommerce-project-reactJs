import { it, describe, vi, expect, beforeEach } from "vitest";
// Renders a component in a fake web page specifically for testing
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Product from "./Product";

// This mockes the entire axios package
vi.mock("axios");

describe("Product Component", () => {
  let product;
  let loadCart;

  // it's a test hook that runs before each test case
  beforeEach(() => {
    product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };

    // vi.fn() => creates a mock function that doesn't do anything for testing purpose
    loadCart = vi.fn();
  });

  it("display the product details correctly", () => {
    // For testing a component we render the component
    // and for testing a function we run the function
    // render => display the compoenent on a the page

    render(<Product product={product} loadCart={loadCart} />);

    // screen => represents the fake web page where the component is rendered
    // getByText() => a method to find an element by the text it displays
    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
    ).toBeInTheDocument();

    expect(screen.getByText("$10.90")).toBeInTheDocument();

    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg"
    );

    expect(screen.getByText("87")).toBeInTheDocument();

    expect(screen.getByTestId("product-rating-stars-image")).toHaveAttribute(
      "src",
      "images/ratings/rating-45.png"
    );
  });

  it("adds a product to the curt", async () => {
    render(<Product product={product} loadCart={loadCart} />);
    const user = userEvent.setup();
    const addToCartButton = screen.getByTestId("add-to-cart-button");
    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
    });

    expect(loadCart).toHaveBeenCalled();
  });
});
