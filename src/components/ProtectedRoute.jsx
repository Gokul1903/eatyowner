import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { ownerProfile, fetchOwnerProfile, errmessage } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await fetchOwnerProfile();
      setLoading(false);
    };
    checkAuth();
  }, []);

  // Show spinner while checking auth
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <div className="spinner-border logo" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // If unauthorized or not logged in
  if (!ownerProfile || errmessage === "Unauthorized" || errmessage === "Invalid Token") {
    return (
      <section className="py-5 text-center">
        <h2>You must login to use this platform.</h2>
        
      </section>
    );
  }

  // Otherwise render page
  return children;
};

export default ProtectedRoute;
