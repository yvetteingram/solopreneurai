export enum AppView {
  LANDING = 'LANDING',
  QUESTIONNAIRE = 'QUESTIONNAIRE',
  GENERATING = 'GENERATING',
  ROADMAP = 'ROADMAP'
}

export interface UserResponses {
  userType: string;
  focusArea: string;
  aiLevel: string;
  priority: string;
}

export interface RoadmapSection {
  preview: string | string[];
  comprehensive: string | string[];
}

export interface RoadmapData {
  situation: RoadmapSection;
  focus: RoadmapSection;
  ignore: RoadmapSection;
  oneStep: RoadmapSection;
  next30Days: {
    week1: RoadmapSection;
    week2: RoadmapSection;
    week3: RoadmapSection;
    week4: RoadmapSection;
  };
  nextStep: RoadmapSection;
}

/**
 * UserProfile interface to support user information in the Dashboard.
 */
export interface UserProfile {
  email: string;
  businessType: string;
  goal: string;
}

/**
 * BusinessWorkbook interface defining the complex data structure required by Dashboard.tsx.
 */
export interface BusinessWorkbook {
  roadmap: Array<{
    section: string;
    tasks: string[];
  }>;
  marketing: {
    leadMagnet: {
      title: string;
      description: string;
    };
    adHooks: string[];
    contentBuckets: string[];
  };
  productStack: {
    downsell: { name: string; description: string };
    coreOffer: { name: string; description: string };
    upsell: { name: string; description: string };
  };
  techStack: Array<{
    category: string;
    tool: string;
    reason: string;
  }>;
  branding: {
    aboutSnippet: string;
    voiceSheet: {
      tone: string;
      notes: string;
      dos: string[];
      donts: string[];
    };
    socialBios: {
      instagram: string;
      linkedin: string;
    };
  };
  emails: Array<{
    purpose: string;
    subject: string;
    body: string;
  }>;
  bonusTips: string[];
}