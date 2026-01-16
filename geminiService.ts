import { GoogleGenAI, Type } from "@google/genai";
import { UserResponses, RoadmapData } from "./types";

/**
 * Local Fallback Database
 * High-substance blueprints for different focus areas.
 */
const BLUEPRINTS: Record<string, RoadmapData> = {
  "Content & marketing": {
    situation: {
      preview: ["High manual effort in content production", "Inconsistent brand voice across channels", "Underutilized historical data for new campaigns"],
      comprehensive: ["Your current workflow relies heavily on manual ideation, causing bottlenecks.", "Content distribution is reactive rather than strategic.", "The lack of an automated 'content engine' results in high overhead for low-volume output.", "Engagement data is gathered but rarely used to inform the next 30 days of production."]
    },
    focus: {
      preview: ["Standardize prompt frameworks", "Automate research gathering", "Centralize asset management"],
      comprehensive: ["Standardize Prompts: Develop a library of 'Golden Prompts' that mirror your specific brand voice to ensure consistency.", "Research Automation: Use AI tools to aggregate trending industry topics into a weekly digest for your review.", "Centralize Assets: Create a structured digital vault for all AI-assisted drafts to facilitate faster editing cycles."]
    },
    ignore: {
      preview: ["Complex video avatars", "Real-time AI chatbots", "Generic SEO automation"],
      comprehensive: ["Video Avatars: These require high technical oversight and often appear 'uncanny,' distracting from your authentic authority.", "Real-time Chatbots: Without deep data integration, these often provide poor customer experiences and require constant monitoring.", "Generic SEO: Auto-blogging tools often trigger quality filters; focus on quality over sheer AI-generated volume."]
    },
    oneStep: {
      preview: "Create a 'Brand Voice Sheet' for AI referencing.",
      comprehensive: "Document your top 3 performing articles or posts. Feed them into a standard LLM with the instruction: 'Analyze the tone, cadence, and vocabulary of these texts to create a style guide for future outputs.' Use this as the base for all content work."
    },
    next30Days: {
      week1: { preview: "Audit and Voice Mapping", comprehensive: "Identify your top 5 content categories. Run style analysis on existing content to create your primary AI instruction set." },
      week2: { preview: "Workflow Prototyping", comprehensive: "Select one high-frequency task (e.g., LinkedIn posts) and move it entirely into an AI-assisted workflow using your new style guide." },
      week3: { preview: "Optimization & Expansion", comprehensive: "Review Week 2 outputs. Refine the prompts based on what felt 'off' and expand the workflow to include email subject lines and hooks." },
      week4: { preview: "Performance Review", comprehensive: "Compare content volume and time-spent metrics against previous months. Solidify the workflow into a repeatable SOP." }
    },
    nextStep: {
      preview: "Move into the 'Workflow Prototyping' phase.",
      comprehensive: "Start by selecting your most time-consuming recurring content task. Apply the Brand Voice Sheet to this specific task tomorrow morning."
    }
  },
  "Business operations": {
    situation: {
      preview: ["Fragmented administrative workflows", "High volume of repetitive email communication", "Manual data entry between disconnected tools"],
      comprehensive: ["Administrative tasks are consuming 30% of your billable or creative hours.", "Client onboarding feels disjointed and relies on manual document creation.", "Valuable business data is trapped in silos (emails, PDFs, spreadsheets).", "Your current 'system' is dependent on your memory rather than documented automation."]
    },
    focus: {
      preview: ["Email triage automation", "Meeting summarization workflows", "Document synthesis"],
      comprehensive: ["Email Triage: Implement AI-assisted categorization to separate urgent client needs from general industry noise.", "Meeting Summarization: Move from manual note-taking to automated transcription and action-item extraction.", "Document Synthesis: Use AI to analyze lengthy reports or contracts and extract key deliverables in seconds."]
    },
    ignore: {
      preview: ["Fully automated customer support", "Predictive financial modeling", "AI-based hiring tools"],
      comprehensive: ["Automated Support: For solopreneurs, personal touch is your competitive advantage. Don't outsource the 'human' element entirely yet.", "Predictive Modeling: Unless you have massive datasets, the output will be speculative and potentially misleading.", "Hiring Tools: These often add unnecessary complexity to the simple freelancer/contractor vetting process you need."]
    },
    oneStep: {
      preview: "Automate your next internal meeting summary.",
      comprehensive: "Download a simple transcription tool. Record your next 'thinking out loud' session or client call. Pass the text through an AI with the prompt: 'Extract exactly 3 action items and 2 key decisions from this transcript.' Experience the time savings immediately."
    },
    next30Days: {
      week1: { preview: "Admin Time Audit", comprehensive: "Track every task you do for 5 days. Identify the 3 most repetitive administrative 'time-leaks' for AI intervention." },
      week2: { preview: "Tool Integration", comprehensive: "Select one tool for automated transcription or document processing. Set up a basic Zapier or manual workflow for it." },
      week3: { preview: "Data Consolidation", comprehensive: "Collect scattered notes and documents. Use AI to synthesize them into a single 'Knowledge Base' for your business operations." },
      week4: { preview: "SOP Documentation", comprehensive: "Ask AI to help you write Standard Operating Procedures (SOPs) for your new automated workflows so they become permanent." },
    },
    nextStep: {
      preview: "Conduct a 5-day time audit.",
      comprehensive: "Before adding tools, you must know exactly where the time is going. Start the audit on your next working day."
    }
  }
};

// Generic fallback for any unmapped focus areas
const DEFAULT_BLUEPRINT: RoadmapData = BLUEPRINTS["Business operations"];

/**
 * Main service entry point. 
 * Decides whether to use Gemini (if key exists) or the local Engine.
 */
export async function generateRoadmap(responses: UserResponses): Promise<RoadmapData> {
  const apiKey = process.env.API_KEY;
  
  // IF NO API KEY IS FOUND, USE THE LOCAL ENGINE
  if (!apiKey || apiKey === "undefined" || apiKey === "" || apiKey === "null") {
    console.log("Using Local Blueprint Engine (No API Key detected)");
    return generateLocalRoadmap(responses);
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are a Senior AI Strategist. Generate a high-substance, two-tier "AI Starting Roadmap" for:
    - User Type: ${responses.userType}
    - Strategic Focus: ${responses.focusArea}
    - AI Experience: ${responses.aiLevel}
    - Priority: ${responses.priority}

    STRICT CONSTRAINTS: NO products, NO prices, NO links. NO motivational fluff. 
    OUTPUT JSON with keys: situation, focus, ignore, oneStep, next30Days, nextStep.
    Each section needs a 'preview' (list) and 'comprehensive' (detailed) part.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            situation: { type: Type.OBJECT, properties: { preview: { type: Type.ARRAY, items: { type: Type.STRING } }, comprehensive: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ["preview", "comprehensive"] },
            focus: { type: Type.OBJECT, properties: { preview: { type: Type.ARRAY, items: { type: Type.STRING } }, comprehensive: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ["preview", "comprehensive"] },
            ignore: { type: Type.OBJECT, properties: { preview: { type: Type.ARRAY, items: { type: Type.STRING } }, comprehensive: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ["preview", "comprehensive"] },
            oneStep: { type: Type.OBJECT, properties: { preview: { type: Type.STRING }, comprehensive: { type: Type.STRING } }, required: ["preview", "comprehensive"] },
            next30Days: { type: Type.OBJECT, properties: { 
              week1: { type: Type.OBJECT, properties: { preview: { type: Type.STRING }, comprehensive: { type: Type.STRING } }, required: ["preview", "comprehensive"] },
              week2: { type: Type.OBJECT, properties: { preview: { type: Type.STRING }, comprehensive: { type: Type.STRING } }, required: ["preview", "comprehensive"] },
              week3: { type: Type.OBJECT, properties: { preview: { type: Type.STRING }, comprehensive: { type: Type.STRING } }, required: ["preview", "comprehensive"] },
              week4: { type: Type.OBJECT, properties: { preview: { type: Type.STRING }, comprehensive: { type: Type.STRING } }, required: ["preview", "comprehensive"] }
            }, required: ["week1", "week2", "week3", "week4"] },
            nextStep: { type: Type.OBJECT, properties: { preview: { type: Type.STRING }, comprehensive: { type: Type.STRING } }, required: ["preview", "comprehensive"] }
          },
          required: ["situation", "focus", "ignore", "oneStep", "next30Days", "nextStep"]
        }
      }
    });

    return JSON.parse(response.text || "{}") as RoadmapData;
  } catch (error: any) {
    console.warn("Gemini API Error, falling back to local engine:", error);
    return generateLocalRoadmap(responses);
  }
}

/**
 * Logic to select the best local blueprint if Gemini is unavailable.
 * Returns a Promise to simulate generation delay for UX consistency.
 */
function generateLocalRoadmap(responses: UserResponses): Promise<RoadmapData> {
  const selected = BLUEPRINTS[responses.focusArea] || DEFAULT_BLUEPRINT;
  
  return new Promise<RoadmapData>((resolve) => {
    setTimeout(() => resolve(selected), 2000);
  });
}