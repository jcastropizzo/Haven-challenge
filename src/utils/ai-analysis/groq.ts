import { logger } from "@/libs/Logger";
import Groq from "groq-sdk";
import { d } from "node_modules/drizzle-kit/index-Z-1TKnbX.mjs";
import { H } from "vitest/dist/chunks/reporters.0x019-V2.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const getAIAnalysis = async (text: string) => {
  // const chatCompletion = await getGroqChatCompletion(text);
  // // Print the completion returned by the LLM.
  // const result = chatCompletion.choices[0]?.message?.content || "";
  // logger.info(result);
  // return result;

  const response = await fetch('https://api.sambanova.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer 3aff173b-4600-425d-b168-8ccd300de64f`
    },
    body: JSON.stringify({
      stream: true,
      model: "DeepSeek-R1-Distill-Llama-70B",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant"
        },
        {
          role: "user",
          content: text
        }
      ]
    })
  })
  logger.info(await response.text());
  return "AI Analysis";
}

const getGroqChatCompletion = (content: string) => {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content,
      },
    ],
    model: "deepseek-r1-distill-llama-70b",
  });
}