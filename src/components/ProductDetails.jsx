import { useEffect, useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
const API_URL = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const { order, singleorder, updateOrderStatus, cancelOrder } =useContext(GlobalContext);

  const [buttonstate, setButtonState] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    singleorder(id);

    
  }, [id]);

  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
  };

  if (order.length === 0) {
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
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12" key={order._id}>
              <div className="card my-3" style={{ width: "100%" }}>
                <div className="card-body ">
                  <h4 className="card-title  text-white">
                    Ordered by : {order.userId.name}
                  </h4>
                  <p className="card-text text-white">
                    Address : {order.Address}
                  </p>
                  <p className="card-text text-white">
                    Payment Method : {order.paymentMethod}
                  </p>
                  <p className="card-text text-white">
                    Total Amount : ₹{order.totalAmount}
                  </p>
                  <h6 className="mt-3 card-text text-white">Items:</h6>
                  <ul>
                    {order.items.map((item, index) => (
                      <li
                        className="text-white card-text text-capitalize"
                        key={index}
                      >
                        {item.productId.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>

                  <button
  className="btn"
  onClick={async () => {
    const confirmUpdate = window.confirm("Are you sure?");
    if (confirmUpdate) {
      await updateOrderStatus(order._id); // update status in backend and global state
      await singleorder(id); // fetch the latest updated order again
    }
  }}
  disabled={order.status === "delivered" || order.status === "cancelled"}
>
  {order.status === "pending"
    ? "Mark as Food Ready"
    : order.status === "foodready"
    ? "Mark as Delivered"
    : "Delivered"}
</button>


                  <button
                    className=" cancelbtn mt-3"
                    
                    onClick={async () => {
                      const confirmUpdate = window.confirm("Are you sure?");
                      if (confirmUpdate) {
                        await cancelOrder(id);
                        navigate("/Home");
                      }
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
