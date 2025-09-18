import { useEffect, useContext } from "react";
import ProductCard from "./ProductCard";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const Products = () => {
  const { products, fetchProduct } = useContext(GlobalContext);

  useEffect(() => {
    fetchProduct(); // fetch products on mount
  }, []);

  // If no products
  if (products.length === 0) {
    return (
      <section className="py-5">
        <div className="container">
          <div className="row">
            <h1 className="text-center">No Product Available</h1>
            <Link className="add-btn" to={"/add"}>
              <i className="bi bi-bag-plus-fill"></i>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Render products
  return (
    <section className="py-5">
      <div className="container">
        <div className="row">
          {products.map((card) => (
            <div className="col-md-3" key={card._id}>
              <ProductCard
                title={card.name}
                price={card.price}
                id={card._id}
                shopid={card.ShopId}
                availability={card.availability}
                image={card.image}
              />
            </div>
          ))}
          <Link className="add-btn" to={"/add"}>
            <i className="bi bi-bag-plus-fill"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default () => (
  <ProtectedRoute>
    <Products />
  </ProtectedRoute>
);
