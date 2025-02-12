import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpApi) // Load translations via HTTP
  .use(LanguageDetector) // Detect browser language
  .use(initReactI18next) // Bind to React
  .init({
    supportedLngs: ["en", "hi","te","mr","bn"], // Supported languages
    fallbackLng: "en", // Default language
    detection: {
      order: ["localStorage", "cookie", "navigator"],
      caches: ["localStorage", "cookie"],
    },
    backend: {
      loadPath: "/locales/{{lng}}.json",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
