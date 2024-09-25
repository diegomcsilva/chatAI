// const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;
// import { v1beta2 } from "@google-ai/generativelanguage";
// const { GoogleAuth } = require("google-auth-library");
// import { GoogleAuth } from "google-auth-library";
// const MODEL_NAME = "models/text-bison-001";
const API_KEY = "AIzaSyA0dX6z0i0ER125B5t7FLXzVuCxGqp948A"
const GEMINI_API_KEY = API_KEY; // Substitua pela sua chave da API

export const generateContent = async (contents) => {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents
      })
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const data = await response.json();
    console.log(data); // Exibe o resultado no console

    return data;
  } catch (error) {
    console.error('Erro ao gerar conteúdo:', error);
  }
};