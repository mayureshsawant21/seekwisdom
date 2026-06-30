import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { PRECOMPILED_DILEMMAS, DAILY_REFLECTIONS } from "./src/precompiledData";
import { DilemmaResult, DailyReflection } from "./src/types";

// Load environment variables
dotenv.config();

// Lazy initialize Gemini client to prevent startup crashes if key is missing
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not set. AI-driven search fallback will be disabled.");
      throw new Error("GEMINI_API_KEY environment variable is required for dynamic spiritual searches.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const app = express();
const PORT = 3000;

app.use(express.json());

// API Route: Spiritual Insight Search
app.post("/api/spiritual-insight", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== "string" || query.trim() === "") {
      res.status(400).json({ error: "Query is required" });
      return;
    }

    const normalizedQuery = query.toLowerCase().trim();

    // 1. Check for precompiled answers to achieve ultra-fast <10ms response times
    let precompiledKey: string | null = null;
    if (normalizedQuery.includes("fail") || normalizedQuery.includes("setback") || normalizedQuery.includes("career")) {
      precompiledKey = "failure";
    } else if (normalizedQuery.includes("burnout") || normalizedQuery.includes("stress") || normalizedQuery.includes("exhaust")) {
      precompiledKey = "burnout";
    } else if (normalizedQuery.includes("ethical") || normalizedQuery.includes("unethical") || normalizedQuery.includes("speak up") || normalizedQuery.includes("integrity")) {
      precompiledKey = "unethical";
    } else if (normalizedQuery.includes("forgiv") || normalizedQuery.includes("betray") || normalizedQuery.includes("grudge")) {
      precompiledKey = "forgiveness";
    }

    if (precompiledKey && PRECOMPILED_DILEMMAS[precompiledKey]) {
      // Return instant response
      res.json({
        result: PRECOMPILED_DILEMMAS[precompiledKey],
        source: "cache"
      });
      return;
    }

    // 2. Call Gemini 3.5 Flash for dynamic comparative searches
    const ai = getAiClient();
    
    const systemInstruction = `You are a comparative spiritual scholar and wise counselor. 
Your task is to analyze a life or ethical dilemma, a personal challenge, or a philosophical query, and provide a comparative, balanced, and deeply respectful analysis across four major traditions:
1. Bhagavad Gita (Hinduism)
2. Holy Bible (Christianity)
3. Noble Quran (Islam)
4. Buddhism (Dhammapada and Suttas)

For the query, you must:
1. Synthesize the common threads between all four traditions regarding this problem.
2. Highlight distinct angles, emphasis, or subtle nuances that set each scripture/tradition apart.
3. Formulate a single, powerful "essence" summary of the wisdom for a modern seeker in one sentence.
4. For each tradition, select a relevant, authentic citation/chapter/verse, provide the translated text, summarize the philosophical principle, and provide actionable real-world guidance.
5. Provide a single unified 'suggestedAction' step that the user can immediately take to resolve or mediate their dilemma.

Be extremely respectful, neutral, objective, and focus on the deep psychological and ethical wisdom of these holy texts. Do not preach or favor any religion. Ensure all citations are real.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Provide comparative spiritual insights for this dilemma or question: "${query}"`,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2, // Low temperature for high precision and alignment
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            query: { type: Type.STRING },
            synthesis: {
              type: Type.OBJECT,
              properties: {
                commonalities: { type: Type.STRING, description: "A paragraph compiling the shared ethical or psychological viewpoints of the four traditions." },
                distinctPerspectives: { type: Type.STRING, description: "A paragraph detailing the subtle distinct perspectives or unique focal points of the four traditions." },
                essence: { type: Type.STRING, description: "A single core summary sentence of the comparative wisdom." }
              },
              required: ["commonalities", "distinctPerspectives", "essence"]
            },
            insights: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING, description: "A short unique ID string like 'dynamic-gita', 'dynamic-bible' etc." },
                  tradition: { type: Type.STRING, description: "Must be exactly one of: 'Bhagavad Gita', 'Holy Bible', 'Noble Quran', 'Buddhism'" },
                  bookTitle: { type: Type.STRING, description: "The source book or section, e.g., 'Matthew / Gospel', 'Surah Al-Imran', 'Chapter 4 / Karma Yoga', 'Dhammapada'" },
                  philosophy: { type: Type.STRING, description: "Detailed explanation of the tradition's core philosophical response to this dilemma." },
                  quote: { type: Type.STRING, description: "A direct relevant quote or translation of a verse/passage." },
                  citation: { type: Type.STRING, description: "Specific verse location/citation, e.g., 'Chapter 6, Verse 5', 'Proverbs 3:5-6', 'Surah Al-Baqarah 2:153', 'Dhammapada Verse 10'" },
                  guidance: { type: Type.STRING, description: "Practical guidance for personal or professional life." }
                },
                required: ["id", "tradition", "bookTitle", "philosophy", "quote", "citation", "guidance"]
              }
            },
            suggestedAction: { type: Type.STRING, description: "A powerful, unified, non-sectarian action item the user can perform today." }
          },
          required: ["query", "synthesis", "insights", "suggestedAction"]
        }
      }
    });

    const textResponse = response.text;
    if (!textResponse) {
      throw new Error("No response from Gemini API");
    }

    const parsedResult: DilemmaResult = JSON.parse(textResponse);
    res.json({
      result: parsedResult,
      source: "gemini"
    });

  } catch (error: any) {
    console.error("Error in /api/spiritual-insight:", error);
    res.status(500).json({ error: error.message || "An error occurred while generating scripture insights." });
  }
});

