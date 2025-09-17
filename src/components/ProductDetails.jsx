import { useEffect, useContext, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const API_URL = import.meta.env.VITE_API_URL;

const ProductDetails = () => {
  const { id } = useParams();
  const { order, singleorder, updateOrderStatus, cancelOrder,errmessage } = useContext(GlobalContext);


  const navigate = useNavigate();

  useEffect(() => {
    singleorder(id);
  }, [id]);

  // Show spinner while order is loading
  if (!order || !order.items) {
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
  if(errmessage==="Unauthorized" || errmessage==="Invalid Token"){
    return(
      <section className="py-5">
      <div className="container">
        <div className="row">
          <h1 className="text-center">Unauthorized</h1>
        </div>
      </div>
    </section>
    )
  }

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12" key={order._id}>
            <div className="card my-3" style={{ width: "100%" }}>
              <div className="card-body">
                <h4 className="card-title text-white">
                  Ordered by : {order?.userId?.name || "Unknown User"}
                </h4>
                <p className="card-text text-white">
                  Address : {order?.Address || "N/A"}
                </p>
                <p className="card-text text-white">
                  Payment Method : {order?.paymentMethod || "N/A"}
                </p>
                <p className="card-text text-white">
                  Total Amount : ₹{order?.totalAmount || 0}
                </p>

                <h6 className="mt-3 card-text text-white">Items:</h6>
                <ul>
                  {Array.isArray(order.items) &&
                    order.items.map((item, index) => {
                      const productName = item?.productId?.name || "Unknown product";
                      const quantity = item?.quantity || 0;
                      return (
                        <li
                          className="text-white card-text text-capitalize"
                          key={index}
                        >
                          {productName} × {quantity}
                        </li>
                      );
                    })}
                </ul>

                <button
                  className="btn"
                  onClick={async () => {
                    const confirmUpdate = window.confirm("Are you sure?");
                    if (confirmUpdate) {
                      await updateOrderStatus(order._id);
                      await singleorder(id);
                    }
                  }}
                  disabled={
                    order.status === "delivered" || order.status === "cancelled"
                  }
                >
                  {order.status === "pending"
                    ? "Accept"
                    : order.status === "accepted"
                    ? "Mark as Food Ready"
                    : order.status === "foodready"
                    ? "Mark as Delivered"
                    : "Delivered"}
                </button>

                <button
                  className="cancelbtn mt-3"
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
  );
};

export default ProductDetails;
