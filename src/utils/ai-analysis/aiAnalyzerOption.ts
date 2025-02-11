export const AIAnalyzerOption = {
  IDENTIFY_KEY_CHARACTERS: "Identify key characters",
  LANGUAGE_DETECTION: "Language detection",
  SENTIMENT_ANALYSIS: "Sentiment analysis",
  PLOT_SUMMARY: "Plot summary",
  THEME_ANALYSIS: "Theme analysis",
  CHARACTER_RELATIONSHIPS: "Character relationships",
  TONE_AND_MOOD_ANALYSIS: "Tone and mood analysis",
  NARRATIVE_STRUCTURE_ANALYSIS: "Narrative structure analysis",
  STYLISTIC_ANALYSIS: "Stylistic analysis",
} as const;

export function isAIAnalyzerOption(value: string | undefined | null): value is keyof typeof AIAnalyzerOption {
  return Object.keys(AIAnalyzerOption).some(x => x === value);
}