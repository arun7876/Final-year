require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());

// Initialize Google Gemini API
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "YOUR_GEMINI_API_KEY_HERE";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Helper: sleep for ms milliseconds
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

app.get("/", (req, res) => res.json({ status: "AI Chat Server running on port 5001 (Google Gemini)" }));

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ reply: "No message provided." });
    }

    if (GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
        return res.status(500).json({
            reply: "❌ API key not configured. Please add GEMINI_API_KEY to your .env file.",
        });
    }

    // Retry up to 3 times on failure
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            // "gemini-2.5-flash" is the latest model accessible with this key
            const model = genAI.getGenerativeModel({
                model: "gemini-2.5-flash",
                systemInstruction: "You are a helpful healthcare chatbot. Provide accurate medical information and be friendly. Keep responses concise and practical."
            });

            const result = await model.generateContent(userMessage);
            const response = await result.response;
            const reply = response.text();

            console.log(`[OK] Reply sent (attempt ${attempt})`);
            return res.json({ reply });

        } catch (error) {
            console.error(`[Attempt ${attempt}/3] Error:`, error.message);

            if (attempt < 3) {
                // Wait 2 seconds before retry
                await sleep(2000);
                continue;
            }

            console.error("Full error:", error);
            return res.json({
                reply: "⚠️ Connection error or API issue. Please try again.",
            });
        }
    }
});

const axios = require("axios");

app.post("/hospitals", async (req, res) => {
  console.log("RECEIVED:", req.body);

  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    console.log("Missing coordinates");
    return res.json([]);
  }

  // For demo purposes, return mock hospital data
  // TODO: Replace with real Overpass API when it becomes more reliable
  console.log("Returning mock hospital data for demo");
  const mockHospitals = [
    {
      id: 1,
      name: "City General Hospital",
      lat: parseFloat(latitude) + 0.01,
      lon: parseFloat(longitude) + 0.01,
      address: "123 Main St, City Center",
      emergency: "Yes",
      type: "General"
    },
    {
      id: 2,
      name: "Regional Medical Center",
      lat: parseFloat(latitude) - 0.005,
      lon: parseFloat(longitude) - 0.005,
      address: "456 Health Ave, Medical District",
      emergency: "Yes",
      type: "General"
    },
    {
      id: 3,
      name: "Community Health Clinic",
      lat: parseFloat(latitude) + 0.008,
      lon: parseFloat(longitude) - 0.003,
      address: "789 Care Blvd, Downtown",
      emergency: "Unknown",
      type: "Clinic"
    },
    {
      id: 4,
      name: "Emergency Care Center",
      lat: parseFloat(latitude) - 0.002,
      lon: parseFloat(longitude) + 0.007,
      address: "321 Urgent St, Emergency District",
      emergency: "Yes",
      type: "Emergency"
    }
  ];

  console.log("Returning hospitals:", mockHospitals.length);
  res.json(mockHospitals);
});


app.listen(5001, () => {
    console.log("✅ Server running on port 5001 (Google Gemini)");
});
