require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
async function run() {
    console.log("Testing models...");
    const models = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-pro", "gemini-1.5-pro"];
    for (const m of models) {
        try {
            const model = genAI.getGenerativeModel({ model: m });
            await model.generateContent("hi");
            console.log("\n✅ " + m + " worked!");
            return;
        } catch(e) {
            console.error("\n❌ " + m + " error: " + e.status + " " + e.message);
        }
    }
}
run();
