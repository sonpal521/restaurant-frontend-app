import  { useState } from "react";
import axiosInstance from "../../config/AxiosInstance"; 
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

 function LoginPopup({ setShowLogin }) {

  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
  
    let endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register";
  
    try {
      const response = await axiosInstance.post(endpoint, data);
  
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
        toast.success("Account created successfully! ");
        window.location.reload();
      } else {
        toast.error(response.data.message); // Show error message from API
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
  
      // Handle 409 Conflict Error (User Already Exists)
      if (error.response?.status === 409) {
        toast.error("User already registered! Please login.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };
  
  

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className="login-popup-inputs">
          {currState !== "Login" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Your Password"
            required
          />
        </div>
        <button  type="submit">{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;
