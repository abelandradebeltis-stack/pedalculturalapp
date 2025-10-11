
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: Request) {
  const { prompt, history, interests } = await request.json();

  let systemPrompt = "Você é um assistente de IA amigável e experiente, especializado em sustentabilidade. O seu objetivo é ajudar os utilizadores a adotar um estilo de vida mais sustentável, fornecendo respostas claras, práticas e personalizadas. Responda em português.";

  if (interests && interests.length > 0) {
    systemPrompt += `\n\nO utilizador tem um interesse especial nos seguintes tópicos: ${interests.join(", ")}. Por favor, tente focar as suas respostas nestas áreas sempre que for relevante, mas sem deixar de responder diretamente à pergunta do utilizador.`
  }

  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: systemPrompt,
  });

  const chat = model.startChat({
    history: history || [],
  });

  try {
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    return new Response(JSON.stringify({ text }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
