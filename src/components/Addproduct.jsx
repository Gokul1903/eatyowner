import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
const API_URL = import.meta.env.VITE_API_URL;
const IMG_URI = import.meta.env.VITE_CLOUDINARY_BASE_URL;

const AddProduct = () => {
  const { id } = useParams();
  const { addProduct } = useContext(GlobalContext);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !image) {
      setMessage("Name and price are required.");
      return;
    }

    const formData = new FormData();
    
    formData.append("name", name);
    formData.append("price", price);
    if (image) {
      formData.append("image", image);
    }

    await addProduct(formData);
    setMessage("Product updated successfully!");

    setTimeout(() => {
      navigate("/Products");
    }, 1000);
  };

  
  let imageSrc = "";

if (!image) {
  imageSrc = "/images/no-image.png";
} else if (typeof image === "string") {
  const fileName = image.split('/').pop(); // only if it's a path string
  const ext = image.split('.').pop();
  imageSrc = `${IMG_URI}/eaty-images/${fileName}.${ext}`;
} else {
  imageSrc = URL.createObjectURL(image); // it's a File object
}


  return (
    <section className="d-flex justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="container d-flex justify-content-center">
        <div className="row">
          <div className="col-12">
            <div className="card text-center mx-auto my-3" style={{ width: "100%", maxWidth: "400px", border: "none" }}>
            <img
  className="card-img-top rounded-4 mb-3"
  src={imageSrc}
  style={{ height: "250px", objectFit: "cover" }}
  loading="lazy"
/>

              <div className="nav-bg text-white rounded-bottom-4 p-3">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 text-start">
                    <label htmlFor="name" className="form-label">Product Name</label>
                    <input
                      id="name"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 text-start">
                    <label htmlFor="price" className="form-label">Price (₹)</label>
                    <input
                      id="price"
                      type="number"
                      className="form-control"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 text-start">
                    <label htmlFor="image" className="form-label">Add image</label>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="form-control"
                      onChange={(e) => setImage(e.target.files[0])}
                      required
                    />
                  </div>
                  <button type="submit" className="btn w-100">Add Product</button>
                </form>
                {message && <p className="mt-3 text-white">{message}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
