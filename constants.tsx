
import React from 'react';
import { RiskRanking } from './types.ts';

// Placeholder - Replace with your actual Buy Me a Coffee link
export const BUY_ME_A_COFFEE_URL = "https://paystack.shop/pay/prxufsbazy"; 

// SVG Icons (simple examples)
const ShieldExclamationIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${className}`}>
    <path fillRule="evenodd" d="M11.984 2.584a1.324 1.324 0 0 1 .928.395l8.094 8.094a1.324 1.324 0 0 1 .014 1.858l-3.88 4.094a1.324 1.324 0 0 1-1.032.457H7.89a1.324 1.324 0 0 1-1.031-.457L2.98 12.932a1.324 1.324 0 0 1 .013-1.858l8.094-8.094a1.324 1.324 0 0 1 .896-.396Zm0 1.768L4.36 12.092l3.53 3.724h7.22l3.53-3.724L11.984 4.352ZM11 8v5a1 1 0 0 0 2 0V8a1 1 0 1 0-2 0Zm0 7a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z" clipRule="evenodd" />
  </svg>
);

const ExclamationTriangleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${className}`}>
    <path fillRule="evenodd" d="M10.099 2.49C11.337.93 13.511.93 14.749 2.49L22.29 11.942c1.238 1.56 1.238 3.855 0 5.414L14.75 21.808c-1.238 1.56-3.412 1.56-4.65 0L2.551 17.356c-1.238-1.56-1.238-3.855 0-5.414L10.1 2.49Zm.947 11.01a.75.75 0 1 0-1.5 0v.008a.75.75 0 0 0 1.5 0v-.008Zm-.004 3.002a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" clipRule="evenodd" />
  </svg>
);

const ShieldCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${className}`}>
    <path fillRule="evenodd" d="M11.984 2.584a1.324 1.324 0 0 1 .928.395l8.094 8.094a1.324 1.324 0 0 1 .014 1.858l-3.88 4.094a1.324 1.324 0 0 1-1.032.457H7.89a1.324 1.324 0 0 1-1.031-.457L2.98 12.932a1.324 1.324 0 0 1 .013-1.858l8.094-8.094a1.324 1.324 0 0 1 .896-.396Zm0 1.768L4.36 12.092l3.53 3.724h7.22l3.53-3.724L11.984 4.352Z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M15.53 9.47a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06L10.47 13.44l3.97-3.97a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
  </svg>
);

export const RISK_RANKING_CONFIG: Record<RiskRanking, {
  label: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
}> = {
  [RiskRanking.DEFINITELY_SCAM]: {
    label: "Definitely a Scam",
    textColor: "text-red-700",
    bgColor: "bg-red-100",
    borderColor: "border-red-500",
    icon: <ShieldExclamationIcon className="text-red-600" />,
  },
  [RiskRanking.PROBABLY_SCAM]: {
    label: "Probably a Scam (Be Careful)",
    textColor: "text-yellow-700",
    bgColor: "bg-yellow-100",
    borderColor: "border-yellow-500",
    icon: <ExclamationTriangleIcon className="text-yellow-600" />,
  },
  [RiskRanking.NOT_A_SCAM]: {
    label: "Not a Scam",
    textColor: "text-green-700",
    bgColor: "bg-green-100",
    borderColor: "border-green-500",
    icon: <ShieldCheckIcon className="text-green-600" />,
  },
  [RiskRanking.UNKNOWN]: {
    label: "Awaiting Analysis",
    textColor: "text-gray-700",
    bgColor: "bg-gray-100",
    borderColor: "border-gray-400",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" /></svg>,
  },
};

// Gemini API Model
export const GEMINI_MODEL_NAME = "gemini-2.5-flash-preview-04-17";

// System instruction for Gemini
export const GEMINI_SYSTEM_INSTRUCTION = `You are an AI assistant specialized in identifying scams, phishing attempts, and social engineering tactics. Your goal is to help users by analyzing text or URLs they provide.
When analyzing, consider common indicators of these malicious activities, such as:
- Urgency or pressure tactics.
- Suspicious links or domain names (e.g., misspellings, unusual TLDs, excessive subdomains).
- Requests for sensitive information (login credentials, financial details, personal identification).
- Generic greetings (e.g., "Dear Customer") or poor grammar and spelling.
- Unexpected offers, winnings, or threats.
- Impersonation of legitimate entities (banks, government agencies, tech support, known contacts).
- Attachments or links leading to unfamiliar or unsolicited downloads.
Respond in JSON format. The JSON object MUST contain two keys:
1. "ranking": Choose *exactly one* of the following string values: "Definitely a Scam", "Probably a Scam (Be Careful)", or "Not a Scam". This ranking should reflect the overall risk considering scams, phishing, and social engineering.
2. "explanation": A detailed explanation of your reasoning. Highlight any specific indicators of scams, phishing, or social engineering found, or explain why the content is deemed safe. Be clear, concise, and actionable. If analyzing a URL, base your analysis on the URL string itself, common patterns in malicious URLs, and typical characteristics of websites associated with such URLs. DO NOT attempt to access or fetch content from the URL.`;