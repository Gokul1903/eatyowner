import { useEffect, useContext ,useState} from "react";
import ProductCard from "./ProductCard";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

const Products = () => {
  const { products, fetchProduct } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchdata=async()=>{
      await fetchProduct();
      setLoading(false)
    }
    fetchdata();
    
  }, []);

  // Show full-screen centered spinner when loading
  if (loading) {
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
  if (products.length === 0) {
    return (
      <section className="py-5">
        <div className="container">
          <div className="row">
            <h1 className="text-center">No Product Available</h1>
            <Link className="add-btn " to={"/add"}><i className="bi bi-bag-plus-fill"></i></Link>
          </div>
        </div>
      </section>
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
