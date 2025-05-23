import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import CardList from "./components/CardList";
import ProductDetails from "./components/ProductDetails";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
// import Register from "./authComponent/register";

import Login from "./authComponent/login";

import NotFound from "./components/NotFound";
import Delivered from "./components/Delivered";
import Products from "./components/Products";
import UpdateProduct from "./components/Update";
import AddProduct from "./components/Addproduct";


const MainLayout=()=>{
  return(<div className="container ">
        <div className="row">
        <Navbar />
        <Routes>
          <Route path="/Home" element={<CardList />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/Delivered" element={<Delivered />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/Order/:id" element={<ProductDetails/>} />
          <Route path="*" element={<NotFound/>} />

        </Routes>
        </div>
      </div>
      )
  
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
          
          
          <Route path="/" element={<Login/>} ></Route>
          
          <Route path="/*" element={<MainLayout/>} ></Route>
          
        </Routes>
      
    </BrowserRouter>
  );
}



export default App;
