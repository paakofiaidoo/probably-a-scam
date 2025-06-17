
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AnalysisResult, InputType, RiskRanking } from "../types.ts";
import { GEMINI_MODEL_NAME, GEMINI_SYSTEM_INSTRUCTION } from "../constants.tsx";

// IMPORTANT: API Key Management
// The API key is accessed via `process.env.API_KEY`.
// This variable MUST be pre-configured and accessible in the execution environment.
// For true security in production, API calls should ideally be proxied through a backend server if this frontend code is publicly accessible.

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (!apiKey) {
  console.error("API_KEY is not set. Please ensure the API_KEY environment variable is configured.");
  // The app will proceed but `analyzeContent` will return an error state.
} else {
  try {
    ai = new GoogleGenAI({ apiKey: apiKey });
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI, likely due to an invalid API_KEY format or other critical issue:", error);
    // `ai` remains null, and `analyzeContent` will handle this.
  }
}

const mapRanking = (rankingString: string): RiskRanking => {
  if (rankingString === "Definitely a Scam") return RiskRanking.DEFINITELY_SCAM;
  if (rankingString === "Probably a Scam (Be Careful)") return RiskRanking.PROBABLY_SCAM;
  if (rankingString === "Not a Scam") return RiskRanking.NOT_A_SCAM;
  console.warn(`Unknown ranking string received: ${rankingString}`);
  return RiskRanking.UNKNOWN; // Default or handle as error
};

export const analyzeContent = async (
  inputType: InputType,
  content: string
): Promise<AnalysisResult> => {
  if (!apiKey) {
    return {
      ranking: RiskRanking.UNKNOWN,
      explanation: "Gemini API Key (API_KEY) is not configured. Please ensure the environment variable is set."
    };
  }
  if (!ai) {
     return {
      ranking: RiskRanking.UNKNOWN,
      explanation: "Gemini AI client could not be initialized. This might be due to an invalid API_KEY or a problem during setup. Please check the console logs."
    };
  }
  
  const userPrompt = `Analyze the following ${inputType === InputType.TEXT ? 'text' : 'URL string'}:
---
${content}
---
`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: userPrompt, // Simplified contents for direct text prompt
      config: {
        systemInstruction: GEMINI_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        // temperature: 0.7, // Example: Adjust for creativity/factuality
      },
    });
    
    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s; // Matches ```json ... ``` or ``` ... ```
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    const parsed = JSON.parse(jsonStr);

    if (parsed.ranking && parsed.explanation) {
      return {
        ranking: mapRanking(parsed.ranking),
        explanation: parsed.explanation,
      };
    } else {
      console.error("Parsed JSON does not contain expected 'ranking' and 'explanation' fields:", parsed);
      throw new Error("Invalid response structure from API.");
    }

  } catch (error) {
    console.error("Error analyzing content with Gemini:", error);
    let errorMessage = "Failed to analyze content. The AI model might be temporarily unavailable or an unexpected error occurred.";
    if (error instanceof Error) {
        errorMessage += ` Details: ${error.message}`;
    }
    // Consider more specific error handling based on error types from Gemini API if available/needed
    return {
      ranking: RiskRanking.UNKNOWN,
      explanation: errorMessage,
    };
  }
};