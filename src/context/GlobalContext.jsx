import { useState, createContext,useRef,useEffect  } from "react";
const API_URL = import.meta.env.VITE_API_URL;
export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]);
  const [errmessage,setMessage]=useState("")
  const [singleproduct,setSingleproduct]=useState("")
  const [ownerProfile, setOwnerProfile] = useState(null);
  

  const fetchOrder = async () => {
    try {
      const response = await fetch(`${API_URL}/owner/order`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
        
      } else {
        console.error("Failed to fetch orders:", data.message);
        setMessage(data.message)
      }
      
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  const fetchOwnerProfile = async () => {
  try {
    const response = await fetch(`${API_URL}/owner/getProfile`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    console.log("Profile response:", data); // 👈 Add this
    if (data.success) {
      setOwnerProfile(data.owner);
    } else {
      setOwnerProfile(null);
    }
  } catch (error) {
    console.error("Error fetching owner profile:", error);
    setOwnerProfile(null);
  }
};

  const singleorder =async (id)=>{
    try {
      const responce = await fetch(`${API_URL}/owner/singleorder/${id}`,{
        method:"GET",
        credentials: "include"
      })
      const data= await responce.json()
      if(data.success){
        setOrder(data.order)
      }else {
        console.error("Failed to fetch orders:", data.message);
      }

    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  const updateOrderStatus = async (id) => {
    try {
      const res = await fetch(`${API_URL}/owner/status/${id}`, {
        method: "PUT",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === id ? { ...order, status: data.status } : order
          )
        );
      } else {
        console.error("Failed to update status:", data.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  

  const cancelOrder = async (id, message) => {
    try {
      const res = await fetch(`${API_URL}/owner/cancelled/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.filter((order) => order._id !== id));
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };
  const fetchProduct =async()=>{
    try {
      const responce=await fetch(`${API_URL}/owner/viewproduct`,{
        method:"GET",
        credentials:"include"
      })
      const data=await responce.json()
      if(data.success){
        setProducts(data.products)

      }
      else {
        console.error( data.message);
      }
    } catch (error) {
      console.error( error);
    }
  }
  const fetchSingle=async(id)=>{
    try {
        const response =await fetch(`${API_URL}/owner/viewproductsingle/${id}`,{
          method:"GET",
          credentials:"include"
        })
        const data=await response.json();
        if(data.success){
            setSingleproduct(data.product)

        }
        else{
            console.error("failed to fetch product :",data.message)
        }
    } catch (error) {
        console.error("error fetching products: ",error)
    }
}

  const addProduct = async (formData) => {
    try {
      const res = await fetch(`${API_URL}/owner/add_product`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => [...prev, data.product]);
      } else {
        console.error("Add failed:", data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const updateProduct = async (formData) => {
    try {
      const res = await fetch(`${API_URL}/owner/update_product`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) =>
          prev.map((p) => (p._id === data.product._id ? data.product : p))
        );
      } else {
        console.error("Update failed:", data.message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const res = await fetch(`${API_URL}/owner/delete_product`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p._id !== productId));
      } else {
        console.error("Delete failed:", data.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <GlobalContext.Provider
  value={{
    products,
    orders,
    fetchOrder,
    fetchProduct,
    updateOrderStatus,
    cancelOrder,
    addProduct,
    updateProduct,
    deleteProduct,
    singleorder,
    order,
    errmessage,
    setOrders,
    singleproduct,
    fetchSingle,
    ownerProfile,
    fetchOwnerProfile
  }}
>
  {children}
</GlobalContext.Provider>

  );
};

export default GlobalProvider;
