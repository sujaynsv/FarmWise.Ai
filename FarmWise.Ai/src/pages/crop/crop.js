import React, { useState,useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../../i18n";
import "./crop.css";
import Header from "../../components/Header/Header";
    
const Crop = () => {
  const { t,i18n } = useTranslation();
  const [load, setLoad] = useState(false);
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [ph, setPh] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [prediction, setPrediction] = useState("");
  const [botResponse, setBotResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const lang=i18n.language;
  function onSearchSubmit() {
    setLoad(true);
    let url = "http://127.0.0.1:5004/recommend-crop";
    let body = JSON.stringify({
      N: parseFloat(nitrogen),
      P: parseFloat(phosphorus),
      K: parseFloat(potassium),
      temperature: parseFloat(temperature),
      humidity: parseFloat(humidity),
      ph: parseFloat(ph),
      rainfall: parseFloat(rainfall),
      lang: lang,
    });

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: body,
    })
      .then((response) => response.json())
      .then((data) => {
        setPrediction(data.prediction);
        callGeminiAPI(data.prediction);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoad(false);
      });
  }

  async function callGeminiAPI(cropPrediction) {
    setLoading(true);
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
                parts: [{
                 text: `Explain why ${cropPrediction} is a good choice based on the soil and environmental conditions, which include:  
- pH: ${ph}  
- Nitrogen: ${nitrogen}  
- Phosphorus: ${phosphorus}  
- Potassium: ${potassium}  
- Temperature: ${temperature}  
- Humidity: ${humidity}  
- Rainfall: ${rainfall}  

Additionally, suggest the three best fertilizers for optimal growth, along with their recommended quantities.  

### Fertilizers  
1. **[Fertilizer 1]** – [Quantity] – [Purpose]  
2. **[Fertilizer 2]** – [Quantity] – [Purpose]  
3. **[Fertilizer 3]** – [Quantity] – [Purpose]  

These quantities are approximate and may need adjustment based on soil testing and plant growth.
in 150 words`

                }],
              },
            ],
            generationConfig: { maxOutputTokens: 200 },
          }),
        }
      );
      const data = await response.json();
      const botResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from bot";
      setBotResponse(botResponse);
    } catch (error) {
      console.error("Error fetching explanation from Gemini API:", error);
    }
    setLoading(false);
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

      <section className="bg-gray-100 py-14 flex items-center justify-center min-h-screen">
        <div className="container bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <p className="text-3xl font-semibold text-green-600 text-center mb-8">
            {t("title_crop_recommendation")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input onChange={(e) => setNitrogen(e.target.value)} placeholder={t("nitrogen_placeholder")} className="input-field" />
            <input onChange={(e) => setPhosphorus(e.target.value)} placeholder={t("phosphorus_placeholder")} className="input-field" />
            <input onChange={(e) => setPotassium(e.target.value)} placeholder={t("potassium_placeholder")} className="input-field" />
            <input onChange={(e) => setTemperature(e.target.value)} placeholder={t("temperature_placeholder")} className="input-field" />
            <input onChange={(e) => setHumidity(e.target.value)} placeholder={t("humidity_placeholder")} className="input-field" />
            <input onChange={(e) => setPh(e.target.value)} placeholder={t("ph_placeholder")} className="input-field" />
            <input onChange={(e) => setRainfall(e.target.value)} placeholder={t("rainfall_placeholder")} className="input-field" />
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={onSearchSubmit}
              className="submit-btn w-full md:w-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white py-3 px-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              {t("predict_button_crop_recommendation")}
            </button>
          </div>
          {load ? (
            <p className="text-center text-green-600 mt-4">{t("loading")}</p>
          ) : (
            prediction && (
              <div className="text-center text-xl font-semibold text-green-600 mt-6">
                <p>{t("predicted_crop")}</p>
                <ul>
                  {prediction.map((crop, index) => (
                    <li key={index} className="mt-2">🌱 {crop}</li>
                  ))}
                </ul>
              </div>
            )
          )}
          {botResponse && (
            <div className="bot-response mt-6">
              <p className="text-center text-xl font-semibold text-green-600">{t("ai_explanation")}</p>
              <p className="text-center">{botResponse}</p>
            </div>
          )}
          {loading && <p className="text-center text-green-600">AI is processing your request...</p>}
        </div>
      </section>
    </>
  );
};

export default Crop;