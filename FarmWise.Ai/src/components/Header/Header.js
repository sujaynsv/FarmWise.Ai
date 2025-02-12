import React,{useState} from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../i18n"; // Import i18n configuration
import Farm from "../img/Farm.png";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState();
  const { t, i18n } = useTranslation();

  // Get user name from localStorage
  const userName = localStorage.getItem("userName");

  // Function to toggle language
  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userDob");
    localStorage.removeItem("userCity");
    localStorage.removeItem("userState");
    localStorage.removeItem("userPhone");
    navigate("/");
  };

  return (
    <div className="header-container">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo Section */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer space-x-3"
        >
          <img src={Farm} className="logoWeb" alt="FarmWise Logo" />
          <h3 className="text-2xl font-bold text-[#219653] opacity-[.85]">
            FarmWise.ai
          </h3>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <ul className="nav-links">
            <li onClick={() => navigate("/")} className="nav-item">
              {t("home")}
            </li>
            <li onClick={() => navigate("/crop")} className="nav-item">
              {t("crop_recommendation")}
            </li>
            <li onClick={() => navigate("/disease")} className="nav-item">
              {t("crop_disease")}
            </li>
            <li onClick={() => navigate("/yield")} className="nav-item">
              {t("crop_yield")}
            </li>
            <li onClick={() => navigate("/detect")} className="nav-item">
              {t("pest_detection")}
            </li>
          </ul>

          {/* Language Selector */}
          <div className="dropdown-container">
            <select
              value={i18n.language}
              onChange={changeLanguage}
              className="custom-select"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="te">తెలుగు</option>
              <option value="mr">मराठी</option>
              <option value="bn">বাংলা</option>
            </select>
          </div>

          {/* Profile & Logout Dropdown */}
          {isLoggedIn ? (
            <div className="relative">
             <button
  onClick={() => setShowDropdown(!showDropdown)}
  className="ml-4 bg-green-500 px-3 py-1 text-white rounded flex items-center space-x-2"
>
  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="User" className="w-7 h-7 rounded-full" />
  </div>
  <span>{userName}</span>
  <span>⌄</span>
</button>


              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 shadow-lg rounded-lg">
                  <button
                    onClick={() => navigate("/profile")}
                    className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 w-full text-left hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="ml-4 bg-blue-500 px-3 py-1 text-white rounded"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
