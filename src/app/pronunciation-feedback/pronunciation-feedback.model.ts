export interface Phoneme {
  phoneme: string;
  score: number;
  count: number;
  label?: string;
  consistency?: string | number;
  difficulty?: string;
  tip?: string;
  note?: string;
}

export interface Metadata {
  total_phonemes: number;
  avg_gop: number;
  distribution: {
    excellent: number;
    good: number;
    ok: number;
    needs_work: number;
  };
}

export interface PronunciationFeedback {
  headline: string;
  text: string;
  date: string;
  summary: string;
  overall_score: number;
  grade: string;
  encouragement: string;
  strengths: Phoneme[];
  weaknesses: Phoneme[];
  exercises: any[];
  insights: any[];
  metadata: Metadata;
}