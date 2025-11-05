import axios from "axios";
import Constants from "expo-constants";

const API_KEY = Constants.expoConfig?.extra?.EXPO_PUBLIC_GEMINI_API_KEY;

/**
 * Envía una pregunta al modelo Gemini y devuelve la respuesta como texto.
 * @param pregunta Texto que el usuario envía al modelo.
 * @returns Respuesta generada por Gemini.
 */
export async function consultarGemini(pregunta: string): Promise<string> {
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [{ parts: [{ text: pregunta }] }]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": API_KEY
        }
      }
    );

    const texto = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    return texto || "No se recibió respuesta del modelo.";
  } catch (error: any) {
    console.error("Error al consultar Gemini:", error);
    return "Ocurrió un error al comunicarse con la IA.";
  }
}
