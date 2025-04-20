import { useEffect, useContext, useRef, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Card from "./Card";

const CardList = () => {
  const { orders, fetchOrder, errmessage } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);

  const [oldLength, setOldLength] = useState(0);
  const [newLength, setNewLength] = useState(0);
  const alarm = useRef(new Audio("/alarm.mp3"));

  // Load audio on mount
  useEffect(() => {
    alarm.current.volume = 1.0;
    alarm.current.load();
  }, []);

  // Fetch orders periodically
  useEffect(() => {
    const fetchdata=async()=>{
      await fetchOrder();
      setLoading(false)
    }
    fetchdata()
    

    const interval = setInterval(() => {
      fetchOrder();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Update newLength when orders change
  useEffect(() => {
    setNewLength(orders.length);
  }, [orders]);

  // Compare newLength and oldLength
  useEffect(() => {
    if (newLength > oldLength && orders.length !== 0) {
      
      alarm.current.play().catch((err) => {
        console.error("❌ Failed to play alarm:", err);
      });

      // Optional: You can trigger browser notification too

    }

    setOldLength(newLength); // update oldLength after comparison
  }, [newLength]);

  // Ask notification permission once
  

  // Unauthorized
  if (errmessage === "Unauthorized" || errmessage === "Invalid Token") {
    return (
      <section className="py-5">
        <div className="container">
          <div className="row">
            <h1 className="text-center">Unauthorized</h1>
          </div>
        </div>
      </section>
    );
  }

  // Loading
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

  if (orders.length === 0) {
    return (
      <section className="py-5">
        <div className="container">
          <div className="row">
            <h1 className="text-center">No Order Available</h1>
          </div>
        </div>
      </section>
    );
  }

  // UI
  return (
    <section className="py-5">
      <div className="container">
        <div className="row">
          {orders.filter((order) => order.status !== "delivered").length > 0 ? (
            orders.map((order) =>
              order.status !== "delivered" ? (
                <div className="col-md-6" key={order._id}>
                  <Card
                    user={order.userId.name}
                    address={order.Address}
                    totalAmount={order.totalAmount}
                    paymentMethod={order.paymentMethod}
                    items={order.items}
                    id={order._id}
                  />
                </div>
              ) : null
            )
          ) : (
            
                <section className="py-5">
                  <div className="container text-center text-white ">
                    <h2>No order history</h2>
                  </div>
                </section>
              
            
          )}
        </div>
      </div>
    </section>
  );
};

export default CardList;
