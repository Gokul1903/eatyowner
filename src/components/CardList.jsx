import { useEffect, useContext, useRef, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Card from "./Card";
import ProtectedRoute from "./ProtectedRoute";

const CardList = () => {
  const { orders, fetchOrder, } = useContext(GlobalContext);
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
    if (newLength > oldLength && orders.length !== 0 ) {
      alarm.current.play().catch((err) => {
        console.error("❌ Failed to play alarm:", err);
      });
    }
  
    setOldLength(newLength);
  }, [newLength]);
  



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
      {
        orders.filter((order) => order.status !== "delivered").length > 0 ? (
          orders
            .filter((order) => order.status !== "delivered")
            .reverse()
            .map((order) => (
              <div className="col-md-6" key={order._id}>
                <Card
                  user={order.userId.name}
                  address={order.Address}
                  totalAmount={order.totalAmount}
                  paymentMethod={order.paymentMethod}
                  items={order.items}
                  id={order._id}
                  Phone={order.phone}
                />
              </div>
            ))
        ) : (
          <div className="container text-center text-white py-5">
            <h2>No order history</h2>
          </div>
        )
      }
    </div>
  </div>
</section>

  );
};

export default ()=>(
  <ProtectedRoute>
    <CardList/>
  </ProtectedRoute>
) ;
