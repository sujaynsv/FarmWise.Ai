import React from "react";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { useTranslation } from "react-i18next"; // Import i18n hook
import "./footer.css";

const Footer = () => {
  const { t } = useTranslation(); // Initialize translation hook

  return (
    <div className="bg-[#219653] py-10">
      <div className="flex flex-col lg:flex-row justify-between items-start text-white px-16 gap-16">
        {/* Logo and Description */}
        <div className="mb-6 lg:mb-0 lg:w-2/5">
          <h1 className="text-2xl font-bold">FarmWise.ai</h1>
          <p className="text-lg mt-2">{t("footer.slogan")}</p>
          <p className="text-base mt-4">{t("footer.description")}</p>
        </div>

        {/* Features Section */}
        <div className="mb-6 lg:mb-0 lg:w-2/5">
          <h2 className="text-xl font-bold">{t("footer.features")}</h2>
          <ol className="mt-4 text-left list-decimal pl-5">
            <li className="mb-2">
              <span className="font-medium">{t("footer.crop_recommendation.title")}: </span> 
              {t("footer.crop_recommendation.description")}
            </li>
            <li className="mb-2">
              <span className="font-medium">{t("footer.crop_disease.title")}: </span> 
              {t("footer.crop_disease.description")}
            </li>
            <li className="mb-2">
              <span className="font-medium">{t("footer.crop_yield.title")}: </span> 
              {t("footer.crop_yield.description")}
            </li>
            <li className="mb-2">
              <span className="font-medium">{t("footer.pest_detection.title")}: </span> 
              {t("footer.pest_detection.description")}
            </li>
          </ol>
        </div>

        {/* Contact Information */}
        <div className="lg:w-1/5">
          <h2 className="text-xl font-bold">💬 {t("footer.contact")}</h2>
          <p className="text-lg mt-2">{t("footer.reach_out")}</p>
          <p className="mt-2 flex items-center">
            <FaWhatsapp className="mr-2" />
            <span className="font-medium">{t("footer.whatsapp")}: </span> +91 9876543321
          </p>
          <p className="mt-2 flex items-center">
            <FaEnvelope className="mr-2" />
            <span className="font-medium">{t("footer.email")}: </span> support@farmwise.ai
          </p>
          <p className="mt-2 flex items-center">
            <FaInstagram className="mr-2" />
            <span className="font-medium">{t("footer.instagram")}: </span>
            <a
              href="https://instagram.com/FarmWise.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 underline ml-1"
            >
              @FarmWise.ai
            </a>
          </p>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="text-center border-t border-white pt-4 mt-6">
        <p className="text-sm">&copy; 2025 {t("footer.rights")}</p>
      </div>
    </div>
  );
};

export default Footer;
