import { GoogleGenAI, Type } from "@google/genai";
import { UserResponses, RoadmapData } from "./types";

/**
 * Local Fallback Database
 * High-substance blueprints for different focus areas.
 * Used when no API Key is provided or when the API is unreachable.
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
  },
  "Learning AI basics": {
    situation: {
      preview: ["Overwhelmed by AI hype and terminology", "Unsure where to start with limited time", "Concerned about wasting money on wrong tools"],
      comprehensive: ["The AI landscape feels chaotic with new tools launching daily.", "You're spending more time reading about AI than actually using it.", "There's a disconnect between theoretical knowledge and practical application.", "Decision paralysis is preventing you from making any meaningful progress."]
    },
    focus: {
      preview: ["Master one foundational tool first", "Build practical muscle memory", "Create a personal AI toolkit"],
      comprehensive: ["Single Tool Mastery: Start with ChatGPT or Claude and become genuinely proficient before exploring alternatives.", "Practical Application: Focus on solving one real problem in your business rather than theoretical exercises.", "Personal Toolkit: Document your go-to prompts and workflows in a simple reference guide you'll actually use."]
    },
    ignore: {
      preview: ["Advanced technical courses", "Every new AI tool announcement", "Complex automation setups"],
      comprehensive: ["Technical Courses: You don't need to understand neural networks to use AI effectively in your business.", "Tool Chasing: New tools are marketing noise. Master the fundamentals first.", "Complex Automation: Start with simple, manual AI-assisted workflows before attempting sophisticated integrations."]
    },
    oneStep: {
      preview: "Solve one real problem with AI today.",
      comprehensive: "Pick the most annoying recurring task you did this week. Open ChatGPT or Claude and ask it to help you solve or automate it. Don't read about AI—use it to solve something real right now."
    },
    next30Days: {
      week1: { preview: "Foundation Building", comprehensive: "Choose your primary AI tool (ChatGPT or Claude). Spend 30 minutes daily solving actual business problems with it. Document what works." },
      week2: { preview: "Pattern Recognition", comprehensive: "Identify 3-5 recurring tasks where AI consistently saves you time. Create simple prompt templates for each." },
      week3: { preview: "Skill Deepening", comprehensive: "Learn one advanced technique (like few-shot prompting or chain-of-thought reasoning) and apply it to your established workflows." },
      week4: { preview: "System Creation", comprehensive: "Compile your best prompts and workflows into a personal 'AI Playbook' you can reference and refine over time." }
    },
    nextStep: {
      preview: "Pick your primary AI tool and solve one problem.",
      comprehensive: "Don't delay. Open ChatGPT or Claude right now and use it to solve a real task you need to complete today."
    }
  },
  "Clarifying what to build": {
    situation: {
      preview: ["Multiple ideas competing for attention", "Unclear on market validation", "Analysis paralysis preventing action"],
      comprehensive: ["You have several potential AI-enhanced products or services but no clear winner.", "Market research is consuming time without providing decisive direction.", "You're stuck in planning mode, perfecting ideas rather than testing them.", "The fear of choosing 'wrong' is preventing you from choosing anything."]
    },
    focus: {
      preview: ["Rapid prototype testing", "Customer feedback loops", "Minimum viable validation"],
      comprehensive: ["Quick Prototyping: Build the simplest version possible to test your core assumption.", "Feedback First: Get your idea in front of 5-10 potential customers before building more.", "Validation Over Perfection: Focus on proving one key hypothesis rather than creating a complete product."]
    },
    ignore: {
      preview: ["Perfect business plans", "Comprehensive market analysis", "Full feature specifications"],
      comprehensive: ["Extensive Planning: The market will teach you more in one week than planning will in one month.", "Deep Market Analysis: For solopreneurs, talking to 10 real customers beats reading 100 reports.", "Feature Completeness: Build the absolute minimum needed to test if anyone will pay for the core value."]
    },
    oneStep: {
      preview: "Write your one-sentence value proposition.",
      comprehensive: "Complete this sentence: 'I help [specific person] achieve [specific outcome] using [your AI-enhanced approach].' Share it with 5 people in your target market this week and record their reactions."
    },
    next30Days: {
      week1: { preview: "Hypothesis Formation", comprehensive: "Define the single core problem you're solving and the simplest AI-enhanced solution. Write it down in one paragraph." },
      week2: { preview: "Minimum Viable Test", comprehensive: "Create the absolute simplest version to test your hypothesis. It should take 1-2 days maximum to build." },
      week3: { preview: "Customer Conversations", comprehensive: "Show your prototype to 10 people. Ask: 'Would you pay for this?' Document their exact words and objections." },
      week4: { preview: "Pivot or Proceed", comprehensive: "Analyze feedback. Either commit to building version 1.0 or pivot based on what you learned. Make a decision." }
    },
    nextStep: {
      preview: "Write your value proposition and test it.",
      comprehensive: "Stop planning. Write your one-sentence value proposition today and share it with 5 potential customers by end of week."
    }
  }
};

const DEFAULT_BLUEPRINT: RoadmapData = BLUEPRINTS["Business operations"];

/**
 * Main service entry point. 
 * Decides whether to use Gemini (if key exists) or the local Engine.
 */
export async function generateRoadmap(responses: UserResponses): Promise<RoadmapData> {
  // FIXED: Use import.meta.env instead of process.env for Vite
  // Also check for VITE_ prefix which is required for client-side access
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_API_KEY;
  const isKeyValid = apiKey && apiKey !== "undefined" && apiKey !== "null" && apiKey !== "";
  
  // IF NO VALID API KEY IS FOUND, USE THE LOCAL ENGINE
  if (!isKeyValid) {
    console.log("✅ Using Local Blueprint Engine (No API Key needed)");
    return generateLocalRoadmap(responses);
  }

  console.log("🔑 Valid API Key found, attempting to use Gemini API...");
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

    console.log("✅ Gemini API successful");
    return JSON.parse(response.text || "{}") as RoadmapData;
  } catch (error: any) {
    console.warn("⚠️ Gemini API Error, falling back to local engine:", error.message);
    return generateLocalRoadmap(responses);
  }
}

/**
 * Logic to select the best local blueprint if Gemini is unavailable.
 * Returns a Promise to simulate generation delay for UX consistency.
 */
function generateLocalRoadmap(responses: UserResponses): Promise<RoadmapData> {
  const selected = BLUEPRINTS[responses.focusArea] || DEFAULT_BLUEPRINT;
  
  console.log(`📋 Selected blueprint for: ${responses.focusArea}`);
  
  return new Promise<RoadmapData>((resolve) => {
    // Artificial delay to mimic the experience of "Generating"
    setTimeout(() => resolve(selected), 2000);
  });
}