import { GoogleGenerativeAI,  HarmCategory,
  HarmBlockThreshold,
  Part, } from "@google/generative-ai";

// const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;
// import { v1beta2 } from "@google-ai/generativelanguage";
// const { GoogleAuth } = require("google-auth-library");
// import { GoogleAuth } from "google-auth-library";
// const MODEL_NAME = "models/text-bison-001";
const API_KEY = "AIzaSyA0dX6z0i0ER125B5t7FLXzVuCxGqp948A"

// const apiKey = process.env.GEMINI_API_KEY;
const apiKey = API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const generateContent = async (newContents: [], newPrompt: string) => {
  try {
    // const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     contents
    //   })
    // });

    // if (!response.ok) {
    //   throw new Error(`Erro: ${response.status}`);
    // }

    // const data = await response.json();
    // console.log(data); // Exibe o resultado no console

    const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: newContents.length ? newContents : [],
    });

    const result = await chatSession.sendMessage(newPrompt);

    return result.response.text();
    
  } catch (error) {
    console.error('Erro ao gerar conteúdo:', error);
  }
};