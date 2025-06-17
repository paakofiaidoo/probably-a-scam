
export enum InputType {
  TEXT = "text",
  URL = "url",
}

export enum RiskRanking {
  DEFINITELY_SCAM = "Definitely a Scam",
  PROBABLY_SCAM = "Probably a Scam (Be Careful)",
  NOT_A_SCAM = "Not a Scam",
  UNKNOWN = "Unknown", // For initial state or errors
}

export interface AnalysisResult {
  ranking: RiskRanking;
  explanation: string;
}

// Note on data storage:
// The user request mentioned a data model for submissions, analysis, and feedback:
//   submissionId, userId, text, url, timestamp, ranking, explanation, feedbackCount, flags.
// And asked for a storage solution "within the Gemini SDK ecosystem".
// The @google/genai SDK is for API interaction and does not provide data storage.
// For a client-side application like this MVP, options are limited:
// 1. localStorage: For small, non-sensitive, temporary data. Not suitable for robust user data or feedback aggregation.
// 2. No persistence (current approach for MVP): Data is processed and displayed but not stored beyond the session.
// A proper solution for persistent storage (like user feedback) would require a backend service
// (e.g., Firebase Firestore, or a custom backend API) which is outside the scope of this client-side Gemini API integration.
    