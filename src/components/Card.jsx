import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
// Card.jsx
const Card = ({ user, address, totalAmount, paymentMethod, items,id }) => {
  return (
    <div className="card my-3" style={{ width: "100%" }}>
      <div className="card-body ">
        <h4 className="card-title  text-white">Ordered by: {user}</h4>
        <p className="card-text text-white">Address: {address}</p>
        <p className="card-text text-white">Payment Method: {paymentMethod}</p>
        <p className="card-text text-white">Total Amount: ₹{totalAmount}</p>
        <h6 className="mt-3 text-white">Items:</h6>
        <ul>
          {items.map((item, index) => (
            <li className="text-white text-capitalize" key={index}>
              {item.productId.name} × {item.quantity}
            </li>
          ))}
        </ul>
        <Link to={`/Order/${id}`} className="buybtn py-2">Proceed</Link>
      </div>
    </div>
  );
};

export default Card;

  

  