// API Route: Daily Reflection
app.post("/api/daily-reflection", async (req, res) => {
  try {
    const { emotion } = req.body; // e.g., "anxious", "greedy", "unmotivated"
    
    // If no specific emotion is requested, pick a random one from our high-quality precompiled reflections
    if (!emotion || typeof emotion !== "string" || emotion.trim() === "") {
      const randomReflection = DAILY_REFLECTIONS[Math.floor(Math.random() * DAILY_REFLECTIONS.length)];
      res.json({ reflection: randomReflection, source: "precompiled" });
      return;
    }

    // Call Gemini 3.5 Flash to generate a personalized reflection for their current emotion
    const ai = getAiClient();
    const emotionQuery = emotion.trim();

    const systemInstruction = `You are a gentle spiritual mentor. Your task is to provide a single personalized daily reflection based on the user's current emotion or state of mind (e.g., 'anxious', 'impatient', 'greedy', 'grieving', 'lonely', 'excited').
You must select ONE profound quote or verse from any of the major traditions (Bhagavad Gita, Holy Bible, Noble Quran, or Buddhist texts like Dhammapada) that directly addresses, calms, or elevates that emotion.

Provide the response strictly in JSON format matching the DailyReflection schema. Give a deep explanation of the meaning, and formulate a highly practical, calming, and actionable 'reflectionQuestion' that acts as a journal prompt.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Generate a personalized reflection for someone who feels: "${emotionQuery}"`,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.4,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            theme: { type: Type.STRING, description: "The overarching theme, e.g., Courage, Patience, Letting Go" },
            quote: { type: Type.STRING, description: "The specific quote or verse translation." },
            citation: { type: Type.STRING, description: "The exact citation, e.g., 'Surah Al-Ahzab 33:3', 'Luke 12:22', 'Chapter 2, Verse 14'" },
            source: { type: Type.STRING, description: "Must be exactly one of: 'Bhagavad Gita', 'Holy Bible', 'Noble Quran', 'Buddhism'" },
            meaning: { type: Type.STRING, description: "How this scripture heals or addresses the specific emotional state, explained gently." },
            reflectionQuestion: { type: Type.STRING, description: "A profound journaling question or mindful activity they can do today." }
          },
          required: ["theme", "quote", "citation", "source", "meaning", "reflectionQuestion"]
        }
      }
    });

    const textResponse = response.text;
    if (!textResponse) {
      throw new Error("No response from Gemini API");
    }

    const parsedReflection: DailyReflection = JSON.parse(textResponse);
    res.json({
      reflection: parsedReflection,
      source: "gemini"
    });

  } catch (error: any) {
    console.error("Error in /api/daily-reflection:", error);
    // Fallback to precompiled if Gemini fails
    const randomReflection = DAILY_REFLECTIONS[Math.floor(Math.random() * DAILY_REFLECTIONS.length)];
    res.json({ 
      reflection: randomReflection, 
      source: "fallback",
      error: error.message || "Failed to generate dynamic reflection, loading timeless wisdom instead."
    });
  }
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // In development, hook up Vite dev server as middleware
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve the compiled assets
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Universal Spiritual Search] running on http://localhost:${PORT}`);
  });
}

startServer();
