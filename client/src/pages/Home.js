import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import Bot from "../components/Bot";

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <ProductList />
      <Cart />
      <Bot />
    </div>
  );
};

export default Home;
