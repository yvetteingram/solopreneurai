import { GoogleGenAI, Type } from "@google/genai";
import { UserResponses, RoadmapData } from "./types";

export async function generateRoadmap(responses: UserResponses): Promise<RoadmapData> {
  // Always initialize GoogleGenAI inside the function to use the most recent process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    You are a Senior AI Strategist for Ketorah Digital AI.
    Generate a high-substance, two-tier "AI Starting Roadmap" for:
    - User Type: ${responses.userType}
    - Strategic Focus: ${responses.focusArea}
    - AI Experience: ${responses.aiLevel}
    - Priority: ${responses.priority}

    STRICT CONSTRAINTS:
    - NO product names, NO prices, NO links.
    - NO motivational, spiritual, or coaching language.
    - Neutral, business-focused tone.
    - NEVER use words: launch, journey, win, momentum.

    REQUIRED OUTPUT (JSON):
    Generate content for both 'preview' and 'comprehensive' modes.

    1. Your Situation: 
       - Preview: 3 high-level business context bullets.
       - Comprehensive: 4 detailed tactical observations about operational gaps.
    2. What to Focus on First: 
       - Preview: 3 items, 1 sentence each.
       - Comprehensive: 3 items, each with a Title and a 3-sentence "Implementation Narrative" detailing exactly how to execute.
    3. What to Ignore for Now: 
       - Preview: 3 noise-reduction items.
       - Comprehensive: 3 items with specific business reasoning why these distract from the current goal.
    4. One Simple Way to Start: 
       - Preview: 1 concrete action sentence.
       - Comprehensive: 1 full tactical paragraph describing a low-friction "wedge" into AI usage.
    5. What the Next 30 Days Can Look Like: 
       - For Week 1-4, provide a concise 'preview' summary and a 'comprehensive' multi-step action plan.
    6. Next Step: 
       - Preview: 1 professional closing sentence.
       - Comprehensive: 2 sentences on the immediate transition to the first weekly milestone.
    
    The output must be a professional strategic plan, avoiding any fluff.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          situation: { 
            type: Type.OBJECT, 
            properties: { 
              preview: { type: Type.ARRAY, items: { type: Type.STRING } },
              comprehensive: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["preview", "comprehensive"]
          },
          focus: { 
            type: Type.OBJECT, 
            properties: { 
              preview: { type: Type.ARRAY, items: { type: Type.STRING } },
              comprehensive: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["preview", "comprehensive"]
          },
          ignore: { 
            type: Type.OBJECT, 
            properties: { 
              preview: { type: Type.ARRAY, items: { type: Type.STRING } },
              comprehensive: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["preview", "comprehensive"]
          },
          oneStep: { 
            type: Type.OBJECT, 
            properties: { 
              preview: { type: Type.STRING },
              comprehensive: { type: Type.STRING }
            },
            required: ["preview", "comprehensive"]
          },
          next30Days: {
            type: Type.OBJECT,
            properties: {
              week1: { type: Type.OBJECT, properties: { preview: { type: Type.STRING }, comprehensive: { type: Type.STRING } }, required: ["preview", "comprehensive"] },
              week2: { type: Type.OBJECT, properties: { preview: { type: Type.STRING }, comprehensive: { type: Type.STRING } }, required: ["preview", "comprehensive"] },
              week3: { type: Type.OBJECT, properties: { preview: { type: Type.STRING }, comprehensive: { type: Type.STRING } }, required: ["preview", "comprehensive"] },
              week4: { type: Type.OBJECT, properties: { preview: { type: Type.STRING }, comprehensive: { type: Type.STRING } }, required: ["preview", "comprehensive"] }
            },
            required: ["week1", "week2", "week3", "week4"]
          },
          nextStep: { 
            type: Type.OBJECT, 
            properties: { 
              preview: { type: Type.STRING },
              comprehensive: { type: Type.STRING }
            },
            required: ["preview", "comprehensive"]
          }
        },
        required: ["situation", "focus", "ignore", "oneStep", "next30Days", "nextStep"]
      }
    }
  });

  return JSON.parse(response.text || "{}") as RoadmapData;
}