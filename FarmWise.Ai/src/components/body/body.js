import "../../index.css";
import "./body.css";
import { useTranslation } from "react-i18next";
import "../../i18n"; // Import i18n configuration
import { useState } from "react";
const Body = () => {
  const { t,i18n} = useTranslation();

  // Function to change language

 // Check if this returns correct text
  

  
  return (
    <div className="body">
  
      <div className="background-image grid place-items-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-white uppercase mb-4 animate__animated animate__fadeIn animate__delay-1s">
            {t("farmers_help")}
          </p>
          <p className="text-6xl font-medium text-green-600 max-w-md mb-4 animate__animated animate__fadeIn animate__delay-2s">
            {t("farmwise")}
          </p>
          <p className="text-2xl font-bold text-white animate__animated animate__fadeIn animate__delay-3s">
            {t("farmers_voice")}
          </p>
        </div>
      </div>
      
      <section className="flex flex-col py-5">
        <div className="grid place-items-center my-14">
          <p className="text-3xl font-bold text-center text-gray-900 uppercase mb-2">
            {t("features_explored")}
          </p>
          <p className="text-xl font-medium text-center text-gray-500 max-w-md">
            {t("features_subtitle")}
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
          <div className="feature-card bg-green-100 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">{t("crop_recommendation_title")}</h3>
            <p className="text-lg text-gray-700">
              {t("crop_recommendation_desc")}
            </p>
          </div>

          <div className="feature-card bg-yellow-100 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold text-yellow-600 mb-4">{t("crop_disease_title")}</h3>
            <p className="text-lg text-gray-700">
              {t("crop_disease_desc")}
            </p>
          </div>

          <div className="feature-card bg-blue-100 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">{t("crop_yield_title")}</h3>
            <p className="text-lg text-gray-700">
              {t("crop_yield_desc")}
            </p>
          </div>
          <div className="feature-card bg-red-100 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold text-red-600 mb-4">{t("pest_detection")}</h3>
            <p className="text-lg text-gray-700">
              {t("pest_detection_desc")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Body;
