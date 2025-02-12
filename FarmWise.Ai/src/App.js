import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Crop from "./pages/crop/crop";
import Disease from "./pages/disease/disease";
import CropYieldPrediction from "./pages/yeild/yeild";
import Header from "./components/Header/Header";
import PestDetection from "./pages/pest/PestDetection";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer/footer";
import Auth from "./pages/auth/Auth";
import Profile from "./pages/Profile";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    if (storedLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crop" element={isLoggedIn ? <Crop />:<Navigate to="/login" />} />
        <Route path="/disease" element={isLoggedIn ?<Disease />:<Navigate to="/login" />} />
        <Route path="/login" element={<Auth setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}/>
        {/* Protected Routes */}
        <Route
          path="/yield"
          element={isLoggedIn ? <CropYieldPrediction /> : <Navigate to="/login" />}
        />
        <Route
          path="/detect"
          element={isLoggedIn ? <PestDetection /> : <Navigate to="/login" />}
        />
      </Routes>
      <Chatbot />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
