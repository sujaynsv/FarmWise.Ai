import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../../i18n";
import "./disease.css";

const Disease = () => {
  const { t,i18n } = useTranslation();
  const [photo, setPhoto] = useState([]);
  const [load, setLoad] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [botResponse, setBotResponse] = useState("");
  const lang=i18n.language;
  function onClick() {
    setLoad(true);
    let url = "http://127.0.0.1:5003/predict";
    let form = new FormData();
    form.append("file", photo[0]);

    fetch(url, {
      method: "POST",
      headers: { "Access-Control-Allow-Origin": "*" },
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        let main_data = data["data"];
        setPrediction(main_data["prediction"]);
        callGeminiAPI(main_data["prediction"]);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoad(false));
  }

  async function callGeminiAPI(diseasePrediction) {
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDaOJLsirOjK9yP5QidcySWcReyLSza6zo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: `This is the disease: ${diseasePrediction}. Explain the cause and cure of the disease precisely.` }],
              },
            ],
            generationConfig: { maxOutputTokens: 150 },
          }),
        }
      );
      const data = await response.json();
      const botResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from bot";
      translateText(botResponse, lang);
    } catch (error) {
      console.error("Error fetching explanation from Gemini API:", error);
    }
  }

  async function translateText(text, targetLanguage) {
    try {
      const response = await fetch("https://translation.googleapis.com/language/translate/v2?key=AIzaSyAWqg11gQCYgaJrCXCBl9ph4OQiVcHksSs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: text, target: targetLanguage }),
      });
      const data = await response.json();
      setBotResponse(data?.data?.translations?.[0]?.translatedText || text);
    } catch (error) {
      console.error("Error translating text:", error);
      setBotResponse(text);
    }
  }

  useEffect(() => {
    if (botResponse) {
      translateText(botResponse, lang);
    }
  }, [lang]);

  return (
    <>
      
      <section className="bg-gray-100 py-14 min-h-screen flex items-center justify-center">
        <div className="container bg-white p-10 rounded-lg shadow-xl glass-effect w-full max-w-lg">
          <div className="text-center mb-10">
            <p className="text-3xl font-bold text-green-600">{t("upload_title")}</p>
            <p className="text-lg text-gray-600 mt-2">{t("upload_subtitle")}</p>
          </div>
          <input type="file" id="fileUpload" onChange={(e) => setPhoto([e.target.files[0]])} className="file-input" />
          <label htmlFor="fileUpload" className="file-label">📁 <span>{t("select_image")}</span></label>
          {photo.length > 0 && <p className="file-name">📄 {photo[0].name}</p>}
          {photo.length > 0 && <img src={URL.createObjectURL(photo[0])} alt="Uploaded" className="image-preview mt-4" />}
          <button onClick={onClick} className="submit-btn">{t("get_results")}</button>
          
          {load ? <p className="text-lg text-green-600">{t("loading")}</p> : prediction && (
            <div className="prediction-box">
              <p className="prediction-title">{t("disease_prediction")}</p>
              <p className="prediction-result">{prediction}</p>
            </div>
          )}
          {botResponse && (
            <div className="bot-response mt-6">
              <p className="text-xl font-semibold text-green-600">{t("ai_explanation")}</p>
              <p>{botResponse}</p>
            </div>
          )}
        </div>
      </section>

    </>
  );
};

export default Disease;
