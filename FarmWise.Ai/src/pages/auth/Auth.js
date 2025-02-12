import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Auth({ setIsLoggedIn }) {
  const [isSignup, setIsSignup] = useState(false);
  const [user, setUser] = useState({
    name: "",
    dob: "",
    city: "",
    state: "",
    phone: "",
    email: "",
    password: "",
    repassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSignup && user.password !== user.repassword) {
      alert("Passwords do not match!");
      return;
    }

    const url = isSignup ? "http://localhost:5000/Sup" : "http://localhost:5000/login";

    try {
      const response = await axios.post(url, user);
      if (response.status === 200 || response.status === 201) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userDob", user.dob);
        localStorage.setItem("userCity", user.city);
        localStorage.setItem("userState", user.state);
        localStorage.setItem("userPhone", user.phone);
        navigate("/");
      } else {
        alert(response.data);
      }
    } catch (err) {
      console.error("Auth Error:", err);
      alert("Authentication failed!");
    }
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold mb-4">{isSignup ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {isSignup && (
          <>
            <input type="text" name="name" placeholder="Full Name" value={user.name} onChange={handleChange} className="block w-80 mx-auto p-2 border" required />
            <input type="date" name="dob" placeholder="Date of Birth" value={user.dob} onChange={handleChange} className="block w-80 mx-auto p-2 border" required />
            <input type="text" name="city" placeholder="City" value={user.city} onChange={handleChange} className="block w-80 mx-auto p-2 border" required />
            <input type="text" name="state" placeholder="State" value={user.state} onChange={handleChange} className="block w-80 mx-auto p-2 border" required />
            <input type="tel" name="phone" placeholder="Phone Number" value={user.phone} onChange={handleChange} className="block w-80 mx-auto p-2 border" required />
          </>
        )}
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} className="block w-80 mx-auto p-2 border" required />
        <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} className="block w-80 mx-auto p-2 border" required />
        
        {isSignup && (
          <>
            <input type="password" name="repassword" placeholder="Re-enter Password" value={user.repassword} onChange={handleChange} className="block w-80 mx-auto p-2 border" required />
            {user.password && user.repassword && user.password !== user.repassword && (
              <p className="text-red-500 text-sm">Passwords do not match</p>
            )}
          </>
        )}

        <button type="submit" className="bg-blue-500 px-4 py-2 w-full" disabled={isSignup && user.password !== user.repassword}>
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>
      <p className="mt-4">
        {isSignup ? "Already have an account?" : "Don't have an account?"}
        <button onClick={() => setIsSignup(!isSignup)} className="text-blue-500 ml-2">
          {isSignup ? "Login" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}
