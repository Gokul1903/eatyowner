import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;


const Login = () => {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[message,setMessage]=useState("");
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!email,!password){
            setMessage("Missing parameter");
            return;
        }
        const loginuser={email,password}
        try {
            const response=await fetch(`${API_URL}/auth/Owner_signin`,{
                method:'POST',
                headers:{ "Content-Type": "application/json" },
                body:JSON.stringify(loginuser),
                credentials: 'include'
            });
            const data=await response.json();
            if(data.success){
                setMessage(data.message)
                setEmail("")
                setPassword("")
                navigate("/Home");
            }else {
                setMessage(` ${data.message}`);
              }

        } catch (error) {
            setMessage("Something went wrong. Please try again.");
        }
    }
    return ( 
        <section className="vh-100" >
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black " style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5 rounded-4">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="navbar-brand logo fs-1  text-center" >
                        {/* <img className="rounded-4 " src="src/IMG-20250219-WA0010.jpg" width="75" height="65" alt="Logo" /> */}
                        EATY
                    </p>
                    <p className="text-center text-white h3 fw-bold mb-4 mx-1 mx-md-4 mt-4">
                      Partner Login
                    </p>

                    {message && (
                      <p className="text-center text-danger">{message}</p>
                    )}

                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                      <div className=" flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                        <label
                            className="form-label text-white"
                            htmlFor="form3Example3c"
                          >
                            Your Email
                          </label>
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control custom-input "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          
                        </div>
                      </div>

                      <div className=" flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill ">
                        <label
                            className="form-label text-white"
                            htmlFor="form3Example4c"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control custom-input "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          
                        </div>
                      </div>

                      

                      <div className="d-flex justify-content-center  ">
                        <button  
                          type="submit"
                          className="buybtn py-2 w-100 mt-4"
                        >
                          Login
                        </button>
                        
                        
                      </div>
                    </form>
                  </div>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
     );
}
 
export default Login;