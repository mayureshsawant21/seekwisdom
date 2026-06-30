export interface ScriptureInsight {
  id: string;
  tradition: string; // "Bhagavad Gita" | "Holy Bible" | "Noble Quran" | "Buddhism"
  bookTitle: string;
  philosophy: string; // Summary of philosophy on the topic
  quote: string; // Specific quote or verse
  citation: string; // e.g., "Gita 2.47", "Matthew 6:34"
  guidance: string; // Practical guidance for personal/professional life
}

export interface UniversalSynthesis {
  commonalities: string; // What they agree on / common thread
  distinctPerspectives: string; // Nuances or unique angles from different texts
  essence: string; // Single-sentence core summary for the modern seeker
}

export interface DilemmaResult {
  query: string;
  synthesis: UniversalSynthesis;
  insights: ScriptureInsight[];
  suggestedAction: string; // Unified actionable step
}

export interface DailyReflection {
  theme: string;
  quote: string;
  citation: string;
  source: string; // "Bhagavad Gita" | "Holy Bible" | "Noble Quran" | "Buddhism"
  meaning: string;
  reflectionQuestion: string; // Actionable journaling/contemplation prompt
}

export interface QuickTheme {
  emoji: string;
  label: string;
  query: string;
}
