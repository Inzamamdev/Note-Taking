import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateHeading = async (transcribedText) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(
    `${process.env.BASE_PROMPT}\n\ntranscribedText:${transcribedText}`
  );
  console.log(result.response.text());
  return result.response.text().replace(/\n/g, "").trim();
};
