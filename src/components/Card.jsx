import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const Card = ({ user, address, totalAmount, paymentMethod, items, id,Phone }) => {
  return (
    <div className="card my-3" style={{ width: "100%" }}>
      <div className="card-body ">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="card-title text-white">{user}</h4>
        
        {Phone && (
    <a
      href={`tel:${Phone}`}
      title="Call Owner"
      className="mb-2"
      style={{
        position: "relative",
        color:"#109009",
        textDecoration: "none",
        
        fontSize: "20px",
        zIndex: 1,
      }}
    >
      <i className="bi bi-telephone-fill"></i>
    </a>
  )}
      </div>
        <p className="card-text text-white">Address: {address}</p>
        <p className="card-text text-white">Payment Method: {paymentMethod}</p>
        <p className="card-text text-white">Total Amount: ₹{totalAmount}</p>
        <h6 className="mt-3 text-white">Items:</h6>
        <ul>
          {Array.isArray(items) &&
            items.map((item, index) => {
              const productName = item?.productId?.name || "Unknown product";
              const quantity = item?.quantity || 0;
              return (
                <li className="text-white text-capitalize" key={index}>
                  {productName} × {quantity}
                </li>
              );
            })}
        </ul>
        <Link to={`/Order/${id}`} className="buybtn py-2">
          Proceed
        </Link>
      </div>
    </div>
  );
};

export default Card;
