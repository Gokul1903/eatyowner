import { useEffect, useContext } from "react";
import ProductCard from "./ProductCard";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

const Products = () => {
  const { products, fetchProduct } = useContext(GlobalContext);

  useEffect(() => {
    fetchProduct();
  }, []);

  // Show full-screen centered spinner when loading
  if (products.length === 0) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <div className="spinner-border logo" role="status">
          <span className="visually-hidden">Loading...</span>
          
        </div>
      </div>
    );
  }

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
          <Link className="add-btn " to={"/add"}><i className="bi bi-bag-plus-fill"></i></Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
