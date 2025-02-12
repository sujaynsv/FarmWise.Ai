import React, { useState } from "react";
import "./Chatbot.css";

const API_KEY = "AIzaSyDaOJLsirOjK9yP5QidcySWcReyLSza6zo"; // Store API key in .env file

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: {
              parts: [
                {
                  text: "You are an AI agricultural expert helping smallholder farmers improve their yields with AI insights on crops, pests, and sustainability. The output should be maximum of 100 words keep it short, and give straight to the point and give in points."
                }
              ]
            },
            contents: [{ role: "user", parts: [{ text: input }] }],
            generationConfig: { maxOutputTokens: 500 }
          }),
        }
      );

      const data = await response.json();
      console.log("API Response:", data); // Debugging log

      const botResponse =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from bot";

      // Replace *text* with <b>text</b> for bold
      const formattedResponse = botResponse.replace(/\*(.*?)\*/g, "<b>$1</b>");

      setMessages((prev) => [...prev, { sender: "bot", text: formattedResponse }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Error fetching response." }]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <div className="chatbot-container">
      {!open && (
        <button className="chatbot-toggle" onClick={() => setOpen(true)}>
          💬
        </button>
      )}

      {open && (
        <div className="chatbot-popup">
          <div className="chatbot-header">
            <span>Chat with us</span>
            <button className="close-btn" onClick={() => setOpen(false)}>✖</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender}`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            ))}
            {loading && <div className="message bot">Typing...</div>}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} disabled={loading}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
