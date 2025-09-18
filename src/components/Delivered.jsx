import { useEffect, useContext,useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Card from "./Card"
import ProtectedRoute from "./ProtectedRoute";


const Delivered = () => {
  const { orders, fetchOrder } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchdata=async()=>{
      await fetchOrder();
      setLoading()
    }
    fetchdata()
    
    const interval = setInterval(() => {
      fetchOrder();
    }, 5000); 
    return () => clearInterval(interval);
  }, []);
  
  
  if (orders.length === 0) {
    return (
      <section className="py-5">
        <div className="container">
          <div className="row">
            <h1 className="text-center">No Order Delivered </h1>
          </div>
        </div>
      </section>
    );
  }
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
  return (
    <section className="py-5">
      <div className="container">
        <div className="row">
          
        {orders.map((order) => (
    order.status === "delivered"   && (
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
    )
))}
        </div>
      </div>
    </section>
  );
};

export default ()=>(
  <ProtectedRoute>
    <Delivered/>
  </ProtectedRoute>
) ;